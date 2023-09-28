<template>
  <div>
    <p>12</p>
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import earthImg from '@/static/img/earth_bg.png'

let container = ref<any>(null)
let scene: any
let ModalGroup: any
let camera: any
let renderer: any
// 定义相机输出画布的尺寸(单位:像素px)
const width = 600 //宽度
const height = 400 //高度

// 场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene()
}

// 初始矩形模型
const initBoxModal = () => {
  //几何体
  const boxGeometry: any = new THREE.BoxGeometry(100, 100, 100)
  for (let i = 0; i < boxGeometry.faces.length; i += 2) {
    let hex = Math.random() * 0xffffff
    boxGeometry.faces[i].color.setHex(hex)
    boxGeometry.faces[i + 1].color.setHex(hex)
  }
  //材质
  const boxMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true
    // color: 0x0000ff //设置材质颜色
    // transparent: true, //开启透明
    // opacity: 0.5 //设置透明度
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

// 相机
const initCamera = () => {
  // 创建相机
  camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000)
  camera.position.set(100, -10, 0)
  camera.lookAt(0, 0, 0)
  // camera.lookAt(scene.position)
}

// 渲染器
const initRenderer = () => {
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0xb9d3ff, 1)
  renderer.render(scene, camera)
  container.value.appendChild(renderer.domElement)
}

const init = () => {
  // container.value = document.getElementById('container') as any
  ModalGroup = new THREE.Group()
  initScene()
  initBoxModal()
  initModal()
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
