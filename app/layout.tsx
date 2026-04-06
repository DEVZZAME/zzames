import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "강한솔 | Back-end Developer",
  description: "데이터 흐름을 설계하고 서비스로 구현하는 백엔드 개발자 강한솔의 포트폴리오 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
