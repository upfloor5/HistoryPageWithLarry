<script setup lang="ts">
import { useSelectStore } from '../store/selectStore';
import { useSelectStore1 } from '../store/selectStore1';
import { padZero } from '../uility/prize_base_info';
import { onMounted, watch } from 'vue';
const getColorArr = (data: string) => {
  const colorMap = {
    红: 'red',
    绿: 'green',
    蓝: 'blue'
  };
  const result = colorMap[data];
  if (!result) {
    console.warn(`顏色未定義: ${data}`);
  }
  return result || '';
};
const selectStore = useSelectStore();
const selectStore1 = useSelectStore1();
onMounted(() => {
  selectStore.getHistoryAPIData();
});
</script>
<template>
  <div class="pt-1">
    <!-- <div class="flex border-b-1 border-b-indigo-500">
      <div class="openInfo leading-[20px] w-1/5 text-center">
        <div class="text-zinc-400 text-[14px]">2025-02-20</div>
        <div class="font-semibold text-[16px] leading-8">051期</div>
      </div>
      <div class="itemLottery w-4/5 whitespace-nowrap">
        <div class="flex">
          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox green">27</div>

              <div class="xiaoBox">兔/土</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox green">22</div>

              <div class="xiaoBox">猴/水</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox blue">31</div>

              <div class="xiaoBox">猪/火</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox red">07</div>

              <div class="xiaoBox">猪/木</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox red">13</div>

              <div class="xiaoBox">蛇/水</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox red">18</div>

              <div class="xiaoBox">鼠/火</div>
            </div>
          </div>

          <div class="itemLotteryBoxItem itemLotteryBoxItemJoin"><div>+</div></div>
          <div class="itemLotteryBoxItem">
            <div class="itemLotteryBoxItemBox">
              <div class="numberBox green">49</div>

              <div class="xiaoBox">蛇/土</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="flex border-b-1 border-b-indigo-500" v-for="data in selectStore1.items">
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
