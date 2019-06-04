<script>
import { check } from "../utils/auth.js"
export default {
  functional: true,
  props: {
    authority: {
        type: Array,
        required: true //必须传递
    }
  },
  render(h, context) {
      //context里面有这两个属性
      const { props, scopedSlots } = context
      //在<template>中使用slot-scope，在render()中使用scopedSlots
      return check(props.authority) ? scopedSlots.default() : null
  }
}
</script>

<style>

</style>
