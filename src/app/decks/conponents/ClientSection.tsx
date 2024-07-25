/* eslint-disable @next/next/no-img-element */
'use client';
import { CardGroupOverview } from '@/type';
import Image from 'next/image';
import CardItem from './CardItem';
import CardGroup from './CardGroup';
import { useCallback, useMemo, useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { JobsData } from '@/app/Const';
import { Select } from '@/app/components';

type Filters = {
  searchText: string;
  selectedKey: string;
};
const ClientSection = ({
  decks,
  previewDecks,
}: {
  decks: (CardGroupOverview & { pic: string })[];
  previewDecks: (CardGroupOverview & { pic: string })[];
}) => {
  const [filters, setFilters] = useState<Filters>({ searchText: '', selectedKey: '' });

  const [selectedSection, setSelectedSection] = useState<'recommend' | 'preview'>(
    window.location.hash === '#preview' ? 'preview' : 'recommend'
  );

  const changeFilters = <T extends keyof Filters>(k: T, v: Filters[T]) => {
    setFilters((s) => ({ ...s, [k]: v }));
  };

  const Factions = useMemo(() => {
    const f: Record<'key' | 'label' | 'pic', string>[] = JobsData.map((a) => {
      return {
        key: a.slug,
        label: a.name,
        pic: a.weapon,
      };
    });
    f.unshift({ key: '', label: '所有职业', pic: '/faction.png' });
    return f;
  }, []);

  const selectedFaction = Factions.find((a) => a.key === filters.selectedKey);

  const bestDeck = useMemo(() => {
    const dArr = decks.sort((a, b) => Number(b.winningRate) - Number(a.winningRate));
    return dArr[0];
  }, [decks]);

  const renderItem = useCallback(
    (data: { item: Record<'key' | 'label' | 'pic', string>; index: number }) => {
      const { item } = data;
      return (
        <div
          className="flex w-[132px] items-center py-[6px] pl-[6px] cursor-pointer "
          onClick={() => {
            changeFilters('selectedKey', item.key);
          }}>
          <img
            className="w-[32px] h-[32px] border-[2px] rounded-[16px] border-[#AC6625]"
            src={item.pic}
            alt=""
          />
          <div className="text-[14px] ml-[8px] text-[#fff] stroke">{item.label}</div>
        </div>
      );
    },
    []
  );

  const isRecommend = selectedSection === 'recommend';

  const processDecks = useMemo(() => {
    const { searchText, selectedKey } = filters;
    return (isRecommend ? decks : previewDecks).filter(
      (a) => a.name.includes(searchText) && (!selectedKey || a.type === filters.selectedKey)
    );
  }, [filters, decks, isRecommend]);

  return (
    <div className="w-[100vw] bg-[#76191A] flex flex-col min-h-[100vh] ]">
      <div className="fixed top-0 z-[10] w-full h-[100px] flex items-center bg-[#561212] ">
        <div className="absolute top-[1px] z-[10] h-[30px] w-full ">
          <Image src="https://pic.imgdb.cn/item/6683b127d9c307b7e99abe59.png" alt="" fill />
        </div>
        <div className="absolute top-0 bottom-0 w-full h-[100px] shadow-lg">
          <Image fill alt="bg1" src="https://pic.imgdb.cn/item/6683ae9bd9c307b7e993615e.jpg" />
        </div>
        <div className="absolute bottom-0 h-[20px] w-full">
          <Image src="https://pic.imgdb.cn/item/6683b07cd9c307b7e998b6a1.png" alt="" fill />
        </div>
        <a
          href="/"
          className="relative z-2 px-[24px] text-[#fff] font-bold text-[16px] md:text-[26px]">
          LSCX.Xyz
        </a>
        <div className="hidden md:block border-[4px] shadow-lg outline-[#681715] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[8px]">
          <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] text-[16px] py-[4px]  rounded-[6px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            卡组查询
          </div>
        </div>
        <div className="ml-auto relative z-[3] mr-[24px] flex items-center">
          {/* <a className="flex outline outline-[3px] px-[16px] text-[12px] sm:text-[16px] py-[4px]  rounded-[6px] border-[2px]  font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            新卡速递🥵
          </a> */}
          <a
            href="/cards/query"
            className="flex ml-[4px] sm:ml-[12px]  text-[12px] px-[16px] sm:text-[16px] py-[4px]  rounded-[6px]  font-bold  text-[#fff]">
            卡牌库
          </a>
        </div>
      </div>
      <div className="h-[100px]" />

      <div className="flex-1 mainSection bg-[#E9D6AB] flex flex-col lg:flex-row">
        <div className="lg:w-[300px] w-full shrink-0 bg-[#531211] pb-[20px]">
          <div className="text-[#fff] font-bold text-center py-[16px]">卡组推荐</div>
          <CardGroup {...bestDeck} />
        </div>
        <div className="flex flex-col flex-1 pt-[20px]  w-full">
          <div className="flex items-center w-full px-[16px]">
            <Select
              containerClassName="bg-[#3D362F] border-[2px] border-[#000]"
              list={Factions.filter((a) => a.key !== filters.selectedKey)}
              renderItem={renderItem}>
              <div className="flex items-center cursor-pointer px-[2px] bg-[#FFFF94] outline outline-[3px] outline-[#dbc17f]  border-[#000] h-[36px] rounded-[18px]">
                <img
                  src={selectedFaction?.pic}
                  className="w-[32px] h-[32px] border-[2px] rounded-[16px] border-[#AC6625]"
                  alt=""
                />
                <div className="hidden sm:block font-bold text-[rgb(97,67,38)] ml-[8px] text-[14px] w-[100px]">
                  {selectedFaction?.label}
                </div>
              </div>
            </Select>
            <div className="border-[4px] w-[fit-content] shadow-lg outline-[#c1b79f] outline-[2px] mx-auto outline border-[#d5bebe]  relative z-[2] rounded-[24px]">
              <div className=" outline-[#c2b085] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[24px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
                <input
                  placeholder="搜索..."
                  className="outline-none text-[14px]  py-[3px]  font-bold bg-[#3D0D0D] text-[#fff]"
                  onChange={(e) => changeFilters('searchText', e.target.value)}
                />
                <div
                  className="h-[30px] w-[30px] cursor-pointer absolute right-[10px]  flex items-center justify-end"
                  onClick={() => {}}>
                  <img src="/search.svg" alt="search" className="w-[24px] h-[24px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="stroke text-[#FFFF94] relative">
            <div className="w-full flex px-[16px] pt-[24px]">
              <a
                href="#recommend"
                style={{
                  backgroundColor: isRecommend ? '#C09B41' : '#ccc',
                  transform: isRecommend ? 'scale(1)' : 'scale(0.85)',
                }}
                onClick={(e) => {
                  setSelectedSection('recommend');
                }}
                className="px-[12px] text-[14px] cursor-pointer transition-transform origin-bottom py-[6px] rounded-[8px]  rounded-b-none border-[1px]   outline-[#EAD5A8] outline-[2px] outline">
                推荐卡组
              </a>
              <a
                style={{
                  backgroundColor: !isRecommend ? '#C09B41' : '#ccc',
                  transform: !isRecommend ? 'scale(1)' : 'scale(0.85)',
                }}
                href="#preview"
                onClick={(e) => {
                  setSelectedSection('preview');
                }}
                className="ml-[2px] text-[14px] cursor-pointer origin-bottom transition-transform px-[12px] py-[6px] rounded-[8px] rounded-b-none ">
                新版本卡组
              </a>
              <div className="border-1 absolute bottom-0 left-0 right-0 h-[3px] bg-[#5F1615] " />
            </div>
          </div>

          <div className="flex h-full min-h-[400px] transition-opacity flex-col px-[16px] w-full pb-[30px] pt-[8px]">
            <AutoSizer>
              {({ height, width }) =>
                isRecommend ? (
                  <List
                    rowCount={processDecks.length}
                    rowHeight={72}
                    height={height}
                    width={width}
                    rowRenderer={({ index, style, key }) => {
                      const i = processDecks[index];
                      return (
                        <div style={style} key={key}>
                          <CardItem {...i} />
                        </div>
                      );
                    }}
                  />
                ) : (
                  <List
                    rowCount={processDecks.length}
                    rowHeight={72}
                    height={height}
                    width={width}
                    rowRenderer={({ index, style, key }) => {
                      const i = processDecks[index];
                      return (
                        <div style={style} key={key}>
                          <CardItem {...i} isPreview />
                        </div>
                      );
                    }}
                  />
                )
              }
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientSection;
