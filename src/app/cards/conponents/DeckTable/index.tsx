'use client';
import { Table } from '@/app/components';
import { CardGroupOverview } from '@/type';
import { useMemo } from 'react';
import { CodeColumn, NameColumn, WeaponColumn, WinRateColumn } from './columns';

type DeckTable = {
  data: CardGroupOverview[];
};
const DeckTable = ({ data }: DeckTable) => {
  const columns = useMemo(() => {
    return [WeaponColumn, NameColumn, WinRateColumn, CodeColumn];
  }, []);
  return <Table data={data} columns={columns} />;
};
export default DeckTable;
