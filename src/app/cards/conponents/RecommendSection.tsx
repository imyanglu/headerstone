import { Title, Card } from '@/app/components';
import CardGroup from './CardGroup';
import { JobsData } from '@/app/Const';
import { CardGroupOverview } from '@/type';

const fetchData = async () => {
  const cardGroupResult = await fetch('https://8.138.99.181:3000/recommendOverview').then(
    (d) => d.json() as Promise<{ cards: CardGroupOverview[] }>
  );
  const cardsMap = cardGroupResult.cards.map((a) => ({
    ...a,
    pic: JobsData.find((i) => i.slug === a.type)?.pic ?? '',
  }));
  return cardsMap;
};
const RecommendSection = async () => {
  const data = await fetchData();

  return (
    <div className="">
      <Title
        label={
          <div className="text-[rgb(97,67,38)] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">
            今日推荐
          </div>
        }
      />
      {data.map((i) => (
        <CardGroup key={i.code} {...i} cards={[]} />
      ))}
    </div>
  );
};
export default RecommendSection;
