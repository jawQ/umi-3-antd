/**
 * copy this file to your working directory.
 */
import React, { useState, useMemo } from 'react';
import { Table, Button } from 'antd';
import { useVT } from 'virtualizedtableforantd4';
import { mockData, myajax } from './utils';
import { history } from 'umi';
import { VIRTUALIZED_PROTABLE_PATH } from '@/config/const';

export default function NssVtTable() {
  const [data, setData] = useState<any[]>([]);
  const [rowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1000);
  const height = useMemo(() => 800, []);
  const columns = [
    {
      title: 'Full Name',
      width: 150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 200,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 200,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 200,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 200,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 200,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 200,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 200,
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8',
      width: 200,
    },
  ];
  // VTComponents
  const [Vt] = useVT(
    () =>
      Object.assign(
        {
          scroll: { y: height },
          // debug: true /* onScroll: ({ left, top }) => console.log(top, left) */,
        },
        // {
        //   onScroll: ({ top, left, isEnd }) => {
        //     if (isEnd) {
        //       console.log('reach End...', isEnd);
        //       // window.alert('isEnd');
        //     }
        //   },
        // },
        // overscanRowCount ? { overscanRowCount } : null,
      ) as any,
    [],
  );
  const handleLoadDataByAjax = () => {
    setData([]);
    setLoading(true);
    myajax()
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Button onClick={() => history.push(VIRTUALIZED_PROTABLE_PATH)}>
        {'跳转ProTable...'}
      </Button>
      <Button onClick={() => setData([])}>{'clear data'}</Button>
      <Button onClick={() => setData(mockData())}>{'load data'}</Button>
      <Button onClick={handleLoadDataByAjax}>{'load data(ajax)'}</Button>
      <br />
      <br />
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ y: height, x: 1600 }}
        pagination={{
          total: data.length,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize,
          pageSizeOptions: ['10', '100', '500', '1000', '10000'],
          onChange: (_page, pageSize) => {
            setPageSize(pageSize);
          },
          onShowSizeChange(current, size) {
            setPageSize(size);
          },
        }}
        rowSelection={{
          selectedRowKeys: rowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        components={Vt}
      />
    </>
  );
}
