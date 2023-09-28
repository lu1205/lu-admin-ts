<template>
  <div class="container">
    <div>
      <div>
        <p>
          都可以通过给标签添加name属性，之后可以通过 .[name]-enter-active，
          .[name]-leave-active，.[name]-enter-from，.[name]-leave-to 来自定义动画
        </p>
      </div>
    </div>
    <div class="box">
      <div>
        <h2>transition</h2>
        <div>
          <p>如果不设置属性，需要通过 v-enter-active 等来设置动画</p>
          <p>
            主要用于
            <span style="color: red">一个</span>
            元素或组件进入或离开DOM时的动画，如：v-if,v-show渲染的元素，或由特殊元素 component
            切换的动态组件
          </p>
          <p>仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素</p>
        </div>
        <transition>
          <div v-if="show">transition</div>
        </transition>
        <div>
          <el-button type="primary" @click="show = !show">切换</el-button>
        </div>
      </div>
      <div>
        <h2>transition-group</h2>
        <div>
          <p>默认不会渲染当前元素，可以通过设置tag来指定作为元素来渲染</p>
          <p>主要用于 v-for 渲染的元素插入、移动或移除时的动画</p>
        </div>
        <transition-group name="list" tag="div">
          <div v-for="item in list" :key="item.id">{{ item.name }}</div>
        </transition-group>
        <div>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="remove">移除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
let list = ref<any[]>([])
for (let i = 0; i < 50; i++) {
  list.value.push({ name: '张三' + i, id: i })
}
const add = () => {
  let id = list.value.length
  list.value.push({ name: '张三' + id, id: id })
}
const remove = () => {
  list.value.pop()
}
const show = ref(false)
</script>
<style scoped lang="scss">
.container {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .box {
    display: flex;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
