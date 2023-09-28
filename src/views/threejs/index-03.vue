<template>
  <div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

// 修改物体的位置
// box.position.set(1, 0, 0)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 600)
let flag = ref(true)

onMounted(() => {
  // container.value = document.getElementById('container')
  container.value.appendChild(renderer.domElement)
  render()
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
})
const render = () => {
  if (box.position.x >= 5) {
    flag.value = false
    box.position.x -= 0.1
  }
  if (box.position.x <= 0) {
    flag.value = true
    box.position.x += 0.1
  }
  if (flag.value) {
    box.position.x += 0.1
  } else {
    box.position.x -= 0.1
  }
  renderer.render(scene, camera)
  requestAnimationFrame(() => {
    render()
  })
}
</script>

<style scoped lang="scss">
#container {
  width: 800px;
  height: 600px;
}
</style>
