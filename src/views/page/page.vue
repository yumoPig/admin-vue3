<template>
  <div class="formClass">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      status-icon
      :label-position="labelPosition"
    >
      <el-row :gutter="24">
        <!-- xs	<768px 响应式栅格数或者栅格属性对象 -->
        <!-- sm	≥768px 响应式栅格数或者栅格属性对象 -->
        <!-- md	≥992px 响应式栅格数或者栅格属性对象 -->
        <!-- lg	≥1200px 响应式栅格数或者栅格属性对象 -->
        <!-- xl	≥1920px 响应式栅格数或者栅格属性对象 -->
        <el-col
          class="mb20"
          v-for="item in arr"
          :key="item.value"
          :xs="item.xs ? item.xs : 24"
          :sm="item.sm ? item.sm : 12"
          :md="item.md ? item.md : 8"
          :lg="item.lg ? item.lg : 6"
          :xl="item.xl ? item.xl : 4"
        >
          <el-form-item :label="item.label" :prop="item.value">
            <el-input
              v-model="ruleForm[item.value]"
              :placeholder="`请输入${item.label}`"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button type="primary" @click="btn">Primary</el-button>
    </div>
  </div>
</template>

<script setup name="formComponent">
const ruleFormRef = ref(null);
const ruleForm = ref({});
const rules = ref([]);
const labelPosition = ref("top"); //对齐方式
const arr = ref([
  {
    label: "渠道商",
    value: "id",
    xs: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
    form_item: {
      type: "select",
      multiple: false,
      arr: [],
    },
  },
  {
    label: "订单号",
    value: "order",
    xs: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
  },
  { label: "ecop编码", value: "ecop", xs: "", sm: "", md: "", lg: "", xl: "" },
  { label: "创建时间", value: "ecop" },
  { label: "创建时间", value: "ecop" },
  { label: "创建时间", value: "ecop" },
  { label: "创建时间", value: "ecop" },
  { label: "创建时间", value: "ecop" },
]);
const btn = () => {
  console.log("1  ----->  ", 1);
  console.log("ruleForm.value  ----->  ", ruleForm.value);
};
</script>

<style lang="scss" scoped>
.formClass {
  padding: 25px;
  background-color: #fff;
  border-radius: 10px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>
