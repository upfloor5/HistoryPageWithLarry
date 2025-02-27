<script setup lang="ts">
import { useAttributeStore } from '@/store/attributeStore';
import { useSelectStore } from '@/store/selectStore';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
const { getAllPeriodNumber, getAllAnimalNumber, getAllWuxingPeriodNumber, getAllBosePeriodNumber, getHeadNumberArray, activeListTypes, getTailNumberArray,numDataList } = useAttributeStore();
const selectStore = useSelectStore();
const { items } = storeToRefs(selectStore);

const numSelectList = [
  { label: '特码', value: 7 },
  { label: '平一', value: 1 },
  { label: '平二', value: 2 },
  { label: '平三', value: 3 },
  { label: '平四', value: 4 },
  { label: '平五', value: 5 },
  { label: '平六', value: 6 }
];
const numSelect = ref<number>(7);

onMounted(() => {});
</script>

<template>
  <div class="grid grid-rows-2 grid-cols-6 gap-1.5 text-2xl mt-1 text-center">
    <el-select v-model="numSelect" class="" :fallback-placements="['bottom-start']">
      <el-option v-for="item in numSelectList" :key="item.value" :label="item.label" :value="item.value" @click="getAllPeriodNumber(items, item.value)" />
    </el-select>

    <div class="bg-red-400 text-white" @click="getAllAnimalNumber(items, activeListTypes)">生肖</div>
    <div class="bg-red-400 text-white" @click="getAllWuxingPeriodNumber(items, activeListTypes)">五行</div>
    <div class="bg-red-400 text-white" @click="getAllBosePeriodNumber(items, activeListTypes)">波色</div>
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
