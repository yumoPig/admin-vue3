<template>
  <el-table
    :data="dataSource"
    style="width: 100%"
    max-height="500"
    border
    :header-cell-class-name="'tableHeader'"
    v-loading="loading"
  >
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :fixed="item.fixed"
      :prop="item.prop"
      :label="item.label"
      :width="item.width || 200"
      :min-width="item.minWidth || 200"
      show-overflow-tooltip
      highlight-current-row
    >
      <!-- 表头 -->
      <template #header="{ column }">
        <div v-for="(word, index) in column.label.split(' ')" :key="index">
          {{ word }}
        </div>
      </template>

      <!-- 自定义具名插槽 -->
      <template #default="scope" v-if="item.slot">
        <slot :name="item.slot" :row="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <template v-if="pagination">
    <el-pagination
      v-model:current-page="config.page"
      v-model:page-size="config.pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      @change="onChange"
      size="small"
      :total="total"
    >
    </el-pagination>
  </template>
</template>

<script setup>
import { reactive, watch } from "vue";
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  total: {
    type: Number,
    default: 0,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  pageSizes: {
    type: Array,
    default: () => [20, 30, 40, 50],
  },
  pageCurrent: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20,
  },
});
const config = reactive({
  page: 1,
  pageSize: 20,
});
const emit = defineEmits(["onChange"]);

// 分页改变
const onChange = (currentPage, pageSize) => {
  emit("onChange", { currentPage, pageSize });
};
watch(
  () => [props.pageCurrent, props.pageSize],
  ([newCurrent, newPageSize]) => {
    config.page = newCurrent;
    config.pageSize = newPageSize;
  }
);
</script>

<style lang="less" scoped>
:deep(.tableHeader) {
  background-color: #f5f7fa !important;
}

.el-pagination {
  margin-top: 20px;
}
</style>
