/* eslint-disable @next/next/no-img-element */
'use client';
import { getCards, uploadCardGroup } from '@/app/api';
import { DeckContainer, ManaControl, Title } from '@/app/components';
import { Card, HsCard } from '@/type';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import EditCardGroupModal from './components/EditCardGroupModal';
import { JobsData } from '@/app/Const';
import Header from './components/Header';

type Filters = {
  cost: [number, number];
  searchText: string;
};

type SelectedCard = HsCard & { count: number };

const Page = ({ params }: { params: { slug: string } }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<HsCard[]>([]);
  const [activeModal, setActiveModal] = useState(false);
  const [name, setName] = useState('');
  const [selectedCards, setSelectedCards] = useState<Map<string, SelectedCard>>();
  const [filters, setFilters] = useState<Filters>({ cost: [-1, 100], searchText: '' });
  const changeFilters = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
  };
  const { professionalCards, regularCards } = useMemo(() => {
    const processCards = cards.filter((a) => a.name.includes(filters.searchText.trim()));

    return {
      professionalCards: processCards.filter((i) => {
        return i.faction.split(',').includes(params.slug);
      }),
      regularCards: processCards.filter((i) => i.faction === 'neutral'),
    };
  }, [cards, filters, params.slug]);

  const type = useMemo(() => {
    if (!params.slug) return null;
    return JobsData.find((i) => i.slug === params.slug);
  }, [params.slug]);

  const initCards = () => {
    const slug = params.slug;
    getCards(`${slug},neutral`)
      .then((data) => {
        setCards(data.cards);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const removeCard = (id: string) => {
    const card = selectedCards?.get(id);
    if (!card) return;
    const newCards = new Map(selectedCards);
    if (card.count > 1) {
      newCards.set(id, { ...card, count: card.count - 1 });
    } else {
      newCards.delete(id);
    }
    setSelectedCards(newCards);
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
          .sort((a1, a2) => a1.manna - a2.manna)
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
      <Header
        onSearch={(s) => {
          changeFilters('searchText', s);
        }}
      />
      <div className="flex flex-col mt-[100px] pt-[24px]  flex-1 items-center overflow-y-scroll  h-[calc(100vh-100px)] mainSection px-[32px] hideScrollbar">
        <div className="w-full">
          {!loading && professionalCards.length > 0 && (
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
              <img
                data-id={card.id}
                className="w-full "
                src={card.img}
                alt={card.name}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        <div className="w-full">
          {!loading && regularCards.length > 0 && (
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
              <img
                data-id={card.id}
                className="w-full "
                src={card.img}
                alt={card.name}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[calc(100vh-100px)] mt-[100px] pr-[48px] my-auto shrink-0 flex justify-center flex-col">
        <div className="flex-1 flex  flex-col justify-center">
          <DeckContainer
            thumbnail={JobsData.find((a) => a.slug === params.slug)?.thumbnail ?? ''}
            defaultName=""
            mode="edit"
            selectedCards={selectedCards}
            onPublish={showModal}
            onCardClick={removeCard}
          />
          <a
            href="/cards/post"
            className="cursor-pointer my-[20px] border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000]  relative z-[2] rounded-[8px]">
            <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[8px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
              <div className=" text-[#fff] mx-auto font-bold">卡牌上传</div>
            </div>
          </a>
        </div>
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
