<script setup lang="ts">
import { useAttributeStore } from "@/store/attributeStore";
import { useSelectStore } from "@/store/selectStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
const {
  getAllPeriodNumber,
  getAllAnimalNumber,
  getAllWuxingPeriodNumber,
  getAllBosePeriodNumber,
  getTailNumberArray,
  getHeadNumberArray,
  numSelectList,
} = useAttributeStore();

const attributeStore = useAttributeStore();
const { activeListTypes, numDataList, selectType } = storeToRefs(attributeStore);
const selectStore = useSelectStore();
const { items } = storeToRefs(selectStore);



onMounted(() => {});
</script>

<template>
  <div class="grid grid-rows-2 grid-cols-6 gap-1.5 text-2xl mt-1 text-center">
    <el-select
      v-model="selectType"
      class=""
      :fallback-placements="['bottom-start']"
    >
      <el-option
        v-for="item in numSelectList"
        :key="item.value"
        :label="item.label"
        :value="item.label"
        @click="getAllPeriodNumber(items, item.value)"
      />
    </el-select>

    <div
      class="bg-red-400 text-white"
      @click="getAllAnimalNumber(numDataList, activeListTypes)"
    >
      生肖
    </div>
    <div class="bg-red-400 text-white" @click="">五行</div>
    <div class="bg-red-400 text-white" @click="">波色</div>
    <div class="bg-red-400 text-white" @click="getHeadNumberArray()">头数</div>
    <div class="bg-red-400 text-white" @click="getTailNumberArray()">尾数</div>
    <div class="bg-red-400 text-white">合数</div>
    <div class="bg-red-400 text-white">大小</div>
    <div class="bg-red-400 text-white">单双</div>
    <div class="bg-red-400 text-white">五门</div>
    <div class="bg-red-400 text-white">七段</div>
    <div class="bg-red-400 text-white">半波</div>
  </div>
</template>

<style scoped></style>
