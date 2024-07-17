import { Title } from '@/app/components';
import { JobsData } from '@/app/Const';
import Image from 'next/image';

const Rate: { [key in (typeof JobsData)[number]['slug']]: number } = {
  paladin: 56.6,
  hunter: 53.6,
  druid: 50.8,
  demonhunter: 50.1,
  deathknight: 49.7,
  warlock: 49.6,
  warrior: 48.1,
  mage: 47.1,
  priest: 46.8,
  rogue: 45.9,
  shaman: 45.2,
};

const WinningRate = JobsData.map((a) => ({ ...a, rate: Rate[a.slug] })).sort(
  (a, b) => b.rate - a.rate
);

const RankList = () => {
  return (
    <div className="relative">
      <Title label="职业胜率" />
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,1fr))] gap-[12px] ">
        {WinningRate.map((a, i) => (
          <div
            key={a.slug}
            className="text-[#fff] overflow-hidden mb-[24px] borderImg py-[30px] mx-auto w-[280px] h-[80px] stroke font-bold flex relative items-center pl-[12px]">
            <div className="w-full absolute inset-0">
              <Image src={a.thumbnail} fill alt="" />
              <div className="absolute inset-0 bg-[#00000045]" />
            </div>
            <div className="relative z-1 flex w-full">
              <div className="flex-1">
                #{i + 1} {a.name}
              </div>
              <div className="ml-auto w-[60px]">{a.rate}%</div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute w-[2px] bg-black top-0 bottom-0 right-0" />
    </div>
  );
};
export default RankList;
