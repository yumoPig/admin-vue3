# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

B 站学习视频：https://www.bilibili.com/video/BV1LS421d7cY?p=1&vd_source=3cd47910aedf6da6a25cbec13f65db65

# 一、创建项目（my-vue-app 项目名称）

npm create vite@latest my-vue-app -- --template vue

# 二、清理默认代码

# 三、安装依赖、添加路由别名

npm i less vue-router element-plus -s
npm i @element-plus/icons-vue -s

// vite.config.js resolve 添加路由别名
resolve: {
alias: [{ find: "@", replacement: "/src" }],
},

# 四、添加路由、使用路由

# 五、element-plus 自动按需引入

npm install -D unplugin-vue-components unplugin-auto-import

# 六、element-plus icon 使用 iconify 按需引入

npm i -D unplugin-icons

# 七、完善侧边菜单栏和头部栏

CommonAside.vue\CommonHeader.vue

# 八、pinia 的使用

npm i pinia -D

# 九、首页左侧卡片展示

# 十、mockjs 的使用和 axios 的封装

npm i mockjs axios -D
使用环境变量 .env.development 和 .env.production

# 十一、首页右侧上方卡片展示

# 十二、首页右侧下方图表展示

安装 echarts npm i echarts -S

# 十三、封装 table + 分页组件

调整项目结构/element plus 所有组件默认都是英文，需要引入中文语言包，并且配置国际化

# 十四、用户列表渲染 + 获取用户列表 + 删除用户列表

调整组件结构、优化 teble 表格封装，使用具名插槽

# 十五、用户页面完成 + 封装 drawer 抽屉组件

在 main.vue 使用 ConfigProvider，设置 element plus 全局语言为中文
新增用户 + 编辑用户

# 十六、tags 标签的封装

修改了布局文件，统一放置在 layout 文件夹下

# 十七、登录布局完成，登录后获取菜单信息

左侧动态菜单栏只完成显示

# 十八、动态菜单栏、动态路由完成

# 十九、解决动态路由刷新 bug

使用 pinia-plugin-persistedstate 插件，将 pinia 持久化到本地存储中
npm i pinia-plugin-persistedstate
添加 404 页面

# 二十、退出登录

# 二十一、路由守卫完成

# 二十二、处理面包屑

# 二十三、优化 vite 打包

npm i terser
安装 terser 混淆

核心库打包到一个 chunk 中，其他依赖库打包到其他 chunk 中
