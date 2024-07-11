import { Card, CardGroupOverview } from '@/type';

import { get, post } from './instance';

export const uploadNewCard = (params: Omit<Card, 'id'>) => {
  return post('/uploadCard', { data: params });
};
type Params = {
  owner: string;
  cards: string[];
  type: string;
  winningRate: string;
  label: string;
  code: string;
  desc: string;
};

export const uploadCardGroup = (params: Params) => {
  return post('/uploadCardGroup', { data: params });
};
export const getCards = (classes: string) => {
  return get<{ cards: Card[] }>(`/getCards?classes=${classes}`).then((data) => {
    console.log(data);
    return data;
  });
};
export const getCardGroup = (
  slug: string
): Promise<{ card: Omit<CardGroupOverview, 'cards'> & { cards: Card[] } }> => {
  return fetch(`https://8.138.99.181:3000/cardGroup/${slug}`).then((res) => res.json());
};
