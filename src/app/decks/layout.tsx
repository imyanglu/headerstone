import { Metadata } from 'next';
import { ReactNode } from 'react';
import { JobsData } from '../Const';

export const metadata: Metadata = {
  title: '炉石传说',
  description: `炉石查询网站,炉石,游戏,卡牌,查询 ${JobsData.map((a) => a.name).toString()}`,
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
export default Layout;
