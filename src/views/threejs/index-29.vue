<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import img1 from '@/static/textures/environmentMaps/1/px.jpg'
import { DirectionalLight, PointLight, SpotLight } from 'three'
import * as dat from 'dat.gui'

/*
 * 灯光与阴影
 * 1.材质满足能狗对光照有反应
 * 2.设置渲染器开启阴影的计算, renderer.shadowMap.enabled = true
 * 3.设置光照投射阴影, directionalLight.castShadow = true
 * 4.设置物体投射阴影, sphere.castShadow = true
 * 5.设置物体接收阴影, plane.receiveShadow = true
 * */

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
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 设置物体投射阴影
sphere.castShadow = true
scene.add(sphere)

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(50, 50)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 设置平面接受阴影
plane.receiveShadow = true
scene.add(plane)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

// 发光球
const lightBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
lightBall.position.set(2, 2, 2)

// 点光源
const pointLight = new PointLight(0xff0000, 1)
// 亮度
// pointLight.position.set(5, 5, 5)
// 开启投射阴影
pointLight.castShadow = true
// 设置阴影贴图的模糊度
pointLight.shadow.radius = 20
// 设置阴影贴图的分辨率
pointLight.shadow.mapSize.set(512, 512)

pointLight.distance = 0
pointLight.decay = 1

lightBall.add(pointLight)

scene.add(lightBall)

// gui
let gui = new dat.GUI()

gui.add(sphere.position, 'x').min(-5).max(5).step(0.1).name('沿X轴移动球')

gui.add(pointLight, 'distance').min(0).max(10).step(0.01).name('光的距离线性衰减')

gui.add(pointLight, 'decay').min(0).max(5).step(0.01).name('光照距离衰减')

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
renderer.setSize(800, 600)
// 是否使用物理上正确的光照模式
renderer.physicallyCorrectLights = true

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 设置时钟
const clock = new THREE.Clock()

const render = () => {
  let time = clock.getElapsedTime()
  lightBall.position.x = Math.sin(time) * 3
  lightBall.position.z = Math.cos(time) * 3
  lightBall.position.y = 2 + Math.sin(time * 5)
  requestAnimationFrame(render)
  controls.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  console.log('controls', renderer.domElement)
  // container.value = document.getElementById('container') as HTMLElement
  container.value.appendChild(renderer.domElement)
  // renderer.render(scene, camera)

  render()
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
}
</style>
