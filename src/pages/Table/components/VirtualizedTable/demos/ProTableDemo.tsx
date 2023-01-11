/**
 * copy this file to your working directory.
 */
import React, { useState, useRef } from 'react';
import { Button, Space, Tag, Typography } from 'antd';
import { mockData, myajax } from '@/utils';
import { history } from 'umi';
import { VIRTUALIZED_TABLE_PATH } from '@/config/const';
import NssProTable from '@/components/NssProTable';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Order } from 'typings';
import {
  ORDER_CANCEL_STATUS_ENUM,
  ORDER_HOLD_STATUS_ENUM,
  ORDER_STATUS_ENUM,
} from '@/config/enum';

const height = 800;
const { Text } = Typography;
export default function ProTableDemo() {
  const [data, setData] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const tableRef = useRef<ActionType>();
  const columns: ProColumns<Order>[] = [
    {
      title: 'Code Info',
      width: '125px',
      render: (_, record) => {
        return (
          <Space>
            <div>{record.basketNumber}</div>
          </Space>
        );
      },
    },
    {
      title: 'Type',
      width: '35px',
      render: (_: any, entity: any) => {
        return <Tag color="success">{entity.type}</Tag>;
      },
    },
    {
      title: 'tenant',
      width: '40px',
      render: (_, record: Order) => {
        if (record.tenant) {
          return (
            <a
              href={`/tenant?filterName=tenantCode&filterValue=${record.tenant.code}`}
              target="__blank"
            >
              {record.tenant.code}
            </a>
          );
        }
        return '';
      },
    },
    {
      title: 'recipientInfo',
      width: '100px',
      render: (_, record) => {
        return (
          <Space direction="vertical">
            <Text
              key="shippingName"
              ellipsis={{ tooltip: record.shippingName }}
            >
              联系人: {record.shippingName}
            </Text>
            <Text
              key="shippingAddress"
              ellipsis={{ tooltip: record.shippingAddress }}
            >
              收件地址: {record.shippingAddress}
            </Text>
            <Text
              key="shippingZipCode"
              ellipsis={{ tooltip: record.shippingZipCode }}
            >
              邮编: {record.shippingZipCode}
            </Text>
            <Text
              key="shippingCountryCode"
              ellipsis={{ tooltip: record.shippingCountryCode }}
            >
              国家编码: {record.shippingCountryCode}
            </Text>
          </Space>
        );
      },
    },
    {
      title: 'deliveryInfo',
      width: '100px',
      dataIndex: 'channelIds',
      render: (_, record) => {
        return (
          <Space direction="vertical" size="small">
            {!!record.warehouse && (
              <Text key="name" ellipsis={{ tooltip: record?.warehouse?.name }}>
                仓库: {record?.warehouse?.name}
              </Text>
            )}
            {record.sortingWeight ? (
              <Text
                key="sortingWeight"
                ellipsis={{ tooltip: record.sortingWeight }}
              >
                签出重量: {record.sortingWeight}g
              </Text>
            ) : (
              <Text>预估重量: {record.estimatedWeight}g</Text>
            )}
            {!!record.channel && (
              <Space key="small" direction="vertical" size="small">
                {record?.channel?.name && (
                  <Text
                    key="name"
                    ellipsis={{ tooltip: record?.channel?.name }}
                  >
                    渠道: {record?.channel?.name}
                  </Text>
                )}
                {record.nssTrackingNumber && (
                  <Text
                    key="nssTrackingNumber"
                    ellipsis={{ tooltip: record.nssTrackingNumber }}
                  >
                    NSS跟踪单号{': '}
                    <a
                      rel="noreferrer"
                      href={record.nssTrackingUrl}
                      target="_blank"
                    >
                      {record.nssTrackingNumber}
                    </a>
                    {!record.nssTrackingNumber && '-'}
                  </Text>
                )}
                {record.nssCourierOrderNumber && (
                  <Text
                    key="nssCourierOrderNumber"
                    ellipsis={{ tooltip: record.nssCourierOrderNumber }}
                  >
                    渠道单号: {record.nssCourierOrderNumber}
                  </Text>
                )}
                {record.trackingNumber && (
                  <Text
                    key="trackingNumber"
                    ellipsis={{ tooltip: record.trackingNumber }}
                  >
                    渠道物流单号: {record.trackingNumber}
                  </Text>
                )}
              </Space>
            )}
          </Space>
        );
      },
    },
    {
      title: 'status',
      width: '40px',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: ORDER_STATUS_ENUM,
      fieldProps: {
        mode: 'multiple',
      },
      render: (_, record) => {
        return (
          <Space direction="vertical">
            {record.status && (
              <Tag key="status" color={ORDER_STATUS_ENUM[record.status].color}>
                {ORDER_STATUS_ENUM[record.status].text}
              </Tag>
            )}
            {record.cancelRequest > 0 && (
              <Tag
                key="cancelRequest"
                color={ORDER_CANCEL_STATUS_ENUM[record.cancelRequest].color}
              >
                {ORDER_CANCEL_STATUS_ENUM[record.cancelRequest].text}
              </Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: 'holdStatus',
      width: '40px',
      dataIndex: 'holdStatus',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      valueEnum: ORDER_HOLD_STATUS_ENUM,
    },
    {
      title: 'Unshelve Code',
      width: '50px',
      ellipsis: true,
      copyable: true,
      dataIndex: 'containerCode',
    },
    {
      title: 'Time',
      width: '80px',
      render: (_, record) => <div>{record.printTimes}</div>,
    },
    {
      title: 'action',
      width: '25px',
      render: (_, record) => {
        return (
          <Space direction="vertical" align="center">
            <a>{record.trackingUrl}</a>
          </Space>
        );
      },
    },
  ];
  const handleLoadDataByAjax = () => {
    tableRef?.current?.reload?.();
  };
  const handleRequest = () => {
    setData([]);
    return myajax().then((d) => {
      setData(d);
      const result = {
        data: d,
        success: true,
      };
      console.log('check result: ', result);
      return result;
    });
  };
  return (
    <>
      <Button onClick={() => setData([])}>{'clear data'}</Button>
      <Button onClick={() => setData(mockData())}>{'load data'}</Button>
      <Button onClick={handleLoadDataByAjax}>{'load data(ajax)'}</Button>
      <br />
      <br />
      <NssProTable
        virtual
        rowKey={(record) => record.id}
        scroll={{ y: height, x: 1600 }}
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
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
    </>
  );
}
