/* eslint-disable @next/next/no-img-element */
import { getCardGroup } from '@/app/api';
import { DeckContainer, Title } from '@/app/components';
import { JobsData } from '@/app/Const';
import { HsCard } from '@/type';
import Header from './components/Header';
import { StandardCards } from '@/app/lib/data';
import { getImgSrc } from '@/app/lib/help';
export const revalidate = 10;

export const runtime = 'edge';

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { card } = await getCardGroup(slug);
  const cardIdx = card.cards.split(',');

  const cards = StandardCards.filter((a) => cardIdx.includes(a.id));
  const groupMap: Map<string, HsCard & { count: number }> = new Map();

  cardIdx.forEach((id) => {
    const preCard = groupMap.get(id);
    const cCard = cards.find((a) => a.id === id);
    if (!cCard) return;

    if (preCard) {
      groupMap.set(id, { ...cCard, count: 2 });
      return;
    }
    groupMap.set(id, { ...cCard, count: 1 });
  });

  const regularCards = Array.from(groupMap.values()).filter((a) => a?.cardClass === 'NEUTRAL');
  const decks = Array.from(groupMap.values()).filter((a) => a?.cardClass !== 'NEUTRAL');
  const hero = JobsData.find((a) => a.slug === card.type);

  return (
    <div className="bg-[#372B47] w-[100vw] flex flex-col h-[100vh]">
      <div className="h-[100px] w-full">
        <Header code={card.code} />
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
            thumbnail={JobsData.find((a) => a.slug === card.type)!.thumbnail}
            mode="show"
            defaultName={card.name}
            selectedCards={groupMap}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
