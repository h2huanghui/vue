<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item 
        v-if="!item.children" 
        :key="item.path"
        @click="() => $router.push({ path: item.path, query: $route.query})"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
/* 
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
import { check } from '../utils/auth.js'
export default {
  props: {
    theme: {
        type: String,
        default: 'dark'
    }
  },
  components: {
    'sub-menu': SubMenu,
  },
  data () {
    //this.$router.options.route
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    //路由和keys相对应的关系。不仅仅是当前的key，还有从上到下的key都要存储;selectedKey在公共表单，公共表单的父级
    getMenuData(routes=[]) {
        const menuData = [];
        //循环routes
        for(let item of routes) {
          //没有权限，不显示子菜单
          if(item.meta && item.meta.authority && !check(item.meta.authority)) {
            break;
          }
          // console.log('当前正在循环的路由',item)
          //如果路由有name值，并且hideInMenu标记位不是true时
          if(item.name && !item.hideInMenu) {
              //解构，不改变原始值
              const newItem = { ...item };
              delete newItem.children;
              //item有children,并且children不隐藏
              if(item.children && !item.hideChildrenMenu) {
                  //递归的方式,之前传过来的parentKeys，当前的path，作为下一级的parentKeys
                  newItem.children = this.getMenuData(item.children)
              } else {
                this.getMenuData(item.children)
              }
              menuData.push(newItem);
          } else if (!item.hideInMenu && !item.hideChildrenMenu && item.children) {
              menuData.push(...this.getMenuData(item.children))
          }
        }
        routes.forEach( item => {
      
        });
        // console.log('当前的menuData值',menuData)
        return menuData;
    }
  }
}
</script>