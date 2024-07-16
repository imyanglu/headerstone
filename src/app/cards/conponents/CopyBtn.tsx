'use client';

import useToast from '@/app/lib/hooks';

const CopyBtn = ({ code }: { code: string }) => {
  const { addToast } = useToast();
  const copyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        addToast({
          type: 'success',
          title: '',
          message: '复制成功!',
        });
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: '',
          message: '复制失败!',
        });
      });
  };
  return (
    <div
      className="shrink-0 px-[6px] font-bold cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        copyCode();
      }}>
      复制
    </div>
  );
};
export default CopyBtn;
