<template>
  <div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let container = ref<any>(null)

/*
 * Clock：用于跟踪时间
 * */

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

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 600)

// 设置时钟
let clock = new THREE.Clock()
const render = (time: number) => {
  //  获取时钟运行时长
  // let t = clock.getElapsedTime()
  // console.log('时钟运行总时长', t)
  // 获取两次时钟运行间隔
  let deltaTime = clock.getDelta()
  // 也是每帧的间隔
  console.log('时钟运行间隔', deltaTime)

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(() => {
  // container.value = document.getElementById('container')
  container.value.appendChild(renderer.domElement)
  render()
  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
})
</script>

<style scoped lang="scss">
#container {
  width: 800px;
  height: 600px;
}
</style>
