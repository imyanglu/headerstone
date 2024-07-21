'use client';
import { useEffect, useRef } from 'react';

import DecksJson from '../../../../public/data/decks.json';
import WinDeck from '../../../../public/data/winRate.json';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import CardItem from './CardItem';
import { JobsData } from '@/app/Const';
import ReDeckRow from './ReDeckRow';

export type ReDeck = {
  id: number;
  name: string;
  player_class: 2;
  player_class_name: string;
  standard_ccp_signature_core: {
    as_of: string;
    format: number;
    components: Array<number>;
  };
  url: string;
};

const HsDecks = () => {
  const decksArr = useRef(DecksJson as Array<ReDeck>);
  const renderItem = ({ index, key, style }: ListRowProps) => {
    const item = decksArr.current[index];
    if (!item) return <></>;
    return (
      <div key={key} style={style}>
        <ReDeckRow {...item} />
      </div>
    );
  };
  useEffect(() => {
    let time = new Date().getTime();
    console.log(DecksJson[0]);
  }, []);
  return (
    <div className="w-full h-full">
      <AutoSizer>
        {({ width, height }) => {
          return (
            <List
              width={width}
              height={height}
              rowCount={decksArr.current.length}
              rowHeight={70}
              rowRenderer={renderItem}
            />
          );
        }}
      </AutoSizer>
      {/* {decksArr.current.slice(0, 10).map((deck) => (
        <div key={deck.id}>{deck.name}</div>
      ))} */}
    </div>
  );
};

export default HsDecks;
