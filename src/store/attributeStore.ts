import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { toData } from '../utility/prize_base_info';
import type { DataValue,useSelectStore } from '../store/selectStore';

const transformData = (resourceData) => {
  const targetData = {};

  // 遍历 resourceData 的一级属性
  Object.keys(resourceData).forEach((key) => {
    const category = resourceData[key]; // 获取分类
    targetData[key] = []; // 初始化目标数组

    // 遍历分类中的每一项
    Object.keys(category).forEach((subKey) => {
      const item = category[subKey];
      targetData[key].push({
        id: item.id,
        number_type: item.number_type,
        year: item.year,
        type: item.type,
        type_code: item.type_code,
        name: item.name,
        content1: item.content1,
        content2: item.content2 || null // 确保空值为 null
      });
    });
  });

  return targetData;
};

interface attributesData {
  id: number;
  number_type: string;
  year: number;
  type: string;
  type_code: number;
  name: string;
  content1: string;
  content2: string;
}

// 依屬性照類別過濾 ex:取 生肖对应号码 返回生肖对应陣列資料
const filterTypeArr = (inputArr: attributesData[], inputString: string) => {
  if (inputArr.filter((fil) => fil.type === `${inputString}`)) {
    return inputArr.filter((fil) => fil.type === `${inputString}`);
  }
  return null;
};
interface attrList {
  name: string;
  content1: string[];
}
interface formatNumList {
  num: string;
  period: number;
  year: number;
  month: number;
  day: number;
}
const numSelectList = [
  { label: "特码", value: 7 },
  { label: "平一", value: 1 },
  { label: "平二", value: 2 },
  { label: "平三", value: 3 },
  { label: "平四", value: 4 },
  { label: "平五", value: 5 },
  { label: "平六", value: 6 },
];

