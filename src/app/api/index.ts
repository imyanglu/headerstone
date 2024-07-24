import { Card, CardGroupOverview, HsCard, Me } from '@/type';

import { get, post } from './instance';
import { setCookie } from '../lib';

const url = 'https://8.138.99.181:3000';
export const uploadNewCard = (params: Omit<HsCard, 'id'>) => {
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
  return get<{ cards: HsCard[] }>(`/getCards?faction=${classes}`).then((data) => {
    return data;
  });
};
export const getCardGroup = (slug: string): Promise<{ card: CardGroupOverview }> => {
  return fetch(`${url}/cardGroup/${slug}`).then((res) => res.json());
};

export const getUploadUrl = (type?: string) => {
  return get<{ uploadUrl: string }>('/uploadUrl', { type: type ?? 'headerstone' });
};
export const uploadFile = async (
  file: File,
  url: string
): Promise<{
  err: number;
  id: string;
  ids: string;
  size: number;
  url: string;
  urls: string[];
}> => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then((d) => d.json());
};

export const getVerifyCode = (email: string, id: string) => {
  return get('/getCode', { email, id });
};

export const verifyCodeById = (data: { code: string; id: string }) => {
  return get<{ token: string; user?: Me; code?: number; message?: string }>('/verify', data).then(
    (res) => {
      if (res?.token) {
        setCookie('token', res.token, 30);
      }
      return res;
    }
  );
};

export const getHeroDeckByFaction = (f: string): Promise<{ decks: CardGroupOverview[] }> => {
  return fetch(`https://8.138.99.181:3000/cardGroup/faction/${f}`, { cache: 'no-cache' })
    .then((d) => d.json())
    .catch((d) => {
      return {
        decks: [],
      };
    });
};
export const uploadHsCard = (p: any) => {
  return post('/uploadHsCard', { data: p });
};
