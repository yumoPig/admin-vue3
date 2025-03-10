<template>
  <Drawer
    :visible="showUserEdit"
    :title="title"
    :cancelClick="cancelClick"
    :confirmClick="confirmClick"
  >
    <template #default>
      <el-form
        ref="formRef"
        :model="editForm"
        label-width="80px"
        style="margin-top: 20px"
        :rules="rules"
      >
        <el-form-item label="姓 名" prop="name">
          <el-input
            v-model="editForm.name"
            placeholder="请输入姓名"
            maxlength="5"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="年 龄" prop="age">
          <el-input
            v-model="editForm.age"
            placeholder="请输入年龄"
            clearable
            maxlength="3"
          ></el-input>
        </el-form-item>
        <el-form-item label="性 别" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="editForm.birth"
            type="date"
            placeholder="请选择出生日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="地 址" prop="addr">
          <el-input
            v-model="editForm.addr"
            placeholder="请输入地址"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
  </Drawer>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { addUser, editUser } from "@api/api.js";
import Drawer from "@/components/drawer/index.vue";
const props = defineProps({
  showUserEdit: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  editData: {
    type: Object,
    default: () => {},
  },
  search: {
    type: Function,
  },
});

const editForm = ref({});
const options = ref([
  { label: "男", value: 1 },
  { label: "女", value: 0 },
]);
const formRef = ref(null);
const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (!/^\d+$/.test(value)) {
          callback(new Error("只能输入数字"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  birth: [{ required: true, message: "请选择出生日期", trigger: "change" }],
  addr: [
    { required: true, message: "请输入地址", trigger: "blur" },
    { min: 3, message: "最少输入3个字", trigger: "blur" },
  ],
});
const emit = defineEmits(["update:showUserEdit"]);
// 取消按钮
const cancelClick = () => {
  formRef.value.resetFields();
  emit("update:showUserEdit", false);
};
// 确认按钮
const confirmClick = async () => {
  await formRef.value.validate((valid) => {
    if (!valid) return ElMessage.error("请输入必填项！");
    if (props.title === "新增用户") {
      addUserFun();
    } else {
      editUserFun();
    }
  });
};
// 新增用户
const addUserFun = () => {
  let params = editForm.value;
  addUser(params).then((res) => {
    if (res.code !== 200) return ElMessage.error(res.message);
    ElMessage.success(res.message);
    formRef.value.resetFields();
    emit("update:showUserEdit", false);
    props.search(1);
  });
};
// 编辑用户
const editUserFun = () => {
  let params = editForm.value;
  editUser(params).then((res) => {
    if (res.code != 200) return ElMessage.error(res.message);
    ElMessage.success(res.message);
    formRef.value.resetFields();
    emit("update:showUserEdit", false);
    props.search();
  });
};
watch(
  () => props.editData,
  (newEditData) => {
    editForm.value = newEditData;
  }
);
</script>

<style lang="scss" scoped></style>
