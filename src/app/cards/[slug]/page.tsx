import { getCardGroup } from '@/app/api';
import { DeckContainer } from '@/app/components';
import { JobsData } from '@/app/Const';
import { Card, HsCard } from '@/type';
import Header from './components/Header';

export const revalidate = 10;

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { card } = await getCardGroup(slug);
  const groupMap: Map<string, HsCard & { count: number }> = new Map();
  card.cards.forEach((card) => {
    const preCard = groupMap.get(card.id);
    if (preCard) {
      groupMap.set(card.id, { ...card, count: preCard.count + 1 });
      return;
    }
    groupMap.set(card.id, { ...card, count: 1 });
  });

  return (
    <div className="bg-[#372B47] w-[100vw] flex flex-col h-[100vh]">
      <div className="h-[80px] w-full">
        <Header code={card.code} />
      </div>
      <div className="xs:block  my-[20px] min-h-[500px]">
        <DeckContainer
          thumbnail={JobsData.find((a) => a.slug === card.type)!.thumbnail}
          mode="show"
          defaultName={card.name}
          selectedCards={groupMap}
        />
      </div>
    </div>
  );
};
export default Page;
