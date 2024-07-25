'use client';

import { ReactNode, useEffect, useState } from 'react';

type Select<T extends object> = {
  children: React.ReactNode;
  list: T[];
  renderItem: (data: { item: T; index: number }) => ReactNode;
  containerClassName?: string;
  maxListHeight?: number;
};
const Select = <T extends object>({
  children,
  list,
  renderItem,
  maxListHeight = 300,
  containerClassName,
}: Select<T>) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const click = () => {
      setVisible(false);
    };
    document.addEventListener('click', click);
    return () => {
      document.removeEventListener('click', click);
    };
  }, []);
  return (
    <>
      <div
        className="relative"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          setVisible((f) => !f);
        }}>
        {children}
        <div
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
          }}
          className={`absolute overflow-y-auto py-[2px] hideScrollbar bottom-0 rounded-[8px] shadow-lg h-fit translate-y-[calc(100%+8px)]  z-[2] ${containerClassName}`}
          style={{ display: visible ? 'block' : 'none', maxHeight: maxListHeight + 'px' }}>
          {list.map((a, idx) => (
            <div key={idx}>{renderItem({ item: a, index: idx })}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Select;
