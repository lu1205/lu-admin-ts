<script setup lang="ts">
import { Icon, addIcon } from '@iconify/vue'
addIcon('mdi:account-box', {
  body: '<path d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" fill="currentColor"/>',
  width: 24,
  height: 24
})
</script>
<template>
  <div>
    <h1>Iconify</h1>
    <div><Icon style="font-size: 20px" icon="material-symbols:10k" /></div>
    <div><Icon style="font-size: 20px" icon="mdi:account-box" /></div>
    <div><Icon style="font-size: 20px" icon="ri:24-hours-fill" /></div>
    <div><Icon style="font-size: 20px" icon="ri-archive-2-line" /></div>
  </div>
</template>
<style scoped lang="scss"></style>
