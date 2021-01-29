// const breadComponent = () => import("@/components/bread/bread.vue")
// const footComponent = () => import("@/components/foot/foot.vue")
import breadComponent from "@/components/bread/bread.vue";
import footComponent from "@/components/foot/foot.vue";
import headComponent from "@/components/head/head.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App)

app.component("foot-com", footComponent)
app.component("head-com", headComponent)
app.component("bread", breadComponent)

app.use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
