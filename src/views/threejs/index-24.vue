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

// cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader()
const envMapTexture = cubeTextureLoader.load([
  img1,
  '/src/static/textures/environmentMaps/1/nx.jpg',
  '/src/static/textures/environmentMaps/1/py.jpg',
  '/src/static/textures/environmentMaps/1/ny.jpg',
  '/src/static/textures/environmentMaps/1/pz.jpg',
  '/src/static/textures/environmentMaps/1/nz.jpg'
])

// 物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0,
  envMap: envMapTexture
})
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)

// 场景添加背景
scene.background = envMapTexture
// 场景添加默认的环境贴图(不会覆盖上方envMap属性的值)
scene.environment = envMapTexture

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
