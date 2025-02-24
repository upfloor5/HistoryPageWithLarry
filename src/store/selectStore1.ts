import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { toData } from '../uility/prize_base_info';

interface DataValue {
  id: string;
  num_1: number;
  num_2: number;
  num_3: number;
  num_4: number;
  num_5: number;
  num_6: number;
  num_7: number;
  number_attr_1: number;
  number_attr_2: number;
  number_attr_3: number;
  number_attr_4: number;
  number_attr_5: number;
  number_attr_6: number;
  number_attr_7: number;
  period_now_year: string;
  period_now_month: string;
  period_now_day: string;
  period_now_hour: string;
  period_now: string;
}

//Setup Store 寫法

export const useSelectStore1 = defineStore(
  'select',
  () => {
    const items = ref<Array<any>>([]); // 儲存 API 獲取的選項資料
    const type = ref<string>('1');
    const year = ref<string>('2025');
    const period = ref<string>('50');

    const getHistoryAPIData = async () => {
      try {
        const response = await axios.get(`https://api.cdn8649.cc/api/v01/lh/index.json?p=${year.value}${type.value}`);
        const data = await response.data; // 更新 items
        const reMapData = JSON.parse(toData(data.checkstr, data.timestamp))
          .map((da: DataValue) => ({
            id: da.id,
            num_1: da.num_1,
            num_2: da.num_2,
            num_3: da.num_3,
            num_4: da.num_4,
            num_5: da.num_5,
            num_6: da.num_6,
            num_7: da.num_7,
            number_attr_1: da.number_attr_1,
            number_attr_2: da.number_attr_2,
            number_attr_3: da.number_attr_3,
            number_attr_4: da.number_attr_4,
            number_attr_5: da.number_attr_5,
            number_attr_6: da.number_attr_6,
            number_attr_7: da.number_attr_7,
            period_now_year: da.period_now_year,
            period_now_month: da.period_now_month,
            period_now_day: da.period_now_day,
            period_now_hour: da.period_now_hour,
            period_now: da.period_now
          }))
          .reverse()
          .slice(0, period.value);
        items.value = reMapData;
        console.log(items.value);
      } catch (error) {
        console.error('API 請求失敗:', error);
      }
    };
    const getYearAPIData = async (item: string) => {
      year.value = item;
      await getHistoryAPIData();
    };
    const getPeriodAPIData = async (item: string) => {
      period.value = item;
      await getHistoryAPIData();
    };
    const getTypeAPIData = async (item: string) => {
      type.value = item;
      await getHistoryAPIData();
    };

    return { getHistoryAPIData, getYearAPIData, getPeriodAPIData, getTypeAPIData, items, type, year, period };
  },
  { persist: true }
);
