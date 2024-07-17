import { JobsData } from '../Const';
import { CardGroupOverview } from '@/type';
import ClientSection from './conponents/ClientSection';

const fetchData = async () => {
  const cardGroupResult = await fetch('https://8.138.99.181:3000/recommendOverview', {
    cache: 'no-cache',
  }).then((d) => d.json() as Promise<{ cards: CardGroupOverview[] }>);
  const cardsMap = cardGroupResult.cards.map((a) => ({
    ...a,
    pic: JobsData.find((i) => i.slug === a.type)?.pic ?? '',
  }));
  return cardsMap;
};

const Page = async () => {
  const data = await fetchData();
  return <ClientSection decks={data} />;
};
export default Page;
