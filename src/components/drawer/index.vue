<template>
  <el-drawer
    :model-value="visible"
    :before-close="cancelClick"
    :size="size"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :with-header="false"
  >
    <h3>{{ title }}</h3>
    <slot></slot>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick" v-if="showCancel">
          {{ cancel }}
        </el-button>
        <el-button type="primary" @click="confirmClick" v-if="showConfirm">
          {{ confirm }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "50%",
  },
  cancelClick: {
    type: Function,
  },
  confirmClick: {
    type: Function,
  },
  cancel: {
    type: String,
    default: "取消",
  },
  confirm: {
    type: String,
    default: "确定",
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped></style>
