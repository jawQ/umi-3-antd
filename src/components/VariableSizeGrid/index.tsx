import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table, TableProps } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const VariableSizeGrid = <RecordType extends object>(
  props: TableProps<RecordType>,
) => {
  const { columns, scroll } = props;

  const gridRef = useRef<any>();

  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };
  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (
    rawData: readonly RecordType[],
    { scrollbarSize, ref, onScroll }: any,
  ) => {
    ref.current = connectObject;
    const outerRef = useRef();
    const sizeMap = useRef({});
    const countRef = useRef(0);
    const getSize = (index: number) => {
      console.log(
        'by getSize: ',
        index,
        sizeMap.current,
        (sizeMap.current as any)[index],
      );
      return (sizeMap.current as any)[index] || 50;
    };
    const totalHeight = useMemo(() => {
      const _sizeMap: any = sizeMap.current;
      const defaultHeight = 54;
      const keys = Object.keys(_sizeMap);
      const hasData = keys?.length;
      console.log('get totalHeight: ', hasData);
      if (!hasData) return defaultHeight;
      // 当前最大值：
      let currentMaxHeight = defaultHeight;
      keys.map((_k) => {
        const el: HTMLDivElement = _sizeMap[_k]?.ref?.current;
        const elHeight = el?.getBoundingClientRect?.()?.height || defaultHeight;
        if (elHeight > currentMaxHeight) currentMaxHeight = elHeight;
      });
      return currentMaxHeight;
    }, [sizeMap]);
    console.log('get innerRef by reRender...: ', outerRef);

    return (
      <Grid
        ref={gridRef}
        innerRef={outerRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={getSize}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => {
          const rowRef = useRef<HTMLDivElement>(null);
          useEffect(() => {
            if (rowIndex !== countRef.current) countRef.current = rowIndex;
            const currentIndexHeight =
              rowRef.current?.getBoundingClientRect?.()?.height;
            if (rowIndex === countRef.current) {
              style = { ...style, height: currentIndexHeight };
            }
            console.log(
              'by inner child useEffect: ',
              columnIndex,
              rowIndex,
              currentIndexHeight + 'px',
            );
            sizeMap.current = {
              ...sizeMap.current,
              [rowIndex]: currentIndexHeight,
            };
            // tips: 暂不知具体定义位置
            // gridRef?.current?.forceUpdate();
            // gridRef?.current?.resetAfterIndices?.({
            //   columnIndex,
            //   rowIndex,
            // });
          }, [rowIndex]);
          const Child = useMemo(() => {
            const currentDataItem: any = rawData[rowIndex];
            const currentMergedColumn: any = (mergedColumns as any)[
              columnIndex
            ];
            const dataIndex = currentMergedColumn.dataIndex;
            const render = currentMergedColumn.render;
            return dataIndex && render
              ? render(dataIndex || currentDataItem, currentDataItem)
              : currentDataItem[dataIndex];
          }, [rowIndex]);
          return (
            <div
              ref={rowRef}
              className={`virtual-table-cell${
                columnIndex === mergedColumns?.length - 1
                  ? ' virtual-table-cell-last'
                  : ''
              }${rowIndex === countRef.current ? ' ' : ''}`}
              style={{ ...style, height: 'auto' }}
            >
              {Child}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={{
          defaultPageSize: 1000,
          pageSizeOptions: [10, 100, 1000],
        }}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};
export default VariableSizeGrid;
