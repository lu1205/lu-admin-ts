<template>
  <div>
    <p>12</p>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'

let container = ref<any>(null)

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 600)

onMounted(() => {
  // container.value = document.getElementById('container')
  container.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)
})
</script>

<style scoped lang="scss">
#container {
  width: 800px;
  height: 600px;
}
</style>
