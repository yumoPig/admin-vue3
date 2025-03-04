<template>
  <div class="login">
    <div class="login_form">
      <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
        <h2>欢迎登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
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
import { getMenu } from "@api/api";
import { useAllDataStore } from "@/store/index.js";
import { useRouter } from "vue-router";

const form = reactive({
  username: "",
  password: "",
});
const formRef = ref(null);
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const store = useAllDataStore();
const router = useRouter();

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return ElMessage.error("请输入必填项！");

    let params = form;
    getMenu(params).then((res) => {
      if (res.code != 200) return ElMessage.error(res.data.message);

      let path = res.data.menuList[0];
      store.updateMenuList(res.data.menuList);
      store.token = res.data.token;
      store.addMenu(router);
      store.resetTags();
      router.push(path);
      formRef.value.resetFields();
    });
  });
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: cover;
}
.login_form {
  position: fixed;
  top: 30%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  box-shadow: 0 0 25px #cacaca;
  background-color: #fff;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
}
.el-button {
  width: 100%;
}
</style>
