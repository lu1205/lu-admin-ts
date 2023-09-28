<template>
  <div class="out-box" ref="outbox">
    <div class="img-box">
      <img
        :style="{
          width: '100%',
          height: '100%',
          transform: `scale(${imgStyle.scale}) rotate(${imgStyle.deg}deg)`,
          marginLeft: imgStyle.offsetX + 'px',
          marginTop: imgStyle.offsetY + 'px'
        }"
        class="imgStyle"
        ref="img"
        @mousedown="moveImg"
        @mousewheel="handleZoomImg"
        :src="imgUrl"
        alt=""
      />
    </div>
    <i style="font-size: 30px" class="iconfont icon-bg-close close" @click="close"></i>
    <div class="bottom" @mousedown="moveBox">
      <div style="font-size: 30px">
        <i class="iconfont icon-bg-left" @click="preImg"></i>
        <i class="iconfont icon-bg-right" @click="nextImg"></i>
        <i class="iconfont icon-reset" @click="reset"></i>
        <i class="iconfont icon-nishizhenxuanzhuan" @click="rotate(-90)"></i>
        <i class="iconfont icon-shunshizhenxuanzhuan" @click="rotate(90)"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/*
 * imgList: 图片链接数组
 * index: 默认显示图片的索引，默认为0
 * */
const props = defineProps({
  imgList: { type: Array, required: true },
  index: { type: Number, default: 0 }
})
let index = ref(props.index)
let imgUrl = ref(props.imgList[index.value] as string)
let imgStyle = reactive({
  deg: 0,
  scale: 1,
  offsetX: 0,
  offsetY: 0
})

const rotate = (deg: number) => {
  imgStyle.offsetX = 0
  imgStyle.offsetY = 0
  if (imgStyle.deg + deg >= 360 || imgStyle.deg + deg <= -360) {
    imgStyle.deg = 0
  } else {
    imgStyle.deg += deg
  }
  getImgSize()
}
const img = ref<any>(null)
const getImgSize = () => {
  if (
    imgStyle.deg === -90 ||
    imgStyle.deg === -270 ||
    imgStyle.deg === 90 ||
    imgStyle.deg === 270
  ) {
    let width = img.value.width
    let height = img.value.height
    let scale = height / width
    imgStyle.scale = scale
  } else {
    imgStyle.scale = 1
  }
}
/*
 * 拖动图片
 * */
const moveImg = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  let startX = e.pageX
  let startY = e.pageY
  let { offsetX, offsetY } = imgStyle
  document.onmousemove = (ev) => {
    requestAnimationFrame(() => {
      imgStyle.offsetX = offsetX + ev.pageX - startX
      imgStyle.offsetY = offsetY + ev.pageY - startY
    })
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
/*
 * 滚轮滚动
 * */
const handleZoomImg = (evt: any) => {
  evt = evt || window.event
  if (evt.stopPropagation) {
    // 这是取消冒泡,阻止浏览器滚动事件
    evt.stopPropagation()
  } else {
    evt.cancelBubble = true
  }
  if (evt.preventDefault) {
    // 这是取消默认行为，要弄清楚取消默认行为和冒泡不是一回事
    evt.preventDefault()
  } else {
    evt.returnValue = false
  }
  let delta = 0
  if (evt.wheelDelta) {
    delta = evt.wheelDelta / 120
    // if (window?.opera) delta = -delta
  } else if (evt.detail) {
    delta = -evt.detail / 3
  }
  if (delta > 0) {
    imgStyle.scale = imgStyle.scale * 1.1
  } else if (delta < 0) {
    // 宽度小于100，停止缩小
    if (img.value.width * imgStyle.scale < 100) return
    imgStyle.scale = imgStyle.scale * 0.9
  }
}
const reset = () => {
  imgStyle.deg = 0
  imgStyle.scale = 1
  imgStyle.offsetX = 1
  imgStyle.offsetY = 1
}
const preImg = () => {
  reset()
  if (index.value === 0) {
    index.value = props.imgList.length - 1
  } else {
    index.value--
  }
  imgUrl.value = props.imgList[index.value] as string
}
const nextImg = () => {
  reset()
  if (index.value === props.imgList.length - 1) {
    index.value = 0
  } else {
    index.value++
  }
  imgUrl.value = props.imgList[index.value] as string
}
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
const outbox = ref<any>(null)
/*
 * 拖动盒子
 * */
const moveBox = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  let startX = e.pageX
  let startY = e.pageY
  let { offsetLeft, offsetTop } = outbox.value
  document.onmousemove = (ev) => {
    outbox.value.style.left = offsetLeft + ev.pageX - startX + 'px'
    outbox.value.style.top = offsetTop + ev.pageY - startY + 'px'
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>
<style scoped lang="scss">
.out-box {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 50vw;
  height: 50vh;
  background-color: rgb(0 0 0 / 20%);

  .img-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;

    .imgStyle:hover {
      cursor: pointer;
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(55%, -55%);
    z-index: 999;
  }

  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: rgb(0 0 0 / 30%);
  }

  .bottom i {
    margin: 0 8px;
  }
}
</style>
