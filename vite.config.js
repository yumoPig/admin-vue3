import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, // .vue
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // resolve添加路由别名
    resolve: {
      alias: [
        { find: "@", replacement: "/src" },
        { find: "@api", replacement: "/src/api" },
      ],
      // 支持vue后缀名
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    // 代理转发（只配置运行端口）
    server: {
      host: "0.0.0.0",
      port: "8080",
    },
    // 公共基础路径
    base: "./",

    // 打包配置
    build: {
      chunkSizeWarningLimit: 1000, //规定触发警告的 chunk 大小
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        input: "index.html",
        output: {
          // 静态文件打包
          entryFileNames: "static/js/[name]-[hash].js",
          chunkFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          // 创建公共chunks，列出的模块及其所有依赖
          manualChunks(id) {
            // 简化配置
            // if (id.includes("node_modules")) {
            //   return "vendor";
            // }

            // 优化配置
            if (id.includes("node_modules")) {
              const pkgName = id.split("node_modules/")[1].split("/")[0];
              if (["vue", "vue-router", "pinia"].includes(pkgName)) {
                return "vendor"; // 将核心库打包到一个 chunk
              } else {
                return pkgName; // 按照库名生成 chunk 名称
                // return `vendor-${pkgName}`; // 按照库名生成 chunk 名称
                // return "vendor-lib"; // 其他库分开打包
              }
            }
          },
        },
      },
      minify: "terser", //添加terser混淆
      // terset配置
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: mode === "production" ? true : false,
          drop_debugger: mode === "production" ? true : false,
        },
      },
    },
    // 屏蔽main.js中的scss警告
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  };
});
