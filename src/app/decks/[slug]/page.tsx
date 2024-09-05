/* eslint-disable @next/next/no-img-element */

import { DeckContainer, Title } from '@/app/components';
import { JobsData } from '@/app/Const';
import { HsCard } from '@/type';
import Header from './components/Header';
import { Decks, StandardCards } from '@/app/lib/data';
import { generateDeckInfo, getImgSrc } from '@/app/lib/help';
import { notFound } from 'next/navigation';
export const revalidate = 10;

const queryDeck = async (slug: string) => {
  const deck = Decks.find((a) => a.id === slug);
  return deck;
};
const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const deck = await queryDeck(slug);

  if (!deck) {
    notFound();
  }

  const { code } = generateDeckInfo({
    playerClass: deck?.playerClass,
    components: deck.cards,
    sideboardCards: deck.deckSideboard,
    format: 2,
    slug:deck.slug
  });
  const cardIds = JSON.parse(deck.cards).map((a: [number, number]) => a[0]);

  const cards = StandardCards.filter((a) => cardIds.includes(a.dbfId));

  const groupMap: Map<string, HsCard & { count: number }> = new Map();
  JSON.parse(deck.cards).forEach((i: [number, number]) => {
    const p = groupMap.get(i[0] + '');
    if (p) return;
   
    groupMap.set(i[0] + '', { ...cards.find((a) => a.dbfId == i[0]), count: i[1] });
  });

  const regularCards = Array.from(groupMap.values()).filter((a) => a?.cardClass === 'NEUTRAL');
  const decks = Array.from(groupMap.values()).filter((a) => a?.cardClass !== 'NEUTRAL');
  const hero = JobsData.find((a) => a.slug === deck.slug);

  return (
    <div className="bg-[#372B47] w-[100vw] flex flex-col h-[100vh]">
      <div className="h-[100px] w-full">
        <Header code={code} />
      </div>
      <div className="flex px-[24px] h-[calc(100vh-100px)]">
        <div className="overflow-y-scroll flex-1 hideScrollbar   hideScrollbar hidden md:flex flex-col pr-[24px]">
          <div className="w-full">
            {hero && (
              <Title
                type={hero.slug}
                label={
                  <div className="text-[#fff] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">
                    {hero.name}
                  </div>
                }
              />
            )}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] w-full gap-[8px] ">
            {decks.map((card) => (
              <div key={card.id} className="w-[260px]  cursor-pointer aspect-[202/279]">
                <img
                  className="w-full "
                  src={getImgSrc(card.id)}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div className="w-full">
            {regularCards.length > 0 && (
              <Title
                type="neutral"
                label={
                  <div className="text-[#fff] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">
                    中立卡牌
                  </div>
                }
              />
            )}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-[8px] w-full  ">
            {regularCards.map((card) => (
              <div key={card.id} className="w-[260px]  cursor-pointer aspect-[202/279]" draggable>
                <img
                  className="w-full "
                  src={getImgSrc(card.id)}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="xs:block mx-auto py-[20px]">
          <DeckContainer
            thumbnail={JobsData.find((a) => a.slug === deck.slug)!.thumbnail}
            mode="show"
            defaultName={deck.name}
            selectedCards={groupMap}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
