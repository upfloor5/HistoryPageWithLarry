import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const attributeStore = defineStore(
  'select',
  () => {
    const attrData = ref<any[]>([]); //屬性資料

    return { attrData };
  },
  { persist: true }
);
