<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSelectStore } from '../store/selectStore';
import { useAttributeStore } from '@/store/attributeStore';

const store = useSelectStore();
const attributeStore = useAttributeStore();
// 使用 storeToRefs 來保持響應性
const { type, year, period, selectOptions } = storeToRefs(store);

const { getTypeAPIData, getYearAPIData, getPeriodAPIData } = store;
</script>

<template>
  <el-select v-model="type" class="select-width" :fallback-placements="['bottom-start']">
    <el-option v-for="item in selectOptions.type" :key="item" :label="item.label" :value="item.value" @click="getTypeAPIData(item.value)" />
  </el-select>
  <el-select v-model="year" class="select-width" :fallback-placements="['bottom-start']">
    <el-option v-for="item in selectOptions.year" :key="item" :label="item.label" :value="item.value" @click="getYearAPIData(item.value)" />
  </el-select>
  <el-select v-model="period" class="select-width" :fallback-placements="['bottom-start']">
    <el-option v-for="item in selectOptions.period" :key="item" :label="item.label" :value="item.value" @click="getPeriodAPIData(item.value)" />
  </el-select>
</template>

<style scoped>
.select-width {
  width: 240px;
}
</style>
