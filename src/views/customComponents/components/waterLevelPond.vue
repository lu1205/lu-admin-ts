<template>
  <div class="waterLevelPond">
    <div class="wave"></div>
    <div
      v-for="(item, index) in waveNum"
      :key="item"
      class="wave-mask"
      :style="{
        top: getTop,
        backgroundColor: waveColor,
        opacity: getOpacity(index),
        animationDuration: getAnimationDuration(index)
      }"
    ></div>
    <div class="tips">
      <div class="tips-value">{{ config.data + '%' }}</div>
      <div v-if="extraText">{{ extraText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return { data: 0 }
    }
  },
  waveNum: { type: Number, default: 1 },
  waveColor: { type: String, default: '#62BAF5' },
  extraText: { type: String, default: '' }
})

const getTop = computed(() => {
  if (props.config.data <= 100 && props.config.data >= 0) {
    return `${100 - props.config.data}%`
  } else {
    return '0'
  }
})

const getOpacity = computed(() => {
  return function (index: number) {
    if (props.waveNum > 5 || props.waveNum < 0) {
      return 1
    } else {
      return 1 - 0.2 * index
    }
  }
})
const getAnimationDuration = computed(() => {
  return function (index: number) {
    return `${10 + 4 * index}s`
  }
})
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.waterLevelPond {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: transparent;
  border: 3px solid #0471ba;
  border-radius: 50%;
}

.wave {
  position: relative;
  background-color: red;
  box-shadow: 1px 3px 3px 0 rgb(139 139 139 / 82.2%);
}

.wave-mask {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 20;
  width: 200%;
  height: 200%;
  background-color: rgb(98 186 245 / 100%);
  border-radius: 39%;
  transform: translate(-50%, -0%) rotate(0);
  animation: to-rotate 10s linear infinite;
}

@keyframes to-rotate {
  50% {
    transform: translate(-50%, 0%) rotate(180deg);
  }

  100% {
    transform: translate(-50%, 0%) rotate(360deg);
  }
}

.tips {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: center;
  color: #fff;
  transform: translate(-50%, -50%);
  flex-direction: column;

  .tips-value {
    margin-bottom: 4px;
    font-size: 22px;
    color: #ffc300;
  }
}
</style>
