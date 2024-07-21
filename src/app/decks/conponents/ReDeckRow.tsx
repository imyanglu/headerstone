/* eslint-disable @next/next/no-img-element */
import { useMemo, useRef } from 'react';
import { ReDeck } from './HsDecks';
import { JobsData } from '@/app/Const';
import Cards from '../../../../public/data/cards.json';
import WinDeck from '../../../../public/data/winRate.json';
import { Card, ReHsCard } from '@/type';

type WinDeck = {
  archetype_id: number;
  avg_game_length_seconds: number;
  avg_num_player_turns: number;
  deck_id: string;
  deck_list: string;
  deck_sideboard: string;
  digest: string;
  total_games: number;
  win_rate: number;
};
type WinDeckOverView = {
  asf_of: string;
  render_as: string;
  series: {
    data: { [key in string]: WinDeck[] };
  };
  metadata: {};
};

const ReDeckRow = ({ name, player_class_name, standard_ccp_signature_core, id }: ReDeck) => {
  const card = useRef();
  const rateObjArr = useRef((WinDeck as unknown as WinDeckOverView).series.data);
  const { faction } = useMemo(() => {
    const f = player_class_name.toLowerCase();
    const rate = rateObjArr.current[player_class_name];

    const cRate = rate.find((i) => i.archetype_id === id);

    return { faction: JobsData.find((job) => job.slug === f) };
  }, []);

  const cards = useMemo(() => {
    const cores = standard_ccp_signature_core?.components;
    if (!cores) return [];
    return (Cards as ReHsCard[]).filter((a) => cores.includes(Number(a.dbfId)));
  }, []);

  return (
    <>
      <div className="py-[12px] flex w-full items-center px-[16px]">
        <img className=" w-[32px] h-[32px] rounded-full" src={faction?.weapon} alt="" />
        <div className="w-[60px] sm:w-[100px] ml-[16px]">
          <a className="font-bold line-clamp-1 break-all">
            {name}
            {id}
          </a>

          <div className="flex items-center mt-[4px] h-[18px]">
            {/* {forge && (
              <>
                <img
                  className="w-[12px] h-[17px]"
                  src="https://pic.imgdb.cn/item/6697b0ddd9c307b7e96455fc.png"
                  alt=""
                />
                <p className="text-[12px] ml-[4px]">{forge}</p>
              </>
            )} */}
          </div>
        </div>
        <div className="ml-[8px] text-[12px] sm:text-[12px] flex">
          {cards.map((a) => (
            <div key={a.name}>{a.name}</div>
          ))}
          {/* 胜率:&nbsp;<strong className="text-[rgb(31,173,30)]">{winningRate}%</strong> */}
        </div>
      </div>
      <div className="w-full h-[1px] bg-black" />
    </>
  );
};
export default ReDeckRow;
