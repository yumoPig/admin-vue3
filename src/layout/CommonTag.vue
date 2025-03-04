<template>
  <div class="tabs">
    <el-tag
      v-for="item in tags"
      :closable="item.name != 'home'"
      :key="item.path"
      :effect="route.name === item.name ? 'dark' : 'plain'"
      @click="handleTag(item)"
      @close="closeTag(item)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllDataStore } from "@/store";
const store = useAllDataStore();
const route = useRoute();
const router = useRouter();
const tags = computed(() => store.tags);

// 点击tag跳转
const handleTag = (item) => {
  store.selectMenu(item);
  router.push(item.path);
};
// 删除tag
const closeTag = (item) => {
  store.removeTags(item);
  if (item.path === route.path) {
    router.push(tags.value[tags.value.length - 1].path);
  }
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 10px 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>
