<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

/*
 * VR看房
 * */

// 画布
let container = ref<any>(null)

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
// 设置相机位置
camera.position.z = 0.1
// 相机添加到场景中
scene.add(camera)

// 物体
const boxGeometry = new THREE.BoxGeometry(20, 20, 20)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const box = new THREE.Mesh(boxGeometry, material)
// scene.add(box)

let arr = ['4_l', '4_r', '4_u', '4_d', '4_b', '4_f']

let boxMaterial = arr.map((item) => {
  let texture = new THREE.TextureLoader().load(`/src/static/imgs/living/${item}.jpg`)
  if (item == '4_u' || item == '4_d') {
    texture.rotation = Math.PI
    texture.center = new THREE.Vector2(0.5, 0.5)
  }
  return new THREE.MeshBasicMaterial({ map: texture })
})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.geometry.scale(1, 1, -1)
scene.add(box)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

// gui
let gui = new dat.GUI()

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 600)
let controls = ref<any>(null)

const render = () => {
  requestAnimationFrame(render)
  controls.value.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  // 创建轨道控制器
  controls.value = new OrbitControls(camera, renderer.domElement)
  // 设置控制器阻尼
  controls.value.enableDamping = true
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
