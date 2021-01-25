// const breadComponent = () => import("@/components/bread/bread.vue")
// const footComponent = () => import("@/components/foot/foot.vue")
import breadComponent from "@/components/bread/bread.vue";
import footComponent from "@/components/foot/foot.vue";
import headComponent from "@/components/head/head.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const config = {
  baseURL: ''
}

const _axios = axios.create(config)

const app = createApp(App)

app.component("foot-com", footComponent)
app.component("head-com", headComponent)
app.component("bread", breadComponent)

app.config.globalProperties.$axios=_axios;
app.use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
