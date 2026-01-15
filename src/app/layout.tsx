import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KakaoSDKLoader from "@/features/share/components/KakaoSDKLoader";
import Header from "@/features/landing/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "모청 - 모바일 청첩장 제작 서비스",
  description: "코딩 없이 드래그 앤 드롭으로 나만의 청첩장을 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 카카오 JavaScript 키 (환경 변수에서 가져오거나 기본값 사용)
  const kakaoJsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '';

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {kakaoJsKey && (
          <KakaoSDKLoader jsKey={kakaoJsKey} />
        )}
        <Header />
        {children}
      </body>
    </html>
  );
}
