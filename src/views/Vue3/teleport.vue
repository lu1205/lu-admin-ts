<template>
  <div class="container">
    <div>
      <div>
        <p>Teleport样式需要在需要挂载的元素页面或在当前元素定义，否则无样式</p>
        <p>当前实例为直接定义样式变量，之后通过v-bind进行绑定</p>
      </div>
      <el-button @click="open">打开</el-button>
    </div>
    <Teleport to="body">
      <div v-if="show" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh">
        <div :style="style">
          <h2>这是Teleport</h2>
          <div>
            <p>当前元素挂载到body上</p>
          </div>
          <div>
            <el-button @click="close">关闭</el-button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
let show = ref(false)
const open = () => {
  show.value = true
}
const close = () => {
  show.value = false
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}
</script>

<style scoped lang="scss">
// @fullWidth: 100%;

.container {
  // width: @fullWidth;
  width: 100%;
}
</style>
