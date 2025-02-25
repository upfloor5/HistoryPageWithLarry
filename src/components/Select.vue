<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import axios from 'axios';
import { useSelectStore } from '../store/selectStore';

const options = ref({
  type: [
    { label: '澳門六合彩', value: '1' },
    { label: '澳門六十彩', value: '3' },
    { label: '香港六合彩', value: '2' },
    { label: '香港六合彩', value: '4' }
  ],
  year: [
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' }
  ],
  period: [
    { label: '最新50期', value: '50' },
    { label: '最新100期', value: '100' },
    { label: '最新150期', value: '150' },
    { label: '最新200期', value: '200' },
    { label: '全年', value: '366' }
  ]
});

const typeDefaultValue = ref<string>('澳門六合彩');
const yearDefaultValue = ref<string>('2025');
const periodDefaultValue = ref<string>('最新50期');

const selectStore = useSelectStore();

// 定義 props
const props = defineProps({
  modelValue: String,
  items: Array
});
</script>

<template>
  <el-select v-model="typeDefaultValue" class="select-width" :fallback-placements="['bottom-start']">
    <el-option v-for="item in options.type" :key="item" :label="item.label" :value="item.value" @click="selectStore.getTypeAPIData(item.value)" />
  </el-select>
  <el-select v-model="yearDefaultValue" class="select-width" :fallback-placements="['bottom-start']">
    <el-option v-for="item in options.year" :key="item" :label="item.label" :value="item.value" @click="selectStore.getYearAPIData(item.value)" />
  </el-select>
  <el-select v-model="periodDefaultValue" class="select-width" :fallback-placements="['bottom-start']">
    <el-option v-for="item in options.period" :key="item" :label="item.label" :value="item.value" @click="selectStore.getPeriodAPIData(item.value)" />
  </el-select>
</template>

<style scoped>
.select-width {
  width: 240px;
}
</style>
