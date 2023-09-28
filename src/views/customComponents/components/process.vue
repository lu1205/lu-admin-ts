<template>
  <div class="process-box">
    <svg width="100" height="100" viewBox="0 0 200 200">
      <circle fill="none" cx="100" cy="100" r="80" :stroke="getBgColor" stroke-width="14" />
      <path
        fill="none"
        :d="d"
        :stroke="activeColor"
        stroke-width="14"
        :stroke-dasharray="getDasharray"
      />
    </svg>
    <div v-if="$slots" class="slotText">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: { type: Number, default: 0 },
  bgColor: { type: String, default: '#62BAF5' },
  activeColor: { type: String, default: '#43CF7C' }
})
const girth = 2 * Math.PI * 80
const d = 'm 100, 20 a 80, 80 0 0 1 0, 160 a 80, 80 0 0 1 0, -160'
const getBgColor = computed(() => {
  return props.bgColor
})

const getDasharray = computed(() => {
  return `${(props.data / 100) * girth}, ${girth}`
})
</script>

<style scoped lang="scss">
.process-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .slotText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
