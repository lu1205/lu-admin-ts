<template>
  <div id="container" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import earthImg from '@/static/img/earth_bg.png'

const container = ref<any>(null)
let scene: any
let ModalGroup: any
let camera: any
let renderer: any

// 场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene()
  // 在场景中添加雾的效果，Fog参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
  scene.fog = new THREE.Fog(0x000000, 0, 10000)
}

// 初始化球体模型
const initSphereModal = () => {
  //几何体
  const sphereGeometry = new THREE.SphereGeometry(50, 100, 50)
  //材质
  const sphereMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(earthImg),
    blendDstAlpha: 1
  })
  //模型
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
  ModalGroup.add(sphereMesh)
}

// 初始矩形模型
const initBoxModal = () => {
  //几何体
  const boxGeometry = new THREE.BoxGeometry(100, 100, 100)
  //材质
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000 //0xff0000设置材质颜色为红色
  })
  //模型
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
  boxMesh.position.set(0, -100, 100)
  ModalGroup.add(boxMesh)
}

// 初始矩形模型
const initModal = () => {
  ModalGroup.position.set(-400, 200, -200)
  scene.add(ModalGroup)
}

//光源
const initLight = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  // 右下角点光源
  const light_rightBottom = new THREE.PointLight(0x0655fd, 5, 0)
  light_rightBottom.position.set(0, 100, -200)
  scene.add(light_rightBottom)
  scene.add(ambientLight)
}
// 相机
const initCamera = () => {
  // 创建相机
  camera = new THREE.PerspectiveCamera(30, 600 / 400, 1, 30000)
  camera.position.set(600, 10, 10)
  camera.lookAt(scene.position)
}

// 渲染器
const initRenderer = () => {
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(600, 400)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0xb9d3ff, 1)
  container.value.appendChild(renderer.domElement)
  renderer.render(scene, camera)
}

const init = () => {
  // container.value = document.getElementById('container') as any
  ModalGroup = new THREE.Group()
  initScene()
  initSphereModal()
  // initBoxModal()
  initModal()
  initLight()
  initCamera()
  initRenderer()
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
#container {
  width: 800px;
  height: 600px;
}
</style>
