import { Me } from '@/type';
import { getStorage, saveStorage } from './storage';
import { nanoid } from 'nanoid';

export type Cookie = {
  user: Me;
  token: string;
};

export function getCookie(name: keyof Cookie) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  }
  return null;
}

export function setCookie<T extends keyof Cookie>(name: T, value: Cookie[T], daysToExpire: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
    JSON.stringify(value)
  )}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

export function deleteCookie(name: keyof Cookie) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const getId = () => {
  const id = getStorage('id');
  if (id) return id;
  const newId = nanoid();
  saveStorage('id', newId);
  return newId;
};
