<script setup>
import { Fold, Expand } from '@element-plus/icons-vue'
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'
import { throttle } from '@/utils/common'

const { collapse } = storeToRefs(useSettingStore())
const handleChange = () => useSettingStore().changeCollapse()
onMounted(() => {
  window.addEventListener(
    'resize',
    throttle(
      () => {
        useSettingStore().setCollapse(document.body.clientWidth < 800)
      },
      1000,
      false
    )
  )
})
onUnmounted(() => {
  window.removeEventListener(
    'resize',
    throttle(
      () => {
        useSettingStore().setCollapse(document.body.clientWidth < 800)
      },
      200,
      false
    )
  )
})
</script>

<template>
  <div class="collapse-box" @click="handleChange">
    <el-icon size="20">
      <Expand v-if="collapse" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.collapse-box {
  display: flex;
  align-items: center;
  margin-right: 16px;
  height: 20px;
  cursor: pointer;
}
</style>
