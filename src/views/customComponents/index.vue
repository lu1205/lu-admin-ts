<template>
  <div class="container">
    <div style=" display: flex; align-items: center;width: 200px; height: 200px">
      <waterLevelPond
        style=" position: relative; overflow: hidden;width: 96px; height: 96px"
        :config="config"
        :waveNum="2"
        waveColor="#62BAF5"
        extraText="诊间支付占比"
      />
    </div>
    <div style="width: 200px; height: 200px">
      <process :data="86.56">
        <div style="text-align: center">
          <div>86.56%</div>
          <div>合格率</div>
        </div>
      </process>
    </div>
    <div>
      <el-button @click="showPreview = true">预览图片</el-button>
    </div>

    <previewImg v-if="showPreview" :imgList="imgList" @close="showPreview = false" />
  </div>
</template>
<script setup lang="ts">
import waterLevelPond from './components/waterLevelPond.vue'
const config = reactive({
  data: 56
})
import process from './components/process.vue'
import previewImg from './components/previewImg.vue'
let showPreview = ref(false)
const imgList = [
  'https://www.0551cx.com/publicFileUpload/medicareReimburse/reimburse/ad726e65-1311-40df-a485-8284eff43968.jpg',
  'https://img.keaitupian.cn/newupload/03/1678093984384880.jpg',
  'https://img.keaitupian.cn/newupload/03/1678094011180397.jpg'
]
</script>
<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
}
</style>
