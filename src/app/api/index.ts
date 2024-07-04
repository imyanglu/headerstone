import { Card } from '@/type';
import axios from 'axios';
import { get, post } from './instance';

axios.defaults.baseURL = 'https://8.138.99.181:3000';
export const uploadNewCard = (params: Omit<Card, 'id'>) => {
  return post('/uploadCard', { data: params });
};
export const getCards = (classes: string) => {
  return get<{ cards: Card[] }>(`/getCards?classes=${classes}`).then((data) => {
    console.log(data);
    return data;
  });
};
