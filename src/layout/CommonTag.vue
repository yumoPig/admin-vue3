<template>
  <div class="tabs">
    <el-scrollbar>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        @tab-remove="closeTag"
        @tab-change="handleTag"
      >
        <el-tab-pane
          v-for="item in tags"
          :label="item.name"
          :name="item.path"
          :key="item.path"
          :closable="item.path != '/firstPage'"
        >
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
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
const editableTabsValue = computed(() => {
  return store.tags.find((item) => item.path === route.path)?.path;
});

// 点击tag跳转
const handleTag = (path) => {
  let obj = store.tags.find((item) => item.path === path);
  if (obj) {
    store.selectMenu(obj);
    router.push(obj?.path);
  }
};

const closeTag = (path) => {
  let obj = store.tags.find((item) => item.path === path);
  if (obj) {
    store.removeTags(obj);
    if (obj.path === route.path && tags.value.length) {
      router.push(tags.value[tags.value.length - 1]?.path);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  // padding: 0 20px 10px;
  background-color: #fff;
  margin-bottom: 10px;
  display: flex;
  .tab {
    display: flex;
  }
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
  padding: 0 10px;
}
</style>
