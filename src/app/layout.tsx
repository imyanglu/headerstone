import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PreLoad } from './components';
import Toast from './components/Toast';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '炉石传说',
  description: '炉石查询网站,炉石,游戏,卡牌,查询',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PreLoad
        sources={[
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d0cc4d9c307b7e91e8c79.png' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d1ca7d9c307b7e933d0f0.png' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d0d01d9c307b7e91edd12.png' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d0e8bd9c307b7e9210e45.png' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d1cd3d9c307b7e93403ff.png' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d0dc3d9c307b7e91ffe1c.png' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668d0de4d9c307b7e9202bca.pn' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/668303e2d9c307b7e9916910.webp' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/6682fc04d9c307b7e98a9912.webp' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/6683b34dd9c307b7e9a0f930.jpg' },
          { type: 'img', src: 'https://pic.imgdb.cn/item/66845bc1d9c307b7e9f0d558.png' },
        ]}
      />
      <body className={inter.className}>
        {children}
        <Toast />
        <Analytics />
      </body>
    </html>
  );
}
