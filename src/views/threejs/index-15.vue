<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import img1 from '@/static/textures/door/color.jpg'
import img2 from '@/static/textures/minecraft.png'
let container = ref<any>(null)

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000)
camera.position.set(0, 0, 10)
scene.add(camera)

// 纹理
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load(img2)
console.log(colorTexture)

// 纹理显示设置
// colorTexture.magFilter = THREE.NearestFilter
// colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.LinearFilter
colorTexture.minFilter = THREE.LinearFilter

// 物体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const boxMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: colorTexture
})
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
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>
