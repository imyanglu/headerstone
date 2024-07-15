import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { ToastAtom, ToastType } from '../atoms/AddToastAtom';

const useToast = () => {
  const [toasts, setToasts] = useAtom(ToastAtom);
  const addToast = (data: Omit<ToastType, 'id' | 'duration'> & { duration?: number }) => {
    const id = nanoid();
    setToasts((prev) => [...prev, { id, ...data, duration: data.duration || 1000 }]);
    return id;
  };
  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  return {
    toasts,
    addToast,
    closeToast,
  };
};

export default useToast;
