import { useEffect, useRef, useState } from 'react';

type List<T> = {
  list: T[];
  init: number;
  overScan: 10;
  renderItem: (item: T) => JSX.Element;
};

const List = <T extends any>({ list: nativeList, init = 10, overScan, renderItem }: List<T>) => {
  const [list, setList] = useState<T[]>(nativeList.slice(0, init));
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return (
    <div className="h-full overflow-y-auto" ref={containerRef}>
      <div ref={wrapperRef}>{list.map((item, index) => renderItem(item))}</div>
    </div>
  );
};
export default List;
