'use client';
/* eslint-disable @next/next/no-img-element */

import { JobsData } from '@/app/Const';
import { getImgSrc } from '@/app/lib/help';
import { useEffect, useMemo, useRef, useState } from 'react';

type SectionCard = {
  cards: any[];
  type: (typeof JobsData)[number]['slug'] | 'neutral';
  onCardClick?: (id: string) => void;
};

const columnHeight = 364;
const columnWidth = 240;

const countGrid = (size: { width: number; height: number }) => ({
  column: Math.max(Math.floor(size.width / columnWidth), 1),
  row: Math.max(Math.floor(size.height / columnHeight), 1),
});

const SectionCard = ({ cards, type, onCardClick }: SectionCard) => {
  const [grid, setGrid] = useState({ column: 0, row: 0 });
  const [page, setPage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const nextPage = () => {
    setPage((p) => p + 1);
  };
  const prePage = () => {
    setPage((p) => p - 1);
  };

  const pageCount = useMemo(() => {
    return Math.ceil(cards.length / (grid.column * grid.row));
  }, [grid, cards]);

  const count = grid.column * grid.row;
  useEffect(() => {
    console.log(cards);
    setPage(0);
  }, [cards]);
  useEffect(() => {
    setGrid(countGrid(gridRef.current?.getBoundingClientRect() || { width: 0, height: 0 }));
    const resizeChange = () => {
      window.requestAnimationFrame(() => {
        setPage(0);
      });
    };
    window.addEventListener('resize', resizeChange);
    return () => window.removeEventListener('resize', resizeChange);
  }, []);
  return (
    <div className="w-full h-full flex flex-col overflow-clip">
      <div className="flex  text-[rgb(97,67,38)] font-bold text-[16px]">
        {page > 0 && (
          <div
            className="w-[100px] cursor-pointer bg-[#C3B189] py-[4px] rounded-[4px] text-center"
            onClick={prePage}>
            上一页
          </div>
        )}
        <div
          className="w-[100px] cursor-pointer ml-auto  bg-[#C3B189] py-[4px] rounded-[4px] text-center"
          onClick={nextPage}>
          下一页
        </div>
      </div>
      <div ref={gridRef} className="relative z-[1] flex-1">
        {Array.from({ length: Math.ceil(cards.length / (count || 1)) }).map((_, i) => {
          const isShow = i <= page + 1 && i >= page - 1;
          const isScale = i < page;
          if (!isShow) return <></>;
          return (
            <div
              style={{
                zIndex: -i,
                transform: isScale ? `scale(${i < page ? 0 : 1}) ` : `scale(1)`,
                gridTemplateColumns: `repeat(${grid.column},240px)`,
              }}
              key={`page` + i}
              className="absolute shadow-lg bg-[#E8D5AA]  transition-transform inset-0 grid  items-center grid-cols-[repeat(auto-fit,240px)] w-full "
              onClick={(e) => {
                const target = e.target;
                if (target && target instanceof HTMLElement && target.dataset.id) {
                  const id = target.dataset.id;
                  onCardClick?.(id);
                }
              }}>
              {cards.slice(i * count, count * (i + 1)).map((card) => {
                return (
                  <div
                    key={card.id}
                    data-id={card.id}
                    className="w-[240px] cursor-pointer aspect-[202/279]"
                    draggable>
                    <img
                      data-id={card.id}
                      className="w-full "
                      src={getImgSrc(card.id)}
                      alt={card.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
                return <></>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SectionCard;
