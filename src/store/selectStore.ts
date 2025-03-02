import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { toData } from "../utility/prize_base_info";
import { useAttributeStore } from "../store/attributeStore";

interface SelectOption {
  label: string;
  value: string;
}
export interface attrNum {
  [key: number]: string;
}

export interface DataValue {
  id: string;
  num_1: number;
  num_2: number;
  num_3: number;
  num_4: number;
  num_5: number;
  num_6: number;
  num_7: number;
  number_attr_1: attrNum;
  number_attr_2: attrNum;
  number_attr_3: attrNum;
  number_attr_4: attrNum;
  number_attr_5: attrNum;
  number_attr_6: attrNum;
  number_attr_7: attrNum;
  period_now_year: string;
  period_now_month: string;
  period_now_day: string;
  period_now_hour: string;
  period_now: number;
}
// 今年年份
const nowYear = new Date().getFullYear();

//Setup Store 寫法

export const useSelectStore = defineStore(
  "select",
  () => {
    const items = ref<Array<DataValue>>([]); // 儲存 API 獲取的選項資料
    const type = ref<string>("1"); // 預設值
    const year = ref<string>("2025");
    const period = ref<string>("50");

    const { numDataList, getAllAnimalNumber, getAllPeriodNumber,activeListTypes } =
      useAttributeStore();

    const selectOptions = ref({
      type: [
        { label: "澳門六合彩", value: "1" },
        { label: "澳門六十彩", value: "3" },
        { label: "香港六合彩", value: "2" },
        { label: "香港六合彩", value: "4" },
      ] as SelectOption[],
      year: [
        { label: "2025", value: "2025" },
        { label: "2024", value: "2024" },
      ] as SelectOption[],
      period: [
        { label: "最新50期", value: "50" },
        { label: "最新100期", value: "100" },
        { label: "最新150期", value: "150" },
        { label: "最新200期", value: "200" },
        { label: "全年", value: "366" },
      ] as SelectOption[],
    });

    const getHistoryAPIData = async () => {
      try {
        const response = await axios.get(
          `https://api.cdn8649.cc/api/v01/lh/index.json?p=${year.value}${type.value}`
        );
        const data = await response.data; // 更新 items
        const reMapData = JSON.parse(toData(data.checkstr, data.timestamp))
          .map((da: DataValue) => ({
            id: da.id,
            num_1: String(da.num_1).padStart(2, "0"),
            num_2: String(da.num_2).padStart(2, "0"),
            num_3: String(da.num_3).padStart(2, "0"),
            num_4: String(da.num_4).padStart(2, "0"),
            num_5: String(da.num_5).padStart(2, "0"),
            num_6: String(da.num_6).padStart(2, "0"),
            num_7: String(da.num_7).padStart(2, "0"),
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
            period_now: da.period_now,
          }))
          .reverse()
          .slice(0, period.value);
        items.value = reMapData;

        //如果有選取平碼就回傳平碼資料,不然預設給特碼資料
        if (activeListTypes) {
           getAllPeriodNumber(items.value, activeListTypes);
        } else {
           getAllPeriodNumber(items.value, 7);
        }
      } catch (error) {
        console.error("API 請求失敗:", error);
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

    return {
      items,
      type,
      year,
      period,
      selectOptions,
      getHistoryAPIData,
      getYearAPIData,
      getPeriodAPIData,
      getTypeAPIData,
    };
  },
  {
    persist: true,
  }
);
