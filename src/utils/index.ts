import data from '@/config/data/data.json';
/**
 * @description 模拟等待时间
 * @param time 等待时间
 * @returns void
 */
export const stop = (time: number) => {
  return new Promise<void>((res) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      res();
    }, time);
  });
};
export const isEmptyObj = (obj?: Record<string, any>) =>
  !obj || !Object.keys(obj)?.length;
// 清除对象中的空值
export const clearEmptyValue = (params: Record<string, any>) => {
  const newParams: Record<string, any> = {};
  Object.keys(params).forEach((key: string) => {
    const _v = params[key];
    if (Array.isArray(_v)) {
      if (!!_v?.length) newParams[key] = params[key];
    } else if (
      _v ||
      _v === 0 ||
      _v === false ||
      !!_v?.length ||
      !isEmptyObj(_v)
    ) {
      newParams[key] = _v;
    }
  });

  return newParams;
};
export function rndstr(str: string) {
  const n = 0 | (Math.random() * 10 + 1);
  let s = '';
  for (let i = 0; i < n; ++i) {
    s += str;
  }
  return s;
}

export const myajax = () => {
  const d = Array.from({ length: 1000 }, (v, i) => ({
    ...data,
    id: i + '' + data.id,
  }));
  return new Promise<any[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(d);
    }, Math.random() * 200 + 100);
  });
};

export const mockData = () => {
  const d = Array.from({ length: 1000 }, (v, i) => ({
    ...data,
    id: i + '' + data.id,
  }));
  return d;
};
