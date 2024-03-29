import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Modal',
  favicon: '/modal/images/logo.png',
  targets: { chrome: 20, firefox: 40, safari: 8, edge: 13, ios: 8 },
  logo: '/modal/images/logo.png',
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
    excludes: ['docs/HomePage'],
  },
  themeConfig: {
    carrier: '@lllhys/modal', // 设备状态栏左侧的文本内容
  },
  // more config: https://d.umijs.org/config
});
