import { atom } from 'jotai';

export type ToastType = {
  id: string;
  message: string;
  title: string;
  type: 'success' | 'error' | 'regular';
  duration: number;
};

export const ToastAtom = atom<ToastType[]>([]);
