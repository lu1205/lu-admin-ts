<template>
  <div>A组件</div>
  <div>
    <div>
      <el-button @click="add">add</el-button>
    </div>
    <p>{{ count }}</p>
    <p>{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['title'])
console.log(props)
const count = ref(10)
const add = () => {
  count.value += 1
}
// 向外暴露属性
defineExpose({ count })
</script>
