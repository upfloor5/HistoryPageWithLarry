<script setup lang="ts">
import { useSelectStore } from '@/store/selectStore';
import { useAttributeStore } from '@/store/attributeStore';
import { padZero } from '@/utility/prize_base_info';
import { onMounted, watch } from 'vue';
interface ColorMap {
  [key: string]: string; // 索引簽名，允許動態鍵
}

// 函數加上輸入和返回型別
const getColorArr = (data: string): string => {
  // 定義顏色映射物件，並指定型別
  const colorMap: ColorMap = {
    红: 'red',
    绿: 'green',
    蓝: 'blue'
  };

  // 從映射中獲取結果
  const result = colorMap[data];

  // 如果結果不存在，打印警告
  if (!result) {
    console.warn(`顏色未定義: ${data}`);
  }

  // 返回結果，若無則返回空字串
  return result || '';
};
const selectStore = useSelectStore();
onMounted(() => {
  selectStore.getHistoryAPIData();
});
</script>
<template>
  <div class="pt-1">
    <div class="flex border-b-1 border-b-indigo-500" v-for="data in selectStore.items">
      <div class="openInfo leading-[20px] w-1/5 text-center">
        <div class="text-zinc-400 text-[14px]">{{ data.period_now_year }}-{{ data.period_now_month }}-{{ data.period_now_day }}</div>
        <div class="font-semibold text-[16px] leading-8">{{ padZero(data.period_now) }}期</div>
      </div>
      <div class="itemLottery w-4/5 whitespace-nowrap">
        <div class="flex">
          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_1[3]), 'numberBox']">{{ data.num_1 }}</div>

              <div class="xiaoBox">{{ data.number_attr_1[1] }}/{{ data.number_attr_1[2] }}</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_2[3]), 'numberBox']">{{ data.num_2 }}</div>

              <div class="xiaoBox">{{ data.number_attr_2[1] }}/{{ data.number_attr_2[2] }}</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_3[3]), 'numberBox']">{{ data.num_3 }}</div>

              <div class="xiaoBox">{{ data.number_attr_3[1] }}/{{ data.number_attr_3[2] }}</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_4[3]), 'numberBox']">{{ data.num_4 }}</div>

              <div class="xiaoBox">{{ data.number_attr_4[1] }}/{{ data.number_attr_4[2] }}</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_5[3]), 'numberBox']">{{ data.num_5 }}</div>

              <div class="xiaoBox">{{ data.number_attr_5[1] }}/{{ data.number_attr_5[2] }}</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_6[3]), 'numberBox']">{{ data.num_6 }}</div>

              <div class="xiaoBox">{{ data.number_attr_6[1] }}/{{ data.number_attr_6[2] }}</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem itemLotteryBoxItemJoin"><div>+</div></div>
          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div :class="[getColorArr(data.number_attr_7[3]), 'numberBox']">{{ data.num_7 }}</div>

              <div class="xiaoBox">{{ data.number_attr_7[1] }}/{{ data.number_attr_7[2] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
.red {
  background-image: url(../assets/redCircle.png);
}
.blue {
  background-image: url(../assets/blueCircle.png);
}
.green {
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
