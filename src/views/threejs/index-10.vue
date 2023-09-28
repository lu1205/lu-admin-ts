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

// 添加物体
const boxGeometry = new THREE.BufferGeometry()
const pointArr = new Float32Array([
  -2.0, -1.0, 1.0, 2.0, -1.0, 1.0, 2.0, 1.0, 1.0, -2.0, 1.0, 1.0, -2.0, -1.0, 1.0, 2.0, 1.0, 1.0
])
boxGeometry.setAttribute('position', new THREE.BufferAttribute(pointArr, 3))
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

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
