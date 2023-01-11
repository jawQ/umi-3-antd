export const ORDER_HOLD_STATUS_ENUM = {
  0: { text: '正常', status: 'Success' },
  1: { text: '异常', status: 'Error' },
};
const ORDER_CANCEL_STATUS = {
  Normal: 0, // Normal
  Requested: 1, // Cancellation requesting
  Intercepted: 2, // Intercepted order
  Cancelled: 3,
};
const ORDER_STATUSES = {
  New: 1,
  Ready: 10,
  RequestCourierLabel: 30,
  WaitingCourierLabelGenerated: 31,
  WaitingForUnShelving: 32,
  UnShelving: 33,
  UnShelved: 34,
  Packaging: 35,
  Fulfilled: 38,
  Shipped: 50,
  Delivered: 80,
};

export const ORDER_STATUS_ENUM = {
  [ORDER_STATUSES.New]: { text: '新建', status: 'Success', color: 'green' },
  [ORDER_STATUSES.Ready]: {
    text: '准备发货',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.RequestCourierLabel]: {
    text: '请求渠道面单',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.WaitingCourierLabelGenerated]: {
    text: '等待生成面单',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.WaitingForUnShelving]: {
    text: '待下架',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.UnShelving]: {
    text: '下架中',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.UnShelved]: {
    text: '下架完成',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.Packaging]: {
    text: '配货中',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.Fulfilled]: {
    text: '待签出',
    status: 'Success',
    color: 'green',
  },
  [ORDER_STATUSES.Shipped]: {
    text: '已发货',
    status: 'Success',
    color: 'green',
  },
  // [ORDER_STATUSES.Delivered]: { text: '已收货', status: 'Success', color: 'green' },
};

export const ORDER_CANCEL_STATUS_ENUM = {
  [ORDER_CANCEL_STATUS.Normal]: {
    text: '正常',
    status: 'Success',
    color: 'green',
  },
  [ORDER_CANCEL_STATUS.Requested]: {
    text: '请求取消发货',
    status: 'Error',
    color: 'red',
  },
  [ORDER_CANCEL_STATUS.Intercepted]: {
    text: '已拦截订单',
    status: 'Error',
    color: 'red',
  },
  [ORDER_CANCEL_STATUS.Cancelled]: {
    text: '已取消',
    status: 'Error',
    color: 'red',
  },
};
