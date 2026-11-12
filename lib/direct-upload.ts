import "server-only";
import {createHmac, randomUUID, timingSafeEqual} from "node:crypto";
import {S3Client, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import {createPresignedPost} from "@aws-sdk/s3-presigned-post";
const s3=new S3Client({region:process.env.AWS_REGION||"ap-northeast-2"});
const max=40*1024*1024;
function sign(value:string){if(!process.env.ORIGIN_SECRET)throw Error("Upload configuration missing");return createHmac("sha256",process.env.ORIGIN_SECRET).update(value).digest("hex");}
export async function createUpload(mime:string,size:number){
 if(!Number.isSafeInteger(size)||size<1||size>max||mime.length>150)throw Error("Invalid upload");
 const key=process.env.UPLOAD_PREFIX+randomUUID();
 const payload=Buffer.from(JSON.stringify({key,mime,size,expires:Date.now()+10*60*1000})).toString("base64url");
 const signed=await createPresignedPost(s3,{Bucket:process.env.UPLOAD_BUCKET!,Key:key,Expires:600,Fields:{"Content-Type":mime},Conditions:[["content-length-range",size,size],["eq","$Content-Type",mime]]});
 return {...signed,uploadKey:key,uploadTicket:payload+"."+sign(payload)};
}
export async function readUpload(key:string,ticket:string){
 const [payload,signature]=ticket.split('.');const expected=sign(payload||'');
 if(!signature||signature.length!==expected.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))throw Error("Invalid upload ticket");
 const data=JSON.parse(Buffer.from(payload,'base64url').toString());
 if(data.key!==key||!key.startsWith(process.env.UPLOAD_PREFIX!)||data.expires<Date.now()||data.size>max)throw Error("Expired upload");
 const object=await s3.send(new GetObjectCommand({Bucket:process.env.UPLOAD_BUCKET!,Key:key}));
 if(object.ContentLength!==data.size||object.ContentType!==data.mime||!object.Body)throw Error("Upload does not match ticket");
 const bytes=Buffer.from(await object.Body.transformToByteArray());
 return {bytes,mime:data.mime as string};
}
export async function removeUpload(key:string){await s3.send(new DeleteObjectCommand({Bucket:process.env.UPLOAD_BUCKET!,Key:key}));}
export async function uploadedFile(request:Request){
 if(request.headers.get('content-type')?.includes('application/json')){
  const body=await request.json();const {bytes,mime}=await readUpload(body.uploadKey,body.uploadTicket);
  return {file:new File([new Uint8Array(bytes)],String(body.fileName||'upload'),{type:mime}),key:body.uploadKey as string};
 }
 const form=await request.formData();return {file:form.get('file'),key:undefined};
}
