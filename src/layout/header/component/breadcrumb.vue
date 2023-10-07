<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
let levelList = ref([])

const getBreadcrumb = () => {
  levelList.value = router.currentRoute.value.matched.filter((item) => {
    if (item.path !== '/home') return item
  })
}
getBreadcrumb()
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)
const handleBreadcrumb = (val) => {
  let path = val.path === '/' ? val.redirect : ''
  path =
    path ||
    (val.redirect ? val?.children.length > 0 && val.children[0].path : val.redirect) ||
    val.path
  return { path: path }
}
</script>

<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="index"
      :to="handleBreadcrumb(item)"
    >
      <p>
        {{ item.meta.title }}
      </p>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
