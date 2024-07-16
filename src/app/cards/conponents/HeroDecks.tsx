/* eslint-disable react/jsx-no-undef */
import { JobsData } from '@/app/Const';
import Image from 'next/image';

type Props = {
  faction: (typeof JobsData)[number]['slug'];
};

const HeroDecks = ({ faction }: Props) => {
  const i = JobsData.find((a) => a.slug === faction);
  if (!i) return null;
  return (
    <div key={i.slug} className="px-[24px] mb-[24px]">
      <div className="w-[140px] cursor-pointer  aspect-[215/349] relative">
        <Image src={i.tile} className="w-full" alt={''} fill />
        <div className="absolute bottom-[90px] text-center left-0 right-0 text-[#fff] stroke font-bold text-[18px]">
          {i.name}
        </div>
      </div>
    </div>
  );
};
export default HeroDecks;
