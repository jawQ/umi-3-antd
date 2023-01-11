const routes = [
  {
    path: '/',
    redirect: '/table/demos/virtualizedtableforantd4/pro-table',
  },
  {
    path: '/table',
    layout: false,
    component: '@/layouts/BaseLayout/index',
    routes: [
      {
        path: './demos/virtualizedtableforantd4/pro-table',
        component: './Table/components/VirtualizedTable/demos/ProTableDemo',
      },
    ],
  },
];
export default routes;
