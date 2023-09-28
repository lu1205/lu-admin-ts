<template>
  <div id="e1" class="e1"></div>
</template>

<script lang="ts" setup>
import { BarChart } from 'echarts/charts'
import useEcharts from '../../hooks/useEcharts'

const { echarts } = useEcharts()
echarts.use([BarChart])
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
}
onMounted(() => {
  const myChart = echarts.init(document.getElementById('e1') as HTMLElement)
  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.e1 {
  width: 100%;
  height: 100%;
}
</style>
