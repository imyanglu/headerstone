import dynamic from 'next/dynamic';
import { JobsData } from '../Const';
import { CardGroupOverview } from '@/type';
import { Decks } from '../lib/data';

const ClientSection = dynamic(() => import('./components/ClientSection'), { ssr: false });
const baseUrl = 'https://8.138.99.181:3000/recommendOverview';
const fetchData = async () => {
  try {
    const cardGroupResult = await fetch(baseUrl, {
      cache: 'no-cache',
    }).then((d) => d.json() as Promise<{ cards: CardGroupOverview[] }>);
    const cardsMap = cardGroupResult.cards.map((a) => ({
      ...a,
      pic: JobsData.find((i) => i.slug === a.type)?.pic ?? '',
    }));
    return cardsMap;
  } catch (err) {
  
    return [];
  }
};

const fetchPreview = async () => {
  try {
    const cardGroupResult = await fetch(baseUrl + '?preview=true', {
      cache: 'no-cache',
    }).then((d) => d.json() as Promise<{ cards: CardGroupOverview[] }>);
    const cardsMap = cardGroupResult.cards.map((a) => ({
      ...a,
      pic: JobsData.find((i) => i.slug === a.type)?.pic ?? '',
    }));
    return cardsMap;
  } catch (err) {
  
    return [];
  }
};

const Page = async () => {
  const data = await fetchData();
  const previewDecks = await fetchPreview();
  return <ClientSection decks={Decks} />;
};
export default Page;
