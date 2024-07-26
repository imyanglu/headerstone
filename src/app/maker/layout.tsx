import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '卡牌制作',
  description: '炉石,卡牌,卡牌制作',
};
const layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
export default layout;
