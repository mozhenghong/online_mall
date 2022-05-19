import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve,
} from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    createStyleImportPlugin({
      resolves: [
        AndDesignVueResolve(),
        VantResolve(),
        ElementPlusResolve(),
        NutuiResolve(),
        AntdResolve(),
      ],
    }),
  ],
  resolve: {
    // 路径别名
    alias: [
      { find: "src", replacement: path.resolve(__dirname, "src") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  // less 配置
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 更改主题
          "primary-color": "#52c41a",
          "link-color": "#1DA57A",
          "border-radius-base": "2px",
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets' //指定生成静态资源的存放路径
  },
  // 本地开发配置
  server: {
    port: 8088,
    proxy: {
      "/api": {
        target: "http://10.0.40.200:8979",
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
