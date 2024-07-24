import { Cards } from '@/app/lib/data';
import { getImgSrc } from '@/app/lib/help';

const getCard = (id: string) => {
  const d = Cards.find((card) => card.dbfId == id);

  return d;
};
const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  const card = getCard(slug);

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div>
        <img src={getImgSrc(card.id)} className="shrink-0 w-[400px] aspect-[64/97]" />
        构建ing
      </div>
      <div>
        {Object.values(card).map((v, i) => (
          <p key={i}></p>
        ))}
      </div>
    </div>
  );
};
export default Page;
