export async function stageUpload(file:Blob){
 const response=await fetch('/api/direct-upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mime:file.type||'application/octet-stream',size:file.size})});
 if(!response.ok)throw Error('업로드를 시작하지 못했습니다. 로그인과 파일 크기를 확인해주세요.');
 const signed=await response.json();if(signed.legacy)return null;const form=new FormData();
 for(const [key,value] of Object.entries(signed.fields))form.append(key,String(value));
 form.append('file',file);
 const uploaded=await fetch(signed.url,{method:'POST',body:form});
 if(!uploaded.ok)throw Error('파일 전송에 실패했습니다.');
 return {uploadKey:signed.uploadKey as string,uploadTicket:signed.uploadTicket as string};
}
export async function uploadViaS3(path:string,file:File){
 const staged=await stageUpload(file);
 if(!staged){const form=new FormData();form.append("file",file);return fetch(path,{method:"POST",body:form});}
 return fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...staged,fileName:file.name})});
}
