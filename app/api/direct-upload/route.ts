import {getSession} from "@/lib/auth";
import {createUpload} from '@/lib/direct-upload';
export async function POST(req:Request){
 if(!await getSession())return new Response(null,{status:401});
 if(process.env.SITE_URL && req.headers.get('origin')!==process.env.SITE_URL)return new Response(null,{status:403});
 if(!process.env.UPLOAD_BUCKET)return Response.json({legacy:true});
 try{const {mime,size}=await req.json();return Response.json(await createUpload(String(mime),Number(size)));}
 catch{return Response.json({error:'Invalid upload'},{status:400});}
}
