<script lang="ts" setup>
import { useAttributeStore } from '@/store/attributeStore';
import AttributeButton from './AttributeButton.vue';
import * as echarts from 'echarts/core';
import { ref, onMounted } from 'vue';

const attributeStore = useAttributeStore();

onMounted(() => {
 
});
</script>

<template>
  <!--走勢圖 -->
  <AttributeButton />
  <div>走勢圖</div>
  <div v-for="data in attributeStore.filteredData">{{ data }}</div>
</template>

<style scoped></style>
