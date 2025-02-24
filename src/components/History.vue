<script setup lang="ts">
import { ref,onMounted } from 'vue';
import Select from './Select.vue';
import HistoryList from './HistoryList.vue';
import { useSelectStore } from '../store/selectStore';


// ｃａｌｌ 生肖屬性ＡＰＩ ，存到persist
onMounted(() => {
 
});

</script>

<template>
  <div class="max-w-[720px]">
    <div class="my-0 mx-auto">
      <div class="flex justify-between h-auto py-5 text-white" style="background-color: #4b5cc4">
        <el-icon :size="30"><ArrowLeft /></el-icon>
        <span class="text-xl">历史记录</span>
        <el-icon class="" :size="35"><HomeFilled /></el-icon>
      </div>

      <div class="flex justify-around">
        <div class="act w-1/4 py-1 mx-10 my-0" value="0" id="history">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav0.webp" />

          <p class="m-auto text-center"><span class="idm2247 text-[14px]">历史记录</span></p>
        </div>

        <div class="w-1/4 py-1 mx-10 my-0" value="1" id="lineChart">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav1.webp" />

          <p class="m-auto text-center"><span id="idm2754" class="text-[14px]">走势图表</span></p>
        </div>

        <div class="w-1/4 py-1 mx-10 my-0" value="2" id="barChart">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav2.webp" />

          <p class="m-auto text-center"><span id="idm2755" class="text-[14px]">开奖统计</span></p>
        </div>

        <div class="w-1/4 mx-10 my-0 py-1" value="3" id="tableChart">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav3.webp" />

          <p class="m-auto text-center"><span id="idm2756" class="text-[14px]">遗漏统计</span></p>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <Select />
    </div> 
    <HistoryList />
  </div>
</template>

<style scoped>
.itemLotteryBoxItem {
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.itemLotteryBoxItemBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.numberBox.red {
  background-image: url(../assets/redCircle.png);
}
.numberBox.blue {
  background-image: url(../assets/blueCircle.png);
}
.numberBox.green {
  background-image: url(../assets/greenCircle.png);
}

.numberBox {
  width: 32px;
  height: 32px;
  text-align: center;
  background-repeat: no-repeat;
  background-size: contain;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  color: #000;
  font-size: 16px;
}
</style>
