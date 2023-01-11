/**
 * copy this file to your working directory.
 */
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { mockData, myajax } from '@/utils';
import { history } from 'umi';
import { VIRTUALIZED_TABLE_PATH } from '@/config/const';
import { ActionType, ProTable } from '@ant-design/pro-components';

const height = 800;
const rows = 15;
const now = Date.now();
export default function FixStuckTable() {
  const [data, setData] = useState<any[]>([]);
  const [rowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const tableRef = useRef<ActionType>();
  const idxRef = useRef(0);
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
  const handleLoadDataByAjax = () => {
    tableRef?.current?.reload?.();
  };
  const handleRequest = () => {
    setData([]);
    return myajax().then((d) => {
      console.log('start: ', now);
      setData(d);
      const result = {
        data: d,
        success: true,
      };
      console.log('check result: ', result);
      return result;
    });
  };
  // 监听虚拟滚轮变化，计算展示的数据
  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight } = e.target;
    let lenMax = data.length,
      nIdx;

    if (scrollTop === 0) {
      setData(data.slice(0, rows));
      idxRef.current = 0;
    } else if (scrollTop === scrollHeight - height) {
      nIdx = lenMax - rows;
      setData(data.slice(nIdx, nIdx + rows));
      idxRef.current = nIdx;
    } else {
      nIdx = Math.ceil((scrollTop * lenMax) / scrollHeight);
      if (nIdx !== idxRef.current && nIdx <= lenMax - rows) {
        setData(data.slice(nIdx, nIdx + rows));
        idxRef.current = nIdx;
      }
    }
  };
  useEffect(() => {
    document
      .querySelector('.ant-table-container .ant-table-tbody')
      ?.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Button
        type="primary"
        onClick={() => history.push(VIRTUALIZED_TABLE_PATH)}
      >
        {'跳转Table...'}
      </Button>
      <Button onClick={() => setData([])}>{'clear data'}</Button>
      <Button onClick={() => setData(mockData())}>{'load data'}</Button>
      <Button onClick={handleLoadDataByAjax}>{'load data(ajax)'}</Button>
      <br />
      <br />
      <ProTable
        manualRequest
        actionRef={tableRef}
        columns={columns}
        dataSource={data}
        search={false}
        request={handleRequest}
        pagination={{
          pageSizeOptions: ['10', '100', '500', '1000', '10000'],
          defaultPageSize: 1000,
        }}
        rowSelection={{
          selectedRowKeys: rowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
    </>
  );
}
