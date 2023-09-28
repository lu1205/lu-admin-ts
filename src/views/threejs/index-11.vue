<template>
  <div style="width: 100%; height: 100%">
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

for (let i = 0; i < 50; i++) {
  const boxGeometry = new THREE.BufferGeometry()
  const pointArr = new Float32Array(9)
  for (let j = 0; j < 9; j++) {
    pointArr[j] = Math.random() * 10 - 5
  }
  boxGeometry.setAttribute('position', new THREE.BufferAttribute(pointArr, 3))
  const color = new THREE.Color(Math.random(), Math.random(), Math.random())
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: Math.random()
  })
  const box = new THREE.Mesh(boxGeometry, boxMaterial)
  console.log(box)
  scene.add(box)
}

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 600)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

const render = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(() => {
  // container.value = document.getElementById('container') as HTMLElement
  container.value.appendChild(renderer.domElement)
  render()

  console.log('domElement', renderer.domElement)
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>
