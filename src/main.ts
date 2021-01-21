import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App)
// const breadComponent = () => import("@/components/bread/bread.vue")
// const footComponent = () => import("@/components/foot/foot.vue")
// app.component("foot", footComponent)
app.use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
