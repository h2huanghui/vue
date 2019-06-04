<template>
    <div :class="[`nav-theme-${navTheme}`,`nav-layout-${navLayout}`]">
      <a-layout style="min-height: 100vh">
        <a-layout-sider
          :theme="navTheme"
          v-if="navLayout === 'left'"
          :trigger="null" 
          collapsible 
          v-model="collapsed"
          width="256px"
          >
        <div class="logo">Ant Design Pro</div>
        <SiderMenu :theme="navTheme"/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
              <a-icon 
              class="trigger" 
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
              v-auth="['admin']"
              ></a-icon>
              <Header />
            </a-layout-header>
            <a-layout-content style="margin: 0 16px">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                <Footer />
            </a-layout-footer>
            <!-- 设置主题的抽屉，只有管理员可以设置 -->
            <Authorized :authority="['admin']">
              <SettingDrawer />
            </Authorized>
        </a-layout>
      </a-layout>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SiderMenu from './SiderMenu'
import SettingDrawer from '../components/SettingDrawer'
export default {
    //注册使用
    components: {
        Header,
        Footer,
        SiderMenu,
        SettingDrawer
    },
    data() {
        return {
            collapsed: false,
        }
    },
    computed: {
      navTheme: function() {
          return this.$route.query.navTheme || 'dark'
      },
      navLayout: function() {
          return this.$route.query.navLayout || 'left'
      } 
    }
}
</script>

<style scoped>
.trigger {
    padding: 0 20px;
    line-height: 64px;
    font-size: 20px;
}
.trigger:hover {
    background: #eee;
}
.logo{
    height: 64px;
   line-height: 64px;
    text-align: center;
    overflow: hidden;
}
/* 深度选择器 */
.nav-theme-dark >>> .logo{
    color: #fff;
}
</style>
