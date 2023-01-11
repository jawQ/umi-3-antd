import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Row from './components/Row';
import { useWindowResize } from './hook/useWindowResize';
import { VariableSizeList as List } from 'react-window';
import type { ColumnType } from 'antd/lib/table';
import { VariableSizeListType } from '@/types';
// import { VariableSizeList as List } from '/Users/wujiaqiang/Desktop/codes/study/front/源码学习/react/react-window';

type ListType = { key: number };
interface VariableSizeListPropsType {
  data: ListType[];
  columns: ColumnType<VariableSizeListType>[];
}

const VariableSizeList = (props: VariableSizeListPropsType) => {
  const { data, columns } = props;
  const [windowWidth] = useWindowResize();
  const listRef = useRef<{ resetAfterIndex?: (index: number) => void }>(null);
  const sizeMap = useRef({});
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    // listRef?.current?.resetAfterIndex?.(index);
  }, []);
  const getSize = (index: number) => (sizeMap.current as any)[index] || 50;

  return (
    <List<ListType[]>
      ref={listRef as any}
      height={300}
      width="100%"
      itemCount={data.length}
      itemSize={getSize}
      itemData={data}
    >
      {({ data, index, style }) => (
        <div style={style}>
          <Row
            data={data}
            columns={columns}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        </div>
      )}
    </List>
  );
};
export default VariableSizeList;
