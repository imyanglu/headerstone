import { Title, Card, CardsContainer } from '@/app/components';
import CardGroup from './CardGroup';

import { CardGroupOverview } from '@/type';

const RecommendSection = async ({
  recommendCards,
}: {
  recommendCards: (CardGroupOverview & { pic: string })[];
}) => {
  return (
    <CardsContainer
      label={
        <div className="text-[rgb(97,67,38)] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">
          胜率推荐
        </div>
      }>
      <div className="grid mt-[20px] grid-cols-[repeat(auto-fit,220px)] gap-[24px] justify-center">
        {recommendCards.map((i) => (
          <CardGroup key={i.code} {...i} cards={[]} />
        ))}
      </div>
    </CardsContainer>
  );
};
export default RecommendSection;
