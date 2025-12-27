import type { Metadata } from "next";
import { Watermark } from 'antd';
import "./globals.css";

// declare const name: string;

export const metadata: Metadata = {
  title: "AI赋能教学",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="w-screen h-screen"
    >
      <body
        className="antialiased w-screen h-screen"
      >
        <Watermark
          content='富春三小期末非纸质测评系统（模拟）'
          className="w-screen h-screen relative"
        >
          {children}
        </Watermark>
      </body>
    </html>
  );
}
