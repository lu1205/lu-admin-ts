<template>
  <div>
    <div class="info">
      <div>说明：</div>
      <p>在创建图标是，需要在组件挂载之后，因为创建Chart对象是会获取DOM元素</p>
      <p>通过new Chart({})创建Chart 对象，参数为一个对象</p>
      <div>
        <p>对象的属性</p>
        <p>
          container:
          表示图标要挂载上页面的元素，可以直接写元素的id，或通过document.getElementById()获取
        </p>
        <p>autoFit: 表示是否自适应宽度，设置为 true 时，设置的 width 将不会生效</p>
        <p>width: 指定图标的宽度 height: 指定图标的高度 padding:</p>
        <p>padding: 指定图标的内边距，支持百分比写法，方式有以下几种：</p>
        <ul>
          <li>padding: [20, 30, 20, 30]</li>
          <li>padding: 20,</li>
          <li>padding: { top: 20, right: 30, bottom: 20, left: 30 },</li>
          <li>padding: 'auto',</li>
          <li>padding: [20, 'auto', 30, 'auto']</li>
        </ul>
        <p>appendPadding: 在 padding 的基础上在加 padding</p>
        <p>defaultInteractions: 配置图标默认交互方式</p>
        <p>renderer: 指定渲染引擎，默认 canvas。选项有 'canvas' 和 'svg'</p>
        <p>visible: 设置图标是否显示，默认为true</p>
      </div>
    </div>
    <hr />
    <h3>示例：</h3>
    <div class="c1-box" id="c1"></div>
  </div>
</template>
<script setup lang="ts">
import { Chart } from '@antv/g2'

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
] // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
onMounted(() => {
  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: 'c1', // 指定图表容器 ID
    autoFit: true,
    // width: 600, // 指定图表宽度
    height: 300, // 指定图表高度
    // 设置图表的内边距，支持如下几种设置方式：
    // 另外也支持设置百分比，如 padding: [ '20%', '30%' ]，该百分比相对于整个图表的宽高。
    padding: [20, 30, 20, 30]
    // padding: 20,
    // padding: { top: 20, right: 30, bottom: 20, left: 30 },
    // padding: 'auto',
    // padding: [20, 'auto', 30, 'auto']
  })
  // chart.forceFit()
  // Step 2: 载入数据源
  chart.data(data)
  chart.scale('sold', {
    alias: '这是数值',
    min: 0,
    max: 1000
  })
  // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  chart.interval().position('genre*sold')
  // Step 4: 渲染图表
  chart.render()
})
</script>

<style scoped lang="scss">
.info {
  overflow-y: auto;
  height: 40vh;
  font-size: 16px !important;
}

.c1-box {
  width: 100%;
  height: 400px;
}
</style>