export const useAttributeStore = defineStore(
  'attributes',
  () => {
    const attrData = ref<Record<string, any>>({}); //  存儲屬性數據
    const year = ref<string>('2025');
    const type = ref<string>('49');
    const apiData49 = ref<any[]>([]);
    const apiData60 = ref<any[]>([]);
    const animalList49 = ref<attrList[]>([]);
    const animalList60 = ref<attrList[]>([]);
    const wuxingList49 = ref<attrList[]>([]);
    const boseList49 = ref<attrList[]>([]);
    const filteredData = ref<formatNumList[]>([]); //過濾後屬性資料 ex:點選五行 回傳  ['金','火',...]
    let activeListTypes = ref<number>(7); //預設給特碼
    const selectType  = ref<string>('特码')
    const numDataList = ref<formatNumList[]>([]); //過濾下拉選單選擇平碼或特碼七種開獎號碼 ex:點選平碼 回傳所有平碼資料
   

    const getStoredData = (numType: number, inputYear: number) => {
      const sortData = attrData.value[`${inputYear}${numType}`];
      const flatData = Object.values(sortData).flat();
      return flatData;
    };

    //年度彩種屬性對照資料
    const getAttrData = async (year: number, type: number) => {
      try {
        const response = await axios.get(`https://api.cdn8649.cc/api/v01/infoAttr/index.json?p=${year}${type}`);
        const data = await response.data;
        const formatData = transformData(JSON.parse(toData(data.checkstr, data.timestamp)));
        attrData.value[`${year}${type}`] = formatData;
      } catch (error) {
        console.error('Error fetching attribute data:', error);
      }
    };

    const getAttrDataByYearAndId = async (year: number, type: number) => {
      await getAttrData(year, type);
    };

    const getStoreData_49 = (year: number) => {
      apiData49.value = getStoredData(49, year);
    };
    const getStoreData_60 = (year: number) => {
      apiData60.value = getStoredData(60, year);
    };
    //取得所有期數平或特碼資料 arr:年份彩種取的資料陣列 ,inputNum:平碼或特碼對應數字 ex:特碼:7 ,平一:1 ...
    const getAllPeriodNumber = (arr: DataValue[], inputNum: number) => {
      console.log('選取號碼類型:'+ inputNum)
      console.log('arr:', arr)
      selectType.value  = inputNum == 7 ? '特码' : `平${inputNum}`
      const formatData = Object.values(arr);  
      numDataList.value = formatData.map((item) => {
        const key = `num_${inputNum}`;
        return {
        num:  item[key],
        period: item.period_now,
        year: item.period_now_year,
        month: item.period_now_month,
        day: item.period_now_day,
        }          
      });
      console.log('numDataList:', numDataList.value)
      filteredData.value = numDataList.value;
    };

    //生肖對應資料陣列
    const animalToNumFilter49 = (): attributesData[] | null => {
      const animal = filterTypeArr(apiData49.value, '生肖对应号码');
      return animal;
    };

    // 輸入數字返回生肖
    const getAnimalByNumber = (numStr: number) => {
      const num = String(numStr).padStart(2, '0');
      const result = animalList49.value.filter((item) => item.content1.includes(num));
      const names = result.map((item) => item.name);
      return names[0];
    };

    // 取得需要生肖對應資料

    const getAnimalList49 = () => {
      const animalData = animalToNumFilter49();
      if (animalData) {
        animalList49.value = animalData.map((ma) => {
          return {
            name: ma.name,
            content1: ma.content1.split(',')
          };
        });
      }
    };

    const getAllAnimalNumber = (arr: any[], inputNum: number) => {
      activeListTypes.value = inputNum;     
      const formatDataData = Object.values(arr);  
      filteredData.value = formatDataData.map((item) => {     
        const data = getAnimalByNumber(item.num);       
        return {
          num: data,
          period: item.period_now,
          year: item.period_now_year,
          month: item.period_now_month,
          day: item.period_now_day,
        };
      });
    };

    //五行對應資料陣列
    const wuxingToNumFilter49 = (): attributesData[] | null => {
      const wuxing = filterTypeArr(apiData49.value, '五行对照');
      return wuxing;
    };

    // 取得需要五行對應資料
    const getWuxingList49 = () => {
      const wuxingData = wuxingToNumFilter49();
      if (wuxingData) {
        wuxingList49.value = wuxingData.map((ma) => {
          return {
            name: ma.name,
            content1: ma.content1.split(',')
          };
        });
      }
    };

    // 輸入數字返回五行
    const getWuxingByNumber = (numStr: number) => {
      const num = String(numStr).padStart(2, '0');
      const result = wuxingList49.value.filter((item) => item.content1.includes(num));
      const names = result.map((item) => item.name);
      return names[0];
    };

    //取得所有期數五行
    const getAllWuxingPeriodNumber = (arr: DataValue[], inputNum: number) => {
      activeListTypes.value = inputNum;      
      const formatDataData = Object.values(arr);    
      const zodiacArray = formatDataData.map((item) => {
        const key = `num_${inputNum}`;
        return item[key];
      });
      filteredData.value = zodiacArray.map((item) => {
        const data = getWuxingByNumber(item);
        return data;
      });
    };
    //波色對應資料陣列
    const boseToNumFilter49 = (): attributesData[] | null => {
      const bose = filterTypeArr(apiData49.value, '波色');
      return bose;
    };

    // 取得需要波色對應資料
    const getBoseList49 = () => {
      const animalData = boseToNumFilter49();
      if (animalData) {
        boseList49.value = animalData.map((ma) => {
          return {
            name: ma.name,
            content1: ma.content1.split(',')
          };
        });
      }
    };

    // 輸入數字返回波色
    const getBoseByNumber = (numStr: number) => {
      const num = String(numStr).padStart(2, '0');
      const result = boseList49.value.filter((item) => item.content1.includes(num));
      const names = result.map((item) => item.name);
      return names[0];
    };

    //取得所有期數波色
    const getAllBosePeriodNumber = (arr: DataValue[], inputNum: number) => {
      activeListTypes.value = inputNum;
      const formatDataData = Object.values(arr);
      const boseArray = formatDataData.map((item) => {
        const key = `num_${inputNum}`;
        return item[key];
      });
      filteredData.value = boseArray.map((item) => {
        const data = getBoseByNumber(item);
        return data;
      });
    };

    //取頭數
    const getHeadNumberArray = () => {
      const head = numDataList.value.map((item: string) => {
        return item.padStart(2, '0').slice(0, 1);
      });
      filteredData.value = head;
    };

    //取尾數
    const getTailNumberArray = () => {
      const tail = numDataList.value.map((item: string) => {
        return item.padStart(2, '0').slice(1, 2);
      });
      filteredData.value = tail;
    };

    return {
      attrData,
      year,
      type,
      getAttrData,
      getAttrDataByYearAndId,
      getStoredData,
      getStoreData_49,
      getStoreData_60,
      animalToNumFilter49,
      getAnimalByNumber,
      getAnimalList49,
      getAllAnimalNumber,
      wuxingToNumFilter49,
      getWuxingList49,
      getAllWuxingPeriodNumber,
      getAllBosePeriodNumber,
      getBoseList49,
      getHeadNumberArray,
      getTailNumberArray,
      getAllPeriodNumber,
      filteredData,
      activeListTypes,
      numDataList,
      selectType,
      numSelectList
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'attribute_data', // ✅ `localStorage` 存儲的 key
          storage: localStorage, // ✅ 使用 localStorage
          paths: ['attrData'] // ✅ 只持久化 `attrData`
        }
      ]
    }
  }
);
