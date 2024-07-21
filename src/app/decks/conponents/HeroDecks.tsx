/* eslint-disable react/jsx-no-undef */
import { getHeroDeckByFaction } from '@/app/api';
import { JobsData } from '@/app/Const';
import Image from 'next/image';
import CopyBtn from './CopyBtn';

type Props = {
  faction: (typeof JobsData)[number]['slug'];
};

const fetchHeroDeck = async (faction: string) => {
  return getHeroDeckByFaction(faction);
};

const HeroDecks = async ({ faction }: Props) => {
  const i = JobsData.find((a) => a.slug === faction);
  if (!i) return null;
  const decks = (await fetchHeroDeck(faction)).decks;

  return (
    <div key={i.slug} className="px-[24px] mb-[24px] flex ">
      <div className="w-[140px] cursor-pointer  aspect-[215/349] relative">
        <Image src={i.tile} className="w-full" alt={''} fill />
        <div className="absolute bottom-[90px] text-center left-0 right-0 text-[#fff] stroke font-bold text-[18px]">
          {i.name}
        </div>
      </div>
      <div className="flex flex-wrap py-[12px] ml-[12px]">
        {decks.map((a) => (
          <a
            href={`/decks/${a.id}`}
            key={a.id}
            className="w-[fit-content] max-w-[160px] text-[#fff] rounded-[4px] outline-[#D7B96D] border-[1px] bg-[#3D0D0D] outline h-[fit-content] px-[8px] py-[8px]">
            <div className="text-[14px] underline">{a.name}</div>
            <div className="text-[rgb(33,163,25)] font-bold mt-[2px] text-[12px]">
              胜率{a.winningRate}%
            </div>

            <div className="flex items-center  text-[14px]      bg-[#3D0D0D] text-[#fff]">
              <div className=" line-clamp-1 break-all">{a.code}</div>
              {a.code && <CopyBtn code={a.code} />}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default HeroDecks;
