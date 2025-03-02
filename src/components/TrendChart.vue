<script lang="ts" setup>
import { useAttributeStore } from "@/store/attributeStore";
import AttributeButton from "./AttributeButton.vue";
import * as echarts from "echarts/core";
import { ref, onMounted,watch,computed  } from "vue";
import { useSelectStore } from "@/store/selectStore";
import { storeToRefs } from 'pinia';

const attributeStore = useAttributeStore();
const {filteredData, numDataList,activeListTypes } =storeToRefs(attributeStore); //確保資料是響應式的
const  {items} =useSelectStore()
const chartRef = ref(null); // 綁定 ECharts 容器


// const option = {
//   title: {
//     text: "生肖折線圖",
//   },
//   tooltip: {
//     trigger: "axis",
//   },
//   xAxis: {
//     type: "category",
//     data: [
//       "鼠",
//       "牛",
//       "虎",
//       "兔",
//       "龍",
//       "蛇",
//       "馬",
//       "羊",
//       "猴",
//       "雞",
//       "狗",
//       "豬",
//     ],
//     position: "top",
//   },
//   yAxis: {
//     type: "category",
//     data: [
//       "2025-044期",
//       "2025-045期",
//       "2025-046期",
//       "2025-047期",
//       "2025-048期",
//       "2025-049期",
//       "2025-050期",
//       "2025-051期",
//       "2025-052期",
//       "2025-053期",
//       "2025-054期",
//       "2025-055期",
//       "2025-056期",
//       "2025-057期",
//       "2025-058期",
//     ],
//   },
//   series: [
//     {
//       // name: '生肖變化',
//       type: "line",
//       data: [
//         {
//           value: ["鼠", "2025-044期"],
//           itemStyle: { color: "red" },
//           label: { color: "white" },
//         },
//         {
//           value: ["鼠", "2025-045期"],
//           itemStyle: { color: "red" },
//           label: { color: "white" },
//         },
//         {
//           value: ["馬", "2025-046期"],
//           itemStyle: { color: "blue" },
//           label: { color: "yellow" },
//         },
//         {
//           value: ["馬", "2025-047期"],
//           itemStyle: { color: "blue" },
//           label: { color: "yellow" },
//         },
//         {
//           value: ["鼠", "2025-048期"],
//           itemStyle: { color: "red" },
//           label: { color: "white" },
//         },
//         {
//           value: ["牛", "2025-049期"],
//           itemStyle: { color: "green" },
//           label: { color: "black" },
//         },
//         {
//           value: ["牛", "2025-050期"],
//           itemStyle: { color: "green" },
//           label: { color: "black" },
//         },
//         {
//           value: ["蛇", "2025-051期"],
//           itemStyle: { color: "purple" },
//           label: { color: "white" },
//         },
//         {
//           value: ["蛇", "2025-052期"],
//           itemStyle: { color: "purple" },
//           label: { color: "white" },
//         },
//         {
//           value: ["羊", "2025-053期"],
//           itemStyle: { color: "pink" },
//           label: { color: "black" },
//         },
//         {
//           value: ["猴", "2025-054期"],
//           itemStyle: { color: "orange" },
//           label: { color: "black" },
//         },
//         {
//           value: ["狗", "2025-055期"],
//           itemStyle: { color: "brown" },
//           label: { color: "white" },
//         },
//         {
//           value: ["鼠", "2025-056期"],
//           itemStyle: { color: "red" },
//           label: { color: "white" },
//         },
//         {
//           value: ["狗", "2025-057期"],
//           itemStyle: { color: "brown" },
//           label: { color: "white" },
//         },
//         {
//           value: ["豬", "2025-058期"],
//           itemStyle: { color: "gray" },
//           label: { color: "black" },
//         },
//       ],
//       symbol: "circle", // 確保標記是圓形
//       symbolSize: 28, // 控制圓圈的大小
//       itemStyle: {
//         borderColor: "transparent", // 隱藏邊框
//       },
//       label: {
//         show: true, // 顯示標籤
//         position: "inside", // 讓文字顯示在圓圈內
//         formatter: (params) => params.value[0], // 顯示生肖名稱
//         color: "white", // 設定字體顏色（可以根據背景色調整）
//       },

//       lineStyle: {
//         width: 2,
//       },
//     },
//   ],
// };
onMounted(() => {
  //預設先取得特碼初始資料，再依照選擇是否顯示其他號碼資料，以及生肖、五行、波色等資料
  attributeStore.getAllPeriodNumber(items, 7);
  // if (!chartRef.value) return;
  // const chart = echarts.init(chartRef.value); // 初始化 ECharts
  // chart.setOption(option);
});
watch(filteredData, (newValue, oldValue) => {
  console.log('filteredData changed from', oldValue, 'to', newValue);
});
</script>

<template>
  <!--走勢圖 -->
  <AttributeButton />

  <div>走勢圖</div>
  <!-- <div ref="chartRef" style="width: 100%; height: 600px"></div> -->
  <div class="flex gap-5">
    <div>
      <div>屬性轉換後字串</div>
      <div v-for="data,  in filteredData">{{ `第${String(data.period).padStart(3,'0')}期` }}:{{ data?.num }}</div>
    </div>

 
  </div>
</template>

<style scoped></style>
