import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from 'vue-query';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { LineChart } from 'echarts/charts';
import ECharts from 'vue-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, LegendComponent } from 'echarts/components';

echarts.use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, GridComponent, DatasetComponent, LegendComponent]);

const app = createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('v-chart', ECharts);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(VueQueryPlugin);
app.mount('#app');
