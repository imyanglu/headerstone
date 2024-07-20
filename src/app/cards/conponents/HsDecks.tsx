'use client';
import { useEffect, useRef } from 'react';
import cardsJson from '../../../../public/data/cards.json';
import DecksJson from '../../../../public/data/decks.json';

const HsDecks = () => {
  const decksArr = useRef(DecksJson as Array<object>);
  useEffect(() => {
    let time = new Date().getTime();
    console.log(DecksJson.length);
  }, []);
  return (
    <div>
      {/* {decksArr.current.slice(0, 10).map((deck) => (
        <div key={deck.id}>{deck.name}</div>
      ))} */}
    </div>
  );
};

export default HsDecks;
