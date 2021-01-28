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
  baseURL: '',
  headers: {}
}


const _axios = axios.create(config)
_axios.interceptors.request.use(
  function(config):any {
    const token = store.state.token
    console.log(token, "axiosToken");
    
    config.headers = {'Client-Token': token}
    return config
  }
)

const app = createApp(App)

app.component("foot-com", footComponent)
app.component("head-com", headComponent)
app.component("bread", breadComponent)

app.config.globalProperties.$axios=_axios;
app.use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
