import dynamic from 'next/dynamic';

import { initDecks } from '../lib/action';

const ClientSection = dynamic(() => import('./components/ClientSection'), { ssr: false });

const Page = async () => {
  const decks = await initDecks();
  console.log(decks.length);
  return <ClientSection decks={decks} />;
};
export default Page;
