/* eslint-disable @next/next/no-img-element */
import Title from './Title';

type Props = {
  label: React.ReactNode;
  children?: React.ReactNode;
};
const CardsContainer = ({ label, children }: Props) => {
  return (
    <div className="">
      <Title type="neutral" label={label} />
      {children}
      <div className="h-[1px] bg-[#C1AB82] w-full mt-[32px]" />
    </div>
  );
};
export default CardsContainer;
