/* eslint-disable @next/next/no-img-element */
'use client';
import { getCards, uploadCardGroup } from '@/app/api';
import { DeckContainer, ManaControl, Title } from '@/app/components';
import { Card } from '@/type';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import EditCardGroupModal from './components/EditCardGroupModal';
import { JobsData } from '@/app/Const';
import Header from './components/Header';

type Filters = {
  cost: [number, number];
  searchText: string;
};

type SelectedCard = Card & { count: number };

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [activeModal, setActiveModal] = useState(false);
  const [name, setName] = useState('');
  const [selectedCards, setSelectedCards] = useState<Map<string, SelectedCard>>();
  const [filters, setFilters] = useState<Filters>({ cost: [-1, 100], searchText: '' });
  const { professionalCards, regularCards } = useMemo(() => {
    return {
      professionalCards: cards.filter((i) => {
        console.log(i);
        return i.classes === params.slug;
      }),
      regularCards: cards.filter((i) => i.classes === 'all'),
    };
  }, [cards, filters, params.slug]);

  const type = useMemo(() => {
    if (!params.slug) return null;
    return JobsData.find((i) => i.slug === params.slug);
  }, [params.slug]);
  const initCards = () => {
    const slug = params.slug;
    getCards(`${slug},all`)
      .then((data) => {
        setCards(data.cards);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const checkVerify = (newCard: SelectedCard) => {
    return true;
  };

  const addCards = (id: string) => {
    const newCards = new Map(selectedCards);
    const sCard = cards.find((i) => i.id === id);
    if (!sCard) return;
    const count = selectedCards?.has(id) ? (selectedCards?.get(id) as SelectedCard).count + 1 : 1;
    const newCard = { ...sCard, count };
    newCards.set(id, newCard);
    if (checkVerify(newCard)) setSelectedCards(newCards);
  };

  const publishCards = (info: Record<'code' | 'author' | 'rate', string>) => {
    const { code, author, rate } = info;
    const cardIds = selectedCards
      ? (Array.from(selectedCards.values())
          .sort((a1, a2) => a1.cost - a2.cost)
          .map((i) => {
            return Array.from({ length: i.count }, () => i.id);
          })
          .flat(Infinity) as string[])
      : [];
    const req = {
      code,
      name,
      winningRate: rate,
      owner: author,
      cards: cardIds,
      type: params.slug,
      label: '',
      desc: '',
    };
    uploadCardGroup(req)
      .then()
      .finally(() => {
        setActiveModal(false);
      });
  };
  const showModal = (name: string) => {
    setName(name);
    setActiveModal(true);
  };

  useEffect(() => {
    initCards();
  }, []);

  return (
    <div className="w-[100vw] bg-[#E8D5AA] flex h-[100vh] ">
      <Header />
      <div className="flex flex-col mt-[100px] pt-[24px]  flex-1 items-center overflow-y-scroll  h-[calc(100vh-100px)] mainSection px-[32px] hideScrollbar">
        <div className="w-full">
          {!loading && (
            <Title
              type={type?.slug}
              label={
                <div className="text-[rgb(97,67,38)] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">
                  {type?.name}
                </div>
              }
            />
          )}
        </div>
        <div
          className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] w-full   px-[12px]"
          onClick={(e) => {
            const target = e.target;
            if (target && target instanceof HTMLElement && target.dataset.id) {
              const id = target.dataset.id;
              addCards(id);
            }
          }}>
          {professionalCards.map((card) => (
            <div
              key={card.id}
              data-id={card.id}
              className="w-[240px]  cursor-pointer aspect-[202/279]"
              draggable>
              <img data-id={card.id} className="w-full " src={card.pic} alt={card.name} />
            </div>
          ))}
        </div>
        <div className="w-full">
          {!loading && (
            <Title
              label={
                <div className="text-[rgb(97,67,38)] w-[fit-content] translate-y-[-2px] font-bold text-[16px]">
                  常规卡牌
                </div>
              }
            />
          )}
        </div>
        <div
          className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] w-full   px-[12px]"
          onClick={(e) => {
            const target = e.target;
            if (target && target instanceof HTMLElement && target.dataset.id) {
              const id = target.dataset.id;
              addCards(id);
            }
          }}>
          {regularCards.map((card) => (
            <div
              key={card.id}
              data-id={card.id}
              className="w-[240px]  cursor-pointer aspect-[202/279]"
              draggable>
              <img data-id={card.id} className="w-full " src={card.pic} alt={card.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[calc(100vh-100px)] mt-[100px] pr-[48px] my-auto shrink-0 flex items-center">
        <DeckContainer
          thumbnail={JobsData.find((a) => a.slug === params.slug)?.thumbnail ?? ''}
          defaultName=""
          mode="edit"
          selectedCards={selectedCards}
          onPublish={showModal}
        />
      </div>

      <EditCardGroupModal
        visible={activeModal}
        name={name}
        onClose={function (): void {
          setActiveModal(false);
        }}
        onSubmit={publishCards}
      />
    </div>
  );
};
export default Page;
