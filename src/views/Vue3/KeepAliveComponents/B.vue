<template>
  <div>B组件</div>
  <div>
    <div>
      <el-button @click="add">add</el-button>
    </div>
    <p>{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
const count = ref(10)
const add = () => {
  count.value += 1
}
</script>
