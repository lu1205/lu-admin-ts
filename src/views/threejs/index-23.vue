<template>
  <div style="width: 100%; height: 100%">
    <div>加载进度: {{ percentage }}%</div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import img1 from '@/static/textures/door/color.jpg'
import img2 from '@/static/textures/minecraft.png'
import img3 from '@/static/textures/door/alpha.jpg'
import img4 from '@/static/textures/door/ambientOcclusion.jpg'
import img5 from '@/static/textures/door/height.jpg'
import img6 from '@/static/textures/door/roughness.jpg'
import img7 from '@/static/textures/door/metalness.jpg'
import img8 from '@/static/textures/door/normal.jpg'
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

// 加载管理器
const loadManager = new THREE.LoadingManager(
  function () {
    console.log('complete')
  },
  function (url, itemsLoaded, itemsTotal) {
    console.log('progress:', url, itemsLoaded, itemsTotal)
    percentage.value = ((itemsLoaded / itemsTotal) * 100).toFixed(2)
    console.log('loaded:', percentage.value + '%')
  },
  function (url) {
    console.log('Error:', url)
  }
)

// 纹理加载器
const textureLoader = new THREE.TextureLoader(loadManager)
// 加载纹理
// 纹理图加载进度
// const colorTexture = textureLoader.load('/src/static/textures/door/color.jpg')
const colorTexture = textureLoader.load(img1)
const colorAlphaTexture = textureLoader.load(img3)
const colorAoTexture = textureLoader.load(img4)
const colorHeightTexture = textureLoader.load(img5)
const colorRoughnessTexture = textureLoader.load(img6)
const colorMetalnessTexture = textureLoader.load(img7)
const colorNormalTexture = textureLoader.load(img8)
console.log(colorTexture)

// 物体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
// 材质
const boxMaterial = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: colorTexture,
  alphaMap: colorAlphaTexture,
  transparent: true,
  aoMap: colorAoTexture,
  aoMapIntensity: 1,
  displacementMap: colorHeightTexture,
  displacementScale: 0.1,
  // 粗糙度，数字越小越光滑
  roughness: 1,
  // 粗糙度贴图
  roughnessMap: colorRoughnessTexture,
  // 金属度，数字1为金属，0为非金属，中间值表示生锈的金属
  metalness: 0.4,
  // 金属度贴图
  metalnessMap: colorMetalnessTexture,
  // 法线贴图
  normalMap: colorNormalTexture,
  side: THREE.DoubleSide
})
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)
boxGeometry.setAttribute('uv2', new THREE.BufferAttribute(boxGeometry.attributes.uv.array, 2))

const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(planeGeometry, boxMaterial)
plane.position.set(1, 0, 0)
scene.add(plane)
planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

// 灯光
// 环境光
const light = new THREE.AmbientLight('0xffffff', 0.5)
// 平行光
const directionalLight = new DirectionalLight('0xffffff', 1)
directionalLight.position.set(5, 5, 5)
scene.add(light)
scene.add(directionalLight)

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
