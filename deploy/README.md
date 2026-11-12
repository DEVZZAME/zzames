# Lambda deployment

Push to main builds a Linux container in GitHub Actions using AWS Lambda Web Adapter. GitHub OIDC assumes `zzames-github-deploy`. Secrets are read from SSM `/serverless/zzames/environment`; never put them in the image.

A candidate Lambda version is checked before updating the live alias. CloudFront sends a secret origin header; direct requests without it are rejected. The health endpoint is intentionally public.

To roll back, point the live alias at the prior published version. Keep EC2 until migration and application checks are complete.
