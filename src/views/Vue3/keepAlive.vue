<template>
  <div class="container">
    <div>
      <p>使用setup语法糖时，需要传入组件本身，不能通过组件名动态渲染组件</p>
    </div>
    <div>
      <el-button type="primary" @click="change('A')">显示A</el-button>
      <el-button type="primary" @click="change('B')">显示B</el-button>
    </div>
    <!--    <keep-alive>-->
    <!--      <component :is="show" />-->
    <!--    </keep-alive>-->
    <keep-alive>
      <A ref="refA" title="这是prop传递的title" v-if="show === 'A'" />
      <B v-else />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import A from './KeepAliveComponents/A.vue'
import B from './KeepAliveComponents/B.vue'
const show = ref('A')
const change = (value: any) => {
  show.value = value
}
const refA = ref()
onMounted(() => {
  console.log(refA.value)
  console.log(show)
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>
