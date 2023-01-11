import VariableSizeGrid from '@/components/VariableSizeGrid';
import { stop } from '@/utils';
import { Space, Tag } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

interface VariableSizeGridType {}
// let now = Date.now();

const VirtualTable = () => {
  const [data, setData] = useState<any[]>([]);
  const columns: ColumnType<VariableSizeGridType>[] = [
    { title: 'A', dataIndex: 'key', width: 150 },
    {
      title: 'B',
      dataIndex: 'key',
      render(_, row) {
        // console.log('get item by columns.render...: ', _, row);
        return (
          <Space direction="vertical">
            <Tag>{_}</Tag>
            <Tag>{_}</Tag>
            <Tag>{_}</Tag>
          </Space>
        );
      },
    },
    { title: 'C', dataIndex: 'key' },
    { title: 'D', dataIndex: 'key' },
    { title: 'E', dataIndex: 'key', width: 200 },
    { title: 'F', dataIndex: 'key', width: 100 },
  ];

  const handleChange = (...rest) => {
    console.log('by handleChange: ', rest);
  };

  const initData = async () => {
    await stop(3000);
    setData(() => Array.from({ length: 100000 }, (_, key) => ({ key })));
    // console.log('赋值结束...: ', data, Date.now() - now);
  };
  useEffect(() => {
    initData();
  }, []);

  console.log('get data: ', data);
  return (
    <VariableSizeGrid<VariableSizeGridType>
      loading={!data?.length}
      columns={columns}
      dataSource={data}
      scroll={{ y: 500, x: '100vw' }}
      onChange={handleChange}
    />
  );
};

export default VirtualTable;
