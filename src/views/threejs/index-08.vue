<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'

let container = ref<any>(null)

/*
 * GSAP:
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

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 设置动画
gsap.to(box.position, {
  x: 5,
  duration: 5,
  ease: 'power1.out',
  // 循环次数
  repeat: -1,
  // 往返
  yoyo: true,
  // 延迟
  delay: 1,
  onComplete: () => {
    console.log('animation complete')
  }
})
gsap.to(box.rotation, {
  x: 2 * Math.PI,
  duration: 5,
  ease: 'power1.in',
  // 循环次数,-1表示无限
  repeat: -1,
  // 往返
  yoyo: true,
  // 延迟,单位s
  delay: 1
})
window.addEventListener('dblclick', () => {
  // 全屏
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    renderer.domElement.requestFullscreen()
  }
})

const render = () => {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

onMounted(() => {
  // container.value = document.getElementById('container') as HTMLElement
  container.value.appendChild(renderer.domElement)
  render()
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>
