// Keep the Function URL private to the CDN using a per-application secret.
const http = require('node:http');
const { timingSafeEqual } = require('node:crypto');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
fs.mkdirSync('/tmp/next-cache', { recursive: true });
const child = spawn(process.execPath, ['server.js'], { stdio: 'inherit', env: {...process.env, PORT:'3000'} });
child.on('exit', code => process.exit(code || 1));
const valid = value => {
 const expected = process.env.ORIGIN_SECRET;
 return typeof value === 'string' && !!expected && Buffer.byteLength(value) === Buffer.byteLength(expected) && timingSafeEqual(Buffer.from(value),Buffer.from(expected));
};
http.createServer((req, res) => {
 if (req.url === '/healthz') {
  const probe=http.get('http://127.0.0.1:3000/api/healthz', r=>{r.resume();res.writeHead(r.statusCode);res.end('ready');});
  probe.on('error',()=>{res.writeHead(503);res.end('starting');});return;
 }
 if(!valid(req.headers['x-origin-verify'])) {res.writeHead(403);res.end('Forbidden');return;}
 const headers={...req.headers};
 delete headers['x-origin-verify'];
 headers.host=process.env.SITE_URL ? new URL(process.env.SITE_URL).host : headers.host;
 headers['x-forwarded-host']=headers.host;
 headers['x-forwarded-proto']='https';
 const upstream=http.request({hostname:'127.0.0.1',port:3000,path:req.url,method:req.method,headers},r=>{res.writeHead(r.statusCode,r.headers);r.pipe(res);});
 upstream.on('error',()=>{if(!res.headersSent)res.writeHead(502);res.end();});
 req.pipe(upstream);
}).listen(8080,'0.0.0.0');
