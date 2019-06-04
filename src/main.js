import Vue from "vue";
import VueI18n from "vue-i18n";
// import Antd from "ant-design-vue";
// import Button from "ant-design-vue/lib/button";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
// import "ant-design-vue/dist/antd.less";
import "ant-design-vue/lib/button/style";
//注册为全局组件，方便使用
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import request from "./utils/request";
import zhCN from "./locale/zhCN";
import enUS from "./locale/enUS";
import queryString from "query-string";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/github.css";
Vue.config.productionTip = false;

// Vue.use(Antd); //全局注册组件

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Auth);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.component("Authorized", Authorized);
Vue.use(VueI18n);
Vue.use(VueHighlightJS);

const i18n = new VueI18n({
  /* location.search是一个字段,使用queryString转化为对象 */
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1208307_d29b2xznuys.js" // 在 iconfont.cn 上生成
});
Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
//挂载到vue原型里
Vue.prototype.$request = request;
