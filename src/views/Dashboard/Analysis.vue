<template>
    <div>
      {{$t('message')["app.dashboard.analysis.timeLabel"]}}
        <a-date-picker/>
        <Chart :options="chartOptions" style="height:400px"/>
        <pre v-highlightjs="chartCode"><code class="html"></code></pre>
    </div>
</template>

<script>
// import request from "../../utils/request"
import random from "lodash/random"
import Chart from "../../components/Chart"
import chartCode from "!!raw-loader!../../components/Chart"
export default {
  components: {
    Chart,
  },
  data() {
    return {
      chartOptions: {},
      chartCode
    }
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
    //   this.chartOptions.series[0].data = this.chartOptions.series[0].data.map(
    //     () => random(100)
    //   );
    //   //手动更新值
    //   this.chartOptions = {...this.chartOptions}
    this.getChartData();
    }, 3000)
  },
  methods: {
    getChartData: function() {
      this.$request({
        method: 'GET',
        url: '/api/dashboard/analysis',
        params: {
          ID: 12345
        }
      }).then( resp => {
          this.chartOptions = {
            title: {
              text: 'ECharts entry example'
            },
            tooltip: {},
            xAxis: {
              data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks']
            },
            yAxis: {},
            series: [{
              name: 'sales',
              type: 'bar',
              data: resp.data
            }]
          }
        }
      )
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style>

</style>
