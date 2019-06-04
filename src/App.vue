<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <!-- 最顶层的出口，渲染最高级路由匹配到的组件 -->
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import moment from "moment"
import "moment/locale/zh-cn"
export default {
  data() {
    return {
      locale: zhCN
    } 
  },
  /* 路由控制语言的切换,监听路由上面的query */
  watch: {
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS :　zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
}
</script>


<style lang="less"></style>
