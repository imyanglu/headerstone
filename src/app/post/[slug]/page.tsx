/* eslint-disable @next/next/no-img-element */
'use client';
import { uploadCardGroup } from '@/app/api';
import { DeckContainer, Title } from '@/app/components';
import { HsCard } from '@/type';
import { useMemo, useRef, useState } from 'react';
import EditCardGroupModal from './components/EditCardGroupModal';
import { JobsData } from '@/app/Const';
import Header from './components/Header';
import useToast from '@/app/lib/hooks';
import { StandardCards } from '@/app/lib/data';
import { createCode } from '@/app/lib/help';

export const runtime = 'edge';
type Filters = {
  cost: [number, number];
  searchText: string;
  mana: number[];
};

type SelectedCard = HsCard & { count: number };

const ISLAND_VACATION: {
  [key in (typeof JobsData)[number]['slug']]: (typeof JobsData)[number]['slug'];
} = {
  paladin: 'rogue',
  rogue: 'warlock',
  warlock: 'deathknight',
  deathknight: 'shaman',
  shaman: 'demonhunter',
  demonhunter: 'priest',
  priest: 'hunter',
  hunter: 'warrior',
  warrior: 'druid',
  druid: 'mage',
  mage: 'paladin',
} as const;

const getCards = (slug: string) => {
  const Vacation =
    ISLAND_VACATION[slug.toLowerCase() as keyof typeof ISLAND_VACATION].toUpperCase();
  return StandardCards.filter((a) => {
    const isVacation = a.set === 'ISLAND_VACATION' && a.cardClass === Vacation;
    const isInClasses = ['NEUTRAL', slug].includes(a.cardClass) || a.classes?.includes(slug);
    return isVacation || isInClasses;
  });
};
const Page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug.toLocaleUpperCase();
  const { addToast } = useToast();
  const cardsRef = useRef(getCards(slug as any));

  const [activeModal, setActiveModal] = useState(false);
  const [name, setName] = useState('');
  const [selectedCards, setSelectedCards] = useState<Map<string, SelectedCard>>();
  const [filters, setFilters] = useState<Filters>({ cost: [-1, 100], searchText: '', mana: [] });
  const changeFilters = <K extends keyof Filters>(k: K, v: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [k]: v }));
  };
  const getSrc = (id: string) => {
    return `https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/${id}.png`;
  };

  const { professionalCards, regularCards } = useMemo(() => {
    const processCards = cardsRef.current.filter((a) => {
      const isMana = filters.mana.length === 0 || filters.mana.includes(a.cost);
      return isMana && a.name.includes(filters.searchText.trim());
    });

    return {
      professionalCards: processCards
        .filter((i) => {
          return i.cardClass !== 'NEUTRAL';
        })
        .sort((a, b) => a.cost - b.cost),
      regularCards: processCards
        .filter((i) => i.cardClass === 'NEUTRAL')
        .sort((a, b) => a.cost - b.cost),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, params.slug]);

  const type = useMemo(() => {
    if (!params.slug) return null;
    return JobsData.find((i) => i.slug === params.slug);
  }, [params.slug]);

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
    const sCard = cardsRef.current.find((i) => i.id === id);
    if (!sCard) return;
    const count = selectedCards?.has(id) ? (selectedCards?.get(id) as SelectedCard).count + 1 : 1;
    const newCard = { ...sCard, count };
    newCards.set(id, newCard);
    if (checkVerify(newCard)) setSelectedCards(newCards);
  };

  const publishCards = (info: Record<'code' | 'author' | 'rate' | 'forge', string>) => {
    const { code, author, rate, forge } = info;
    const dbfIdMap = new Map<number, number>();
    const cardsArr = selectedCards ? Array.from(selectedCards.values()) : [];
    selectedCards?.forEach((i) => dbfIdMap.set(i.dbfId, i.count));
    const newCode = createCode([...dbfIdMap], slug.toLowerCase() as keyof typeof ISLAND_VACATION);

    const cardIds = cardsArr
      .sort((a1, a2) => a1.cost - a2.cost)
      .map((i) => {
        return Array.from({ length: i.count }, () => i.id);
      })
      .flat(Infinity) as string[];

    const mana = cardIds.map((a) => cardsRef.current.find((i) => i.id === a)?.cost);
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
      preview: true,
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

  return (
    <div className="w-[100vw] bg-[#E8D5AA]  h-[100vh] flex flex-col">
      <Header
        mana={filters.mana}
        onSearch={(s) => {
          changeFilters('searchText', s);
        }}
        onManaClick={onToggleManaClick}
      />
      <div className="flex mt-[100px]">
        <div className="flex flex-col pt-[24px]   h-[calc(100vh-100px)] bg-[#E9D6AB] flex-1 items-center overflow-y-scroll   mainSection px-[32px] hideScrollbar">
          <div className="w-full">
            {professionalCards.length > 0 && (
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
            className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] w-full justify-center"
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
                  src={getSrc(card.id)}
                  alt={card.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <div className="w-full">
            {regularCards.length > 0 && (
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
                  src={getSrc(card.id)}
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
