import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  hash: true,
  devtool: 'source-map',
  antd: {},
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title: '测试layout.title',
    // pure: true, // 全局禁用antd-layout样式
  },
  routes,
  fastRefresh: {},
});
