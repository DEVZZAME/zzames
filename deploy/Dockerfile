FROM public.ecr.aws/docker/library/node:22-bookworm-slim AS builder
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
ENV NEXT_TELEMETRY_DISABLED=1 AUTH_SECRET=build-only-placeholder-not-a-runtime-secret DATABASE_URL=mysql://build:build@127.0.0.1:3306/build
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi
RUN npx next build --webpack
FROM public.ecr.aws/docker/library/node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.1.0 /lambda-adapter /opt/extensions/lambda-adapter
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000 AWS_LWA_PORT=8080 AWS_LWA_READINESS_CHECK_PATH=/healthz AWS_LWA_INVOKE_MODE=response_stream AWS_LWA_ENABLE_COMPRESSION=true AWS_LWA_ASYNC_INIT=true
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY deploy/start.cjs ./lambda-start.cjs
RUN rm -rf .next/cache && ln -s /tmp/next-cache .next/cache
CMD ["node", "lambda-start.cjs"]
