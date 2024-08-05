'use client';

import { FC, useEffect } from 'react';
import { ToastType } from '../atoms/AddToastAtom';
import useToast from '../lib/hooks';

const BgDict: { [key in ToastType['type']]: string } = {
  success: '#FFFF94',
  error: '#954043',
  regular: '#fff',
};
const ColorDict: { [key in ToastType['type']]: string } = {
  success: '#000',
  error: '#Fff',
  regular: '#000',
};
const ToastItem: FC<ToastType & { onClose(id: string): void }> = ({
  id,
  message,
  type,
  duration,
  onClose,
}) => {
  useEffect(() => {
    if (duration < 0) return;
    let timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div
      className=" py-[6px] bg-white rounded-[12px] shadow-lg cardshadow fixed z-[99999] left-[50vw] top-[20px] px-[16px] translate-x-[-50%]"
      style={{
        backgroundClip: 'padding-box',
        backgroundColor: BgDict[type],
      }}>
      <div
        className="text-[17px]"
        style={{
          color: ColorDict[type],
        }}>
        {message}
      </div>
    </div>
  );
};

const Toast = () => {
  const { toasts, closeToast } = useToast();
  if (toasts.length === 0) return null;
  return (
    <>
      {toasts.map((a) => (
        <ToastItem key={a.id} {...a} onClose={closeToast} />
      ))}
    </>
  );
};

Toast.show = (type: 'success' | 'error' | 'regular', message: string, duration: number) => {
  console.log('xxx');
};
export default Toast;
