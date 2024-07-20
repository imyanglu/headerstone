/* eslint-disable @next/next/no-img-element */
'use client';
import { getCards, uploadCardGroup } from '@/app/api';
import { DeckContainer, ManaControl, Title } from '@/app/components';
import { Card, HsCard } from '@/type';
import { useEffect, useMemo, useState } from 'react';
import EditCardGroupModal from './components/EditCardGroupModal';
import { JobsData } from '@/app/Const';
import Header from './components/Header';
import useToast from '@/app/lib/hooks';

type Filters = {
  cost: [number, number];
  searchText: string;
  mana: number[];
};

type SelectedCard = HsCard & { count: number };

const Page = ({ params }: { params: { slug: string } }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<HsCard[]>([]);
  const [activeModal, setActiveModal] = useState(false);
  const [name, setName] = useState('');
  const [selectedCards, setSelectedCards] = useState<Map<string, SelectedCard>>();
  const [filters, setFilters] = useState<Filters>({ cost: [-1, 100], searchText: '', mana: [] });
  const changeFilters = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
  };
  const { professionalCards, regularCards } = useMemo(() => {
    const processCards = cards.filter((a) => a.name.includes(filters.searchText.trim()));

    return {
      professionalCards: processCards
        .filter((i) => {
          return i.faction.split(',').includes(params.slug);
        })
        .sort((a, b) => a.manna - b.manna),
      regularCards: processCards
        .filter((i) => i.faction === 'neutral')
        .sort((a, b) => a.manna - b.manna),
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

  const publishCards = (info: Record<'code' | 'author' | 'rate' | 'forge', string>) => {
    const { code, author, rate, forge } = info;
    const cardsArr = selectedCards ? Array.from(selectedCards.values()) : [];
    const cardIds = cardsArr
      .sort((a1, a2) => a1.manna - a2.manna)
      .map((i) => {
        return Array.from({ length: i.count }, () => i.id);
      })
      .flat(Infinity) as string[];

    const mana = cardIds.map((a) => cards.find((i) => i.id === a)?.manna);
    const req = {
      code,
      name,
      winningRate: rate,
      owner: author,
      cards: cardIds,
      type: params.slug,
      mana,
      forge,
      label: '',
      desc: '',
    };

    if (!req.name || !req.code || !forge) {
      return addToast({ type: 'error', message: '缺少必要信息', title: '' });
    }

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
  const onToggleManaClick = (m: number) => {
    if (filters.mana.includes(m)) {
      changeFilters(
        'mana',
        filters.mana.filter((i) => i !== m)
      );
      return;
    }
    changeFilters('mana', [...filters.mana, m]);
  };

  useEffect(() => {
    initCards();
  }, []);

  return (
    <div className="w-[100vw] bg-[#E8D5AA]  h-[100vh] flex flex-col">
      <Header
        mana={filters.mana}
        onSearch={(s) => {
          console.log('xxx');
          changeFilters('searchText', s);
        }}
        onManaClick={onToggleManaClick}
      />
      <div className="flex mt-[100px]">
        <div className="flex flex-col    h-[calc(100vh-100px)] flex-1 items-center overflow-y-scroll   mainSection px-[32px] hideScrollbar">
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
            className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] w-full justify-center "
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
            className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] w-full "
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
        <div className="h-[calc(100vh-100px)] py-[20px] pr-[48px] my-auto  justify-center">
          <DeckContainer
            thumbnail={JobsData.find((a) => a.slug === params.slug)?.thumbnail ?? ''}
            defaultName=""
            mode="edit"
            selectedCards={selectedCards}
            onPublish={showModal}
            onCardClick={removeCard}
          />
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
