import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const emitter = mitt()
let app = createApp(App)
app.config.globalProperties.emitter = emitter
 
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

createApp(App).use(ElementPlus).use(VueMasonryPlugin).mount('#app')
