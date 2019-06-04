<template>
    <!-- <div id="main" style="height: 100px"></div> -->
    <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts/lib/echarts"
import "echarts/lib/chart/bar"
import　"echarts/lib/component/title"

import debounce from "lodash/debounce"
import { addListener, removeListener} from "resize-detector"
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.resize = debounce(this.resize, 300)
  },
  watch: {
    options: function(val) {
      this.chart.setOption(val)
    }
    //深拷贝
    // options: {
    //   handler(val) {
    //     this.chart.setOption(val)
    //   },
    //   deep: true
    // }
  },
  mounted() {
    // initialize echarts instance with prepared DOM
    //可以使用getElementById
    // var myChart = echarts.init(document.getElementById('main'));
    //也可以使用ref
    this.chart = echarts.init(this.$refs.chartDom);
    addListener(this.$refs.chartDom, this.resize)
    // draw chart
    this.renderChart();
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    //销毁echarts实例
    this.chart.dispose();
    this.echarts = null;
  },
  methods: {
    resize() {
      console.log('resize')
      this.chart.resize()
    },
    renderChart() {
       this.chart.setOption(this.options);
    }
  }
}
</script>

<style>

</style>
