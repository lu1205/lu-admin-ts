<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入GUI
import * as dat from 'dat.gui'
// 导入动画库
import gsap from 'gsap'

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

const gui = new dat.GUI()
gui
  .add(box.position, 'x')
  .min(0)
  .max(5)
  .step(0.01)
  .name('移动X轴')
  .onChange((v: number) => {
    // console.log(v)
  })
  .onFinishChange((v: number) => {
    console.log('停止移动', v)
  })
gui
  .add(box.position, 'y')
  .min(0)
  .max(5)
  .step(0.01)
  .name('移动Y轴')
  .onChange((v: number) => {
    console.log(v)
  })
gui
  .add(box.position, 'z')
  .min(0)
  .max(5)
  .step(0.01)
  .name('移动Z轴')
  .onChange((v: number) => {
    console.log(v)
  })

let params = {
  color: '#ffffff',
  fnx: () => {
    // 盒子运动
    gsap.to(box.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
  },
  fny: () => {
    // 盒子运动
    gsap.to(box.position, { y: 5, duration: 2, yoyo: true, repeat: -1 })
  },
  fnz: () => {
    // 盒子运动
    gsap.to(box.position, { z: 5, duration: 2, yoyo: true, repeat: -1 })
  }
}
gui.addColor(params, 'color').onChange((v: string) => {
  console.log('颜色值被修改：', v)
  box.material.color.set(v)
})

gui.add(box, 'visible').name('是否显示')

gui.add(params, 'fnx').name('沿X轴移动')

let folder = gui.addFolder('设置盒子移动的综合操作')
folder.add(params, 'fnx').name('沿X轴移动')
folder.add(params, 'fny').name('沿Y轴移动')
folder.add(params, 'fnz').name('沿Z轴移动')

gui.add(box.material, 'wireframe').name('设置线框')

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
