import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const useGlobalStore = defineStore(
  'global',
  () => {
    //存取全域共用參數 ex:彩種 
    const activeListType = ref<number>(1);

    const changeListType = (type: number) => {
      activeListType.value = type;
    };

    return { activeListType, changeListType };
  },
  {
    persist: true
  }
);
