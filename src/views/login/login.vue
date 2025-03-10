<template>
  <div class="login">
    <div class="login_form">
      <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="account">
          <el-input
            v-model="form.account"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { login, getAllMenu, getAdminUserData } from "@api/login";
import { useAllDataStore } from "@/store/index.js";
import { useRouter } from "vue-router";

const form = reactive({
  account: "",
  password: "",
});
const formRef = ref(null);
const rules = reactive({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const store = useAllDataStore();
const router = useRouter();

const onSubmit = async () => {
  formRef.value.validate((valid) => {
    if (!valid) return ElMessage.error("请输入必填项！");
    let params = form;
    login(params)
      .then((res) => {
        if (res.code != 0) return ElMessage.error(res.message);
        store.token = res.data.access_token;
        store.userName = res.data.name;
        getUserData();
        getMenu();
      })
      .catch((err) => {
        console.log("err  ----->  ", err);
        ElMessage.error(err.message);
      });
  });
};
// 获取菜单栏
const getMenu = async () => {
  let res = await getAllMenu();
  if (res.code != 0) return ElMessage.error(res.message);
  let menuList = res.data,
    path;
  menuList.forEach((item) => {
    item.path = item.front_url;
    if (item.children) {
      item.children.forEach((child) => {
        child.path = child.front_url;
      });
    }
  });
  // 确保path是一个有效的路由路径
  path = menuList[0];
  store.updateMenuList(menuList);
  store.addMenu(router);
  store.resetTags(path);
  // 使用path.path确保使用正确的路径进行导航
  router.push(path.path || path.front_url);
  // 重置表单
  formRef.value.resetFields();
};

// 获取用户信息
const getUserData = () => {
  getAdminUserData().then((res) => {
    if (res.code != 0) return ElMessage.error(res.message);
    store.photo = res.data.photo;
  });
};
</script>

<style lang="scss" scoped>
@use "./login.scss";
</style>
