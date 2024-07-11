import { getCardGroup } from '@/app/api';
import { DeckContainer } from '@/app/components';
import { Card } from '@/type';

export const revalidate = 10;

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { card } = await getCardGroup(slug);
  const groupMap: Map<string, Card & { count: number }> = new Map();
  card.cards.forEach((card) => {
    const preCard = groupMap.get(card.id);
    if (preCard) {
      groupMap.set(card.id, { ...card, count: preCard.count + 1 });
      return;
    }
    groupMap.set(card.id, { ...card, count: 1 });
  });
  console.log(card.cards.length);
  return (
    <div className="bg-[#372B47] w-[100vw] flex flex-col h-[100vh]">
      <div className="xs:block  my-[20px] min-h-[500px]">
        <DeckContainer mode="show" defaultName={card.name} selectedCards={groupMap} />
      </div>
    </div>
  );
};
export default Page;
