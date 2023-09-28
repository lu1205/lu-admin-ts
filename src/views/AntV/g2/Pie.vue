<template>
  <div class="out-box">
    <h2>饼图</h2>
    <div id="c1" class="c1"></div>
  </div>
</template>

<script lang="ts" setup>
import { Chart } from '@antv/g2'

const data1 = [
  { type: '男性', value: 56.4 },
  { type: '女性', value: 43.6 }
]
onMounted(() => {
  const chart1 = new Chart({
    container: 'c1',
    width: 500,
    height: 500
  })
  chart1.data(data1)
  chart1.legend(false)
  chart1.tooltip({
    showMarkers: false
  })
  chart1.coordinate('theta', {
    radius: 0.8,
    innerRadius: 0.5
  })

  chart1.interval().adjust('stack').position('value').color('type', ['#0a9afe', '#eceef1']).style({
    opacity: 1
  })

  chart1.annotation().text({
    position: ['50%', '50%'],
    content: data1[0].type,
    style: {
      fontSize: 12,
      fill: '#8c8c8c',
      fontWeight: 300,
      textBaseline: 'bottom',
      textAlign: 'center'
    },
    offsetY: -12
  })
  chart1.annotation().text({
    position: ['50%', '50%'],
    content: data1[0].value,
    style: {
      fontSize: 18,
      fill: '#000',
      fontWeight: 500,
      textAlign: 'center'
    },
    offsetY: 10
  })
  chart1.interaction('element-active', {
    // start: [{ trigger: 'plot:mouseenter', action: 'tooltip:show' }]
  })
  chart1.render()
})
</script>

<style scoped lang="scss">
.out-box {
  display: flex;
  flex-direction: column;

  .c1 {
    align-self: center;
    flex: auto;
    height: 100%;
  }
}
</style>
