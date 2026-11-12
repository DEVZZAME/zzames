import boto3, json, os, time, urllib.request
app=os.environ['APP_NAME']; region='ap-northeast-2'
s=boto3.Session(region_name=region); client=s.client('lambda'); account=s.client('sts').get_caller_identity()['Account']
env=json.loads(s.client('ssm').get_parameter(Name=f'/serverless/{app}/environment',WithDecryption=True)['Parameter']['Value'])
image=os.environ['IMAGE_URI']; role=f'arn:aws:iam::{account}:role/{app}-lambda-runtime'
try:
 client.get_function(FunctionName=app)
 exists=True
except client.exceptions.ResourceNotFoundException: exists=False
if exists:
 client.update_function_configuration(FunctionName=app,Environment={'Variables':env},MemorySize=2048,Timeout=120)
 client.get_waiter('function_updated_v2').wait(FunctionName=app)
 result=client.update_function_code(FunctionName=app,ImageUri=image,Publish=True)
else:
 result=client.create_function(FunctionName=app,Role=role,Code={'ImageUri':image},PackageType='Image',Architectures=['x86_64'],MemorySize=2048,Timeout=120,Environment={'Variables':env},Publish=True)
client.get_waiter('function_active_v2').wait(FunctionName=app)
client.get_waiter('function_updated_v2').wait(FunctionName=app)
version=result['Version']
# Test the new immutable version before changing the production alias.
def alias(name):
 try:client.create_alias(FunctionName=app,Name=name,FunctionVersion=version)
 except client.exceptions.ResourceConflictException:client.update_alias(FunctionName=app,Name=name,FunctionVersion=version)
def url(name):
 try:r=client.create_function_url_config(FunctionName=app,Qualifier=name,AuthType='NONE',InvokeMode='RESPONSE_STREAM')
 except client.exceptions.ResourceConflictException:r=client.get_function_url_config(FunctionName=app,Qualifier=name)
 for sid,action,extra in [('FunctionURL','lambda:InvokeFunctionUrl',{'FunctionUrlAuthType':'NONE'}),('FunctionURLInvoke','lambda:InvokeFunction',{'InvokedViaFunctionUrl':True})]:
  try:client.add_permission(FunctionName=app,Qualifier=name,StatementId=sid,Action=action,Principal='*',**extra)
  except client.exceptions.ResourceConflictException:pass
 return r['FunctionUrl']
alias('candidate'); candidate=url('candidate')
for attempt in range(12):
 try:
  req=urllib.request.Request(candidate+'api/healthz',headers={'x-origin-verify':env['ORIGIN_SECRET']})
  with urllib.request.urlopen(req,timeout=130) as response:
   assert response.status==200
  break
 except Exception:
  if attempt==11:raise RuntimeError('Candidate health check failed; live alias unchanged') from None
  time.sleep(5)
alias('live'); live=url('live')
print(f'Deployed {app} version {version}: {live}')
