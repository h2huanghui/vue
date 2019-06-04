<template>
 <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
    <template v-slot:handle>
      <div class="setting-drawer-handle" @click="visible = !visible">
      <a-icon
      :type="visible ? 'close' : 'setting'"
      ></a-icon>
      </div>
    </template>
    <div>
      <h2>整体风格定制</h2>
      <a-radio-group
        :value="$route.query.navTheme || 'dark'"
        @change="e => handleSettingChange('navTheme', e.target.value)">
        <a-radio value="dark">黑色</a-radio>
        <a-radio value="light">白色</a-radio>
      </a-radio-group>

      <h2>导航模式</h2>
      <a-radio-group
      :value="$route.query.navLayout || 'left'"
      @change="e => handleSettingChange('navLayout', e.target.value)">
        <a-radio value="left">左侧</a-radio>
        <a-radio value="top">顶部</a-radio>
      </a-radio-group>

    </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    onClose() {
      this.visible = false
    },
    handleSettingChange(type,value) {
      //query方式传参
      //this.$router.query,[type]:value等价于Object.assign({},this.$router.query, [type]:value)
      //$router为VueRouter实例，导航到不同URL
      //$route为当前router跳转对象，里面可以获取name、path、query、params
      //type是字符串，加中括号就作为变量解析
      this.$router.push({query: { ...this.$route.query, [type] : value}})
    }
  },
}
</script>

<style lang="less" src="./index.less"></style>
