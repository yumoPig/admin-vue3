<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8" class="left">
      <!-- 首页用户信息 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="getInmageUrl('user')" class="user_img" />
          <div class="user_info">
            <p class="user_info_admin">Admin</p>
            <p class="user_info_p">超级管理员</p>
          </div>
        </div>
        <div class="login_info">
          <p>上次登录时间:<span>2024--09-23</span></p>
          <p>上次登录地点:<span>xxx</span></p>
        </div>
      </el-card>
      <!-- 首页表格卡片 -->
      <el-card shadow="hover" class="user_table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            :prop="key"
            :label="val"
            v-for="(val, key) in tableData1"
            :key="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" class="right">
      <div class="count" v-if="countData.length != 0">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">¥{{ item.value }}</p>
            <p class="txt">¥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top_chart">
        <div ref="echart" style="height: 280px"></div>
      </el-card>

      <div class="graph">
        <el-card>
          <div ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getTableData, getCountData, getChartData } from "@api/api";

import * as echarts from "echarts";

const tableData = ref([]);
const tableData1 = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});
const countData = ref([]);
const observer = ref(null);
// 图表公共配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: { color: "#333" },
  legend: {},
  grid: { left: "20%" },
  // 提示框
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: { lineStyle: { color: "#17b3a3" } },
    axisLabel: { interval: 0, color: "#333" },
  },
  yAxis: [{ type: "value", axisLine: { lineStyle: { color: "#17b3a3" } } }],
  color: ["#2ecc7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
const pieOtions = reactive({
  tooltip: { trigger: "item" },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});

const echart = ref(null);
const userEchart = ref(null);
const videoEchart = ref(null);

// 设置头像
const getInmageUrl = (user) => {
  return new URL(`../../assets/img/${user}.png`, import.meta.url).href;
};
// 获取表格数据
const getTable = async () => {
  const res = await getTableData();
  tableData.value = res.data.tableData;
};
// 获取count数据
const getCount = async () => {
  const res = await getCountData();
  console.log("res  ----->  ", res);
  countData.value = res.data;
};
// 获取chart数据
const getChart = async () => {
  const res = await getChartData(),
    { orderData, userData, videoData } = res.data;

  // 第一个图表
  xOptions.xAxis.data = orderData.date;
  xOptions.series = Object.keys(orderData.data[0]).map((val) => {
    return {
      name: val,
      data: orderData.data.map((item) => item[val]),
      type: "line",
    };
  });
  const echart_1 = echarts.init(echart.value); // 获取实例
  echart_1.setOption(xOptions);

  // 第二个图表
  xOptions.xAxis.data = userData.map((item) => item.date);
  xOptions.series = [
    { name: "新增用户", data: userData.map((item) => item.new), type: "bar" },
    {
      name: "活跃用户",
      data: userData.map((item) => item.active),
      type: "bar",
    },
  ];
  const echart_2 = echarts.init(userEchart.value);
  echart_2.setOption(xOptions);

  // 第三个图表
  pieOtions.series = [{ data: videoData, type: "pie", radius: ["50%", "70%"] }];
  const echart_3 = echarts.init(videoEchart.value);
  echart_3.setOption(pieOtions);

  // 监听页面尺寸变化
  // 如果页面尺寸变化，重新渲染图表
  observer.value = new ResizeObserver(() => {
    echart_1.resize();
    echart_2.resize();
    echart_3.resize();
  });

  // 容器存在
  if (echart.value) {
    observer.value.observe(echart.value);
  }
};

onMounted(() => {
  // getTable();
  // getCount();
  // getChart();
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  // overflow: hidden;
  // .left,
  // .right {
  //   margin-top: 20px;
  // }
  .left {
    .user {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      .user_img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      .user_info {
        p {
          line-height: 40px;
        }
        .user_info_p {
          color: #999;
        }
      }
      .user_info_admin {
        font-size: 35px;
      }
    }
    .login_info {
      p {
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span {
          color: #666;
          margin-left: 60px;
        }
      }
    }
    .user_table {
      margin-top: 20px;
    }
  }
  .right {
    .count {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .el-card {
        width: 32%;
        margin-bottom: 20px;
      }
      .icons {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;

        .num {
          font-size: 30px;
          margin-bottom: 10px;
        }
        .txt {
          font-size: 15px;
          text-align: center;
          color: #999;
        }
      }
    }
    .graph {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .el-card {
        width: 48%;
        height: 260px;
      }
    }
  }
}
</style>
