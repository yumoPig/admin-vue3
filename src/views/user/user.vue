<template>
  <div class="user_header">
    <el-button type="primary" @click="addUser">新增</el-button>
    <el-form label-width="80px" :inline="true" :model="formInfo">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <Table
      :dataSource="userData"
      :columns="columns"
      :loading="loading"
      :total="total"
      :pageCurrent="formInfo.page"
      :pageSize="formInfo.pageSize"
      @onChange="onChange"
    >
      <template #Sex="{ row: { row: row2 } }">
        <div>{{ row2.sex == 1 ? "男" : "女" }}</div>
      </template>
      <template #Operation="{ row: { row: row2 } }">
        <el-button size="small" @click="editBtn(row2)">编辑</el-button>
        <el-button type="danger" size="small" @click="delBtn(row2)"
          >删除</el-button
        >
      </template>
    </Table>
  </div>
  <UserEdit
    v-model:showUserEdit="showUserEdit"
    :title="title"
    :editData="editData"
    :search="search"
  />
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { getUserData, deleteUser } from "@api/api";
import Table from "@/components/table/index.vue";
import UserEdit from "./userEdit.vue";

const userData = ref([]);
const columns = ref([
  { label: "姓名", prop: "name", width: 150, fixed: "left" },
  { label: "年龄", prop: "age", width: 150 },
  { label: "性别", width: 150, slot: "Sex" },
  { label: "出生日期", prop: "birth", width: 250 },
  { label: "地址", prop: "addr", width: 350 },
  { label: "操作", width: 250, fixed: "right", slot: "Operation" },
]);
const loading = ref(false);
const total = ref(10);
const formInfo = reactive({ name: "", page: 1, pageSize: 20 });

const showUserEdit = ref(false);
const title = ref("");
const editData = ref({
  name: "",
  age: "",
  sex: "",
  birth: "",
  addr: "",
});

// 获取用户信息
const getUser = async (params) => {
  loading.value = true;
  const res = await getUserData(params);
  loading.value = false;
  userData.value = res.data.list;
  total.value = res.data.count;
};
// 搜索按钮
const search = (page) => {
  if (page) formInfo.page = page;
  getUser(formInfo);
};
// 新增用户
const addUser = () => {
  title.value = "新增用户";
  showUserEdit.value = true;
};
// 编辑按钮
const editBtn = (row) => {
  editData.value = { ...row };
  title.value = "编辑用户";
  showUserEdit.value = true;
};
// 删除用户
const delBtn = (row) => {
  ElMessageBox.confirm("确定要删除吗？", "删除操作", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      loading.value = true;
      deleteUser({ id: row.id }).then((res) => {
        loading.value = false;
        if (res.code != 200) return ElMessage.error(res.message);
        ElMessage.success(res.message);
        getUser();
      });
    })
    .catch(() => {});
};
// 页码修改
const onChange = ({ currentPage, pageSize }) => {
  formInfo.page = currentPage;
  formInfo.pageSize = pageSize;
  getUser(formInfo);
};

onMounted(() => {
  getUser();
});

watch(showUserEdit, (newVal) => {
  if (!newVal) {
    title.value = "";
    editData.value = {
      sex: 1,
    };
  }
});
</script>

<style lang="less" scoped>
.user_header {
  display: flex;
  justify-content: space-between;
}
</style>
