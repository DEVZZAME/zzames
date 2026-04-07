# EC2 Deployment Guide

이 프로젝트를 `AWS EC2 + Nginx + PM2` 조합으로 배포하는 절차입니다. 기준 OS는 `Ubuntu 24.04 LTS`입니다.

## 1. 준비

- EC2 보안 그룹 인바운드 허용
  - `22` SSH
  - `80` HTTP
  - `443` HTTPS
- 도메인이 있다면 EC2 퍼블릭 IP로 A 레코드 연결
- 데이터베이스는 둘 중 하나를 선택
  - 권장: `AWS RDS MariaDB`
  - 간단 배포: EC2 내부 MariaDB

## 2. 서버 접속

```bash
ssh -i /path/to/your-key.pem ubuntu@your-ec2-public-ip
```

## 3. 서버 패키지 설치

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node -v
npm -v
pm2 -v
```

## 4. 애플리케이션 소스 배치

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone git@github.com:DEVZZAME/zzames.git
cd zzames
```

HTTPS가 아닌 GitHub SSH 설정이 안 되어 있으면 HTTPS clone을 사용합니다.

```bash
git clone https://github.com/DEVZZAME/zzames.git
```

## 5. 환경변수 작성

서버에서 `.env.local`을 직접 만듭니다.

```bash
cat > .env.local <<'EOF'
DATABASE_ENABLED="true"
DATABASE_URL="mysql://admin:YOUR_DB_PASSWORD@127.0.0.1:3306/zzames"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_EMAIL="dev.zzame@gmail.com"
ADMIN_PASSWORD="replace-with-admin-password"
EOF
```

도메인이 아직 없으면 임시로:

```env
NEXTAUTH_URL="http://your-ec2-public-ip"
```

## 6. MariaDB 준비

### 옵션 A. EC2 내부 MariaDB

```bash
sudo apt install -y mariadb-server
sudo systemctl enable mariadb
sudo systemctl start mariadb
sudo mysql
```

MariaDB에서 실행:

```sql
CREATE DATABASE IF NOT EXISTS zzames CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'YOUR_DB_PASSWORD';
GRANT ALL PRIVILEGES ON zzames.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 옵션 B. AWS RDS MariaDB

`.env.local`의 `DATABASE_URL`만 RDS 엔드포인트로 바꿉니다.

예시:

```env
DATABASE_URL="mysql://admin:YOUR_DB_PASSWORD@your-rds-endpoint.ap-northeast-2.rds.amazonaws.com:3306/zzames"
```

## 7. 앱 설치 및 빌드

```bash
cd /var/www/zzames
npm install
npm run prisma:generate
npx prisma db push
npm run prisma:seed
npm run build
```

## 8. PM2로 실행

프로젝트에 포함된 `ecosystem.config.js`를 그대로 사용합니다.

```bash
cd /var/www/zzames
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

상태 확인:

```bash
pm2 status
pm2 logs zzames
curl http://127.0.0.1:3000
```

## 9. Nginx 설정

프로젝트에 포함된 `deploy.nginx.conf`를 서버 설정으로 복사합니다.

```bash
sudo cp /var/www/zzames/deploy.nginx.conf /etc/nginx/sites-available/zzames
sudo ln -s /etc/nginx/sites-available/zzames /etc/nginx/sites-enabled/zzames
sudo rm -f /etc/nginx/sites-enabled/default
```

설정 파일의 `server_name`을 실제 도메인으로 수정한 뒤:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 10. HTTPS 설정

도메인이 연결되어 있으면:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

자동 갱신 확인:

```bash
sudo systemctl status certbot.timer
```

## 11. 배포 후 점검

```bash
curl -I http://127.0.0.1:3000
curl -I https://your-domain.com
pm2 status
sudo systemctl status nginx
```

브라우저에서 확인할 것:

- 홈 페이지 렌더링
- `About`, `Projects`, `Career` 앵커 이동
- `/projects/project-1` 상세 페이지
- `/login` 접근
- 관리자 로그인 후 생성 동작

## 12. 이후 배포 절차

코드 업데이트 시:

```bash
cd /var/www/zzames
git pull origin main
npm install
npm run prisma:generate
npx prisma db push
npm run build
pm2 restart zzames
```

## 13. 문제 해결

### 앱이 안 뜰 때

```bash
pm2 logs zzames
```

### Nginx 설정 문제

```bash
sudo nginx -t
```

### DB 연결 문제

```bash
mysql -h 127.0.0.1 -u admin -p -D zzames
```

### 포트 확인

```bash
ss -tunlp | grep 3000
ss -tunlp | grep 80
```

## 14. 운영 권장사항

- 가능하면 DB는 EC2 내부가 아니라 `RDS` 사용
- `.env.local`은 Git에 올리지 않음
- 보안 그룹에서 DB 포트 `3306`은 외부 전체 공개 금지
- `ADMIN_PASSWORD`, `NEXTAUTH_SECRET`는 반드시 강한 값 사용
- 정적 자산이 많아지면 나중에 `S3 + CloudFront`로 분리 고려
