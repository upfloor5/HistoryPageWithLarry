<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Select from '@/components/Select.vue';
import HistoryList from '@/components/HistoryList.vue';
import TrendChart from '@/components/TrendChart.vue';
import HitStatistics from '@/components/HitStatistics.vue';
import Omission from '@/components/Omission.vue';
import { useAttributeStore } from '@/store/attributeStore';
import { useGlobalStore } from '@/store/globalStore';
import { useSelectStore } from '@/store/selectStore';

const attributeStore = useAttributeStore();
const selectStore = useSelectStore();

const activeView = ref<number>(2);

/*
目前預設只取得2025 49資料
TODO: 把onMounted 寫簡潔一點
*/
onMounted(() => {
  attributeStore.getAttrDataByYearAndId(2025, 49);
  attributeStore.getAttrDataByYearAndId(2025, 60);
  attributeStore.getAttrDataByYearAndId(2024, 49);
  attributeStore.getAttrDataByYearAndId(2024, 60);
  attributeStore.getStoreData_49(2025);
  attributeStore.getStoreData_60(2025);
  attributeStore.animalToNumFilter49();
  attributeStore.getAnimalList49();
  attributeStore.getWuxingList49();
  attributeStore.getAllWuxingPeriodNumber(selectStore.items, 1), 
  attributeStore.getBoseList49();
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
        <div class="act w-1/4 py-1 mx-10 my-0" value="0" id="history" @click="activeView = 1">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav0.webp" />

          <p class="m-auto text-center"><span class="idm2247 text-[14px]">历史记录</span></p>
        </div>

        <div class="w-1/4 py-1 mx-10 my-0" value="1" id="lineChart" @click="activeView = 2">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav1.webp" />

          <p class="m-auto text-center"><span id="idm2754" class="text-[14px]">走势图表</span></p>
        </div>

        <div class="w-1/4 py-1 mx-10 my-0" value="2" id="barChart" @click="activeView = 3">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav2.webp" />

          <p class="m-auto text-center"><span id="idm2755" class="text-[14px]">开奖统计</span></p>
        </div>

        <div class="w-1/4 mx-10 my-0 py-1" value="3" id="tableChart" @click="activeView = 4">
          <img class="w-[46px] m-auto" src="https://cdn.cdnwss.com/xiniupublic/newBM/baomaqgxg/navImage/nav3.webp" />

          <p class="m-auto text-center"><span id="idm2756" class="text-[14px]">遗漏统计</span></p>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <Select />
    </div>
    <div v-if="activeView === 1">
      <HistoryList />
    </div>
    <div v-else-if="activeView === 2">
      <TrendChart />
    </div>
    <div v-else-if="activeView === 3">
      <HitStatistics />
    </div>

    <div v-else="activeView === 4">
      <Omission />
    </div>
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
