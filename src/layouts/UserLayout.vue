<template>
    <div>
        <div class="desc">Any Design View Pro</div>
        <!-- 要在嵌套的出口中渲染组件，需要在VueRouter的参数中使用children配置 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {}
</script>

<style>
    .desc {
        text-align: center;
    }
</style>
