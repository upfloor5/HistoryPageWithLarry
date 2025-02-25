# Vue3 開獎歷史紀錄
主頁架構:
- 開獎歷史紀錄 
- 走勢圖表 
- 開獎統計  
- 遺漏統計


### 使用套件:
- pinia v3.0.1
- pinia-plugin-persistedstate v4.2.0
- tailwinds v4.0.7
- element-plus v2.9.4 (UI)
- axios v1.7.9
- ESlint v9.21.0
- vue-query v1.26.0



### 全域狀態管理:
- 使用pinia搭配persistedstate插件做全域狀態管理，persistedstate可以自動存取localStorage的資料
- 不需使用 localStorage.getItem 或 localStorage.setItem，只要從store存取資料
- 所有狀態管理檔案 /stores/*.ts