import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { toData } from '../utility/prize_base_info';

export const attributeStore = defineStore(
  'select',
  () => {
    const attrData = ref<any[]>([]); //屬性資料

    const getAttrData = async () => {
      try {
        const response = await axios.get('https://api.cdn8649.cc/api/v01/infoAttr/index.json?p=202449');
        const data = await response.data;
        const formatData = JSON.parse(toData(data.checkstr, data.timestamp));
        console.log('formatData', formatData);
      } catch (error) {
        console.error;
      }
    };

    return { getAttrData };
  },
  {
    persist: {
      key: 'attrKey'
    }
  }
);
