import { VariableSizeListType } from '@/types';
import { ColumnType } from 'antd/lib/table';
import { useEffect, useRef } from 'react';

const styles = {
  row: {
    fontFamily: 'system-ui',
    padding: '1em',
    borderBottom: '1px solid #222',
    'box-sizing': 'border-box',
  },
};

interface RowType {
  data: { key: any }[];
  columns: ColumnType<VariableSizeListType>[];
  index: number;
  setSize: (index: number, size: number | undefined) => void;
  windowWidth: number;
}

const Row = ({ data, columns, index, setSize, windowWidth }: RowType) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    console.log('...by row', index);

    setSize(index, rowRef.current?.getBoundingClientRect?.()?.height);
  }, [setSize, index, windowWidth]);

  return (
    <div
      ref={rowRef}
      style={{
        ...styles.row,
        backgroundColor: isEven ? 'rgba(0, 0, 255, .1)' : 'transparent',
      }}
    >
      {data[index].key}
    </div>
  );
};
export default Row;
