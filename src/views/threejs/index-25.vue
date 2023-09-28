<template>
  <div style="width: 100%; height: 100%">
    <div>加载进度: {{ percentage }}%</div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import img1 from '@/static/textures/environmentMaps/1/px.jpg'
import { DirectionalLight } from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// 加载hdr环境图
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('/src/static/textures/hdr/002.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})

let percentage = ref<number | string>(0)

// 画布
let container = ref<any>(null)

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
// 相机添加到场景中
scene.add(camera)

// 物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.1
})
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)

// 灯光
// 环境光
const light = new THREE.AmbientLight('0xffffff', 0.5)
// 平行光
const directionalLight = new DirectionalLight('0xffffff', 1)
directionalLight.position.set(5, 5, 5)
scene.add(light)
scene.add(directionalLight)

// 添加坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

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
  renderer.render(scene, camera)
  render()
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>
