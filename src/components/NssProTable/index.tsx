import { clearEmptyValue } from '@/utils';
import type { ParamsType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-table';
import type { TablePaginationConfig } from 'antd';
import { Form } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import { useMemo, useRef, useState } from 'react';
import { useVT } from 'virtualizedtableforantd4';
import { NssProTablePropsType, RequestParamsType } from './type';

const NssProTable = <T extends Record<string, any>, U extends ParamsType>(
  _props: NssProTablePropsType<T, U>,
) => {
  const { virtual, ...ProTableProps } = _props;
  const {
    defaultSize = 'large',
    options = { fullScreen: false, reload: false, density: false },
    columns = [],
    form = {},
    formRef: propRef,
    pagination,
    search,
    request,
  } = ProTableProps;
  const [emitReRender, setEmitReRender] = useState(false);
  const [formInstance] = Form.useForm();
  const defaultFormRef = useRef();
  const formRef = propRef || defaultFormRef;
  if (!propRef) formRef.current = formInstance;
  const needSyncToUrl = search !== false && form?.syncToUrl;

  // 虚拟table hook：
  const [Vt] = useVT(
    () => ({
      scroll: { y: ProTableProps.scroll?.y || 500 },
      // debug: true /* onScroll: ({ left, top }) => console.log(top, left) */,
      // onScroll: ({ top, left, isEnd }) => {
      //   if (isEnd) {
      //     console.log('reach End...', isEnd);
      //   }
    }),
    [],
  );
  // 如果columns字段使用了render，只要返回空时，则替换成‘-’
  const memoColumns = useMemo(() => {
    return columns.map((item) => {
      const { render } = item;
      if (typeof render === 'function') {
        item.render = (...args) => {
          const result = render(...args);
          if (!result && result !== 0) return '-';
          return result;
        };
      }
      return {
        ...item,
      };
    });
  }, [columns]);

  // 分页
  const memoPagination = useMemo(() => {
    // boolean:
    if (typeof pagination === 'boolean') {
      return pagination === false
        ? false
        : {
            showSizeChanger: true,
          };
    }
    const showSizeChanger =
      (pagination as TablePaginationConfig)?.showSizeChanger === false
        ? false
        : true;
    return { ...pagination, showSizeChanger };
  }, [pagination]);

  // custom request
  const customRequest = (
    params: RequestParamsType<U>,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[] | null>,
  ) => {
    if (!request) return undefined;
    if (!needSyncToUrl && request) return request(params, sort, filter);
    const _form = formRef?.current;
    const formParms = _form?.getFieldsValue?.(true);
    const baseFilterParams = clearEmptyValue({
      pageSize: params.pageSize,
      current: params.current,
    });
    const internalParams = {
      ...formParms,
      ...baseFilterParams,
    };
    setEmitReRender(!emitReRender);
    return request(internalParams as RequestParamsType<U>, sort, filter);
  };

  const newProps = {
    ...ProTableProps,
    columnEmptyText: '-',
    defaultSize,
    options,
    columns: memoColumns,
    pagination: memoPagination as any,
  };
  if (request && customRequest) {
    newProps.request = customRequest as any;
  }
  if (virtual) {
    if (process.env.NODE_ENV !== 'production') {
      if (!ProTableProps.scroll?.y)
        throw Error(
          'generate a virtual list must provide the effective value of scroll.y',
        );
    }
    newProps.components = Vt;
  }
  return <ProTable<T, U> {...newProps} />;
};
export default NssProTable;
