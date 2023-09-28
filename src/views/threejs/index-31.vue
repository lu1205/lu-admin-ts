<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
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
const sphereGeometry = new THREE.SphereGeometry(5, 50, 50)
const loader = new RGBELoader()
loader.load('/src/static/imgs/hdr/Living.hdr', (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture })
  const sphere = new THREE.Mesh(sphereGeometry, material)
  sphere.geometry.scale(1, 1, -1)
  scene.add(sphere)
})

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

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
