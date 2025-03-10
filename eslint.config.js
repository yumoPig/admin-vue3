// eslint.config.js
import vue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";

export default [
  {
    // 适用于所有 .js 和 .vue 文件
    files: ["**/*.{js,vue}"],
    languageOptions: {
      // 使用 @babel/eslint-parser 解析器（也可根据项目需要选择其他解析器）
      parser: require.resolve("@babel/eslint-parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // 若无 Babel 配置文件，可设置为 false
        requireConfigFile: false,
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      // 启用 vue 插件推荐的规则
      ...vue.configs.recommended.rules,
      // 将 Prettier 格式化错误作为 ESLint 错误展示
      "prettier/prettier": "error",
      // 自定义其他规则，例如：
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
];
