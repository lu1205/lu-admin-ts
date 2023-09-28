<template>
  <div>
    <div>
      <p>
        watch和watchEffect默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。
        这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。
      </p>
      <p>
        如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post'选项
        如：watch(obj,callback,{flush: 'post'})，watchEffect(callback,{flush: 'post'})
      </p>
    </div>
    <div class="container">
      <div>
        <div>
          <h2>Watch</h2>
          <p>
            watch(source,callback,option)，watch是默认时懒执行的，只有监听的数据源发生变化才会执行
          </p>
          <ul>
            <li>
              <p>
                参数source: 侦听的数据源，可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter
                函数、或多个数据源组成的数组
              </p>
              <p>
                如：watch(x,()=>{})，watch(()=>x.value+y.value,()=>{})，watch([x,()=>x.value+y.value],()=>{})，
              </p>
              <p>
                当监听一个响应式对象时，在所有嵌套的变更时都会被触发，
                新值和旧值为同一个，因为它们是同一个对象！，只监听其中一个属性时，可以使用()=>obj.attr
              </p>
            </li>
            <li>
              <p>参数callback：回调函数</p>
            </li>
            <li>
              <p>参数option：配置对象{}</p>
              <p>如：deep: true，深度监听，flush: 'post'，在dom更新后执行回调，默认在dom更新之前</p>
            </li>
          </ul>
        </div>
        <div>
          <el-button @click="add">直接监听一个响应式对象</el-button>
          <el-button @click="add">直接监听一个响应式对象中的属性</el-button>
          <el-button @click="add">直接监听一个ref</el-button>
        </div>
        <div>{{ result }}</div>
      </div>
      <div>
        <div>
          <h2>watchEffect</h2>
          <p>watchEffect(callback,option)会立即执行一次</p>
          <ul>
            <li>参数callback： 回调函数</li>
            <li>
              <p>参数option：配置对象{}</p>
              <p>如：deep: true，深度监听，flush: 'post'，在dom更新后执行回调，默认在dom更新之前</p>
              <p>后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：</p>
            </li>
          </ul>
        </div>
        <div>{{ obj2 }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const obj = reactive({ count: 0 })
const result = reactive({
  newValue: 0,
  oldValue: 0
})

watch(obj, (newValue: any, oldValue: any) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
  result.newValue = newValue
  result.oldValue = oldValue
  // console.log(newValue, oldValue)
})

obj.count++
const add = () => {
  obj.count++
}

watch(
  () => obj.count,
  (newValue: any, oldValue: any) => {
    // 在嵌套的属性变更时触发
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // 因为它们是同一个对象！
    result.newValue = newValue
    result.oldValue = oldValue
    // console.log(newValue, oldValue)
  },
  {}
)
let count = ref(0)
watch(count, (newValue: any, oldValue: any) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
  result.newValue = newValue
  result.oldValue = oldValue
  // console.log(newValue, oldValue)
})

/*
 * ===========================================
 * */
// watchEffect
const result2 = reactive({
  newValue: 0,
  oldValue: 0
})
console.log(result2)
const obj2 = reactive({
  count: 0
})
watchEffect(
  () => {
    obj2.count++
    console.log(obj2)
  },
  {
    flush: 'post'
  }
)
setTimeout(() => {
  obj2.count++
}, 1000)
</script>
<style scoped lang="scss">
.container {
  display: flex;

  div:first-child {
    margin-right: 10px;
  }

  div {
    flex: 1;
  }
}
</style>
