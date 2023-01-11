import { ProTableProps } from '@ant-design/pro-components';

interface NssProTablePropsType<T, U> extends ProTableProps<T, U> {
  virtual?: boolean;
}

type RequestParamsType<U> = U &
  Record<string, any> & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  };
