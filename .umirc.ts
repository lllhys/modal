import {defineConfig} from 'dumi';

export default defineConfig({
  title: 'Modal',
  favicon:
    'http://qnimg.lllhy.com/popcorn-soda.png',
  logo: 'http://qnimg.lllhy.com/popcorn-soda%20%281%29.png',
  outputPath: 'docs-dist',
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  mode: 'site',
  base: '/modal',
  publicPath: '/modal/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/lllhys/modal',
    },
  ],
  resolve: {
    excludes: ['docs/HomePage']
  },
  themeConfig: {
    carrier: '@lllhys/modal', // 设备状态栏左侧的文本内容
  }
  // more config: https://d.umijs.org/config
});
