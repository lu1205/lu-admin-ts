<template>
  <div style="width: 100%; height: 100%">
    <div id="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Water } from 'three/examples/jsm/objects/Water2'
// 导入gltf载入库
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as dat from 'dat.gui'

/*
 * 小岛
 * */

// 画布
let container = ref<any>(null)

// 创建场景
const scene = new THREE.Scene()

// 相机
let camera: any = null
// 初始化相机
const initCamera = () => {
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    2000
  )
  // 设置相机位置
  camera.position.set(50, 50, 200)
  // 更新摄像机宽高比
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  // 更新摄像机投影矩阵
  camera.updateProjectionMatrix()
  // 相机添加到场景中
  scene.add(camera)
}

// 灯光
let light: any = null
// 初始化灯光
const initLight = () => {
  // 灯光
  //   light = new THREE.AmbientLight(0xffffff, 0.5)
  light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-100, 100, 10)
  scene.add(light)
}

// 渲染器
let renderer: any = null
// 初始化渲染器
const initRenderer = () => {
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true,
    // 对数深度缓冲区
    logarithmicDepthBuffer: true
  })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
}

// 轨道控制器
let controls = ref<any>(null)
// 初始化轨道控制器
const initControls = () => {
  // 创建轨道控制器
  controls.value = new OrbitControls(camera, renderer.domElement)
  // 设置控制器阻尼
  controls.value.enableDamping = true
  container.value.appendChild(renderer.domElement)
}

const render = () => {
  requestAnimationFrame(render)
  controls.value.update()
  renderer.render(scene, camera)
}

// 初始化物体
const initGeometry = () => {
  // 物体
  const texture = new THREE.TextureLoader().load('/src/static/sky/sky.jpg')
  const skyGeometry = new THREE.SphereGeometry(1000, 50, 50)
  const skyMaterial = new THREE.MeshBasicMaterial({
    map: texture
  })
  skyGeometry.scale(1, 1, -1)
  const sky = new THREE.Mesh(skyGeometry, skyMaterial)
  scene.add(sky)

  const video = document.createElement('video')
  video.src = '/src/static/sky/sky.mp4'
  video.loop = true

  window.addEventListener('click', () => {
    if (video.paused) {
      video.play()
      let texture = new THREE.VideoTexture(video)
      skyMaterial.map = texture
      skyMaterial.map.needsUpdate = true
    }
  })

  // 载入环境纹理
  let rgbeLoader = new RGBELoader()
  rgbeLoader.loadAsync('/src/static/sky/050.hdr').then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })

  // 创建水面
  const waterGeometry = new THREE.CircleGeometry(300, 64)
  const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 1,
    // 手动引入水波纹图片
    normalMap0: new THREE.TextureLoader().load('/src/static/sky/water/Water_1_M_Normal.jpg'),
    normalMap1: new THREE.TextureLoader().load('/src/static/sky/water/Water_2_M_Normal.jpg')
  })
  water.position.y = 3
  water.rotation.x = -Math.PI / 2
  scene.add(water)

  // 添加小岛模型
  // 实例化gltf载入库
  const loader = new GLTFLoader()
  // 实例化draco载入库
  const dracoLoader = new DRACOLoader()
  // 添加draco载入库
  dracoLoader.setDecoderPath('/src/static/draco/')
  dracoLoader.setDecoderConfig({ type: 'js' })
  // 这里保证draco库一定会加载完毕
  dracoLoader.preload()
  loader.setDRACOLoader(dracoLoader)
  loader.load(
    '/src/static/model/island2.glb',
    (gltf) => {
      console.log('gltf', gltf)
      scene.add(gltf.scene)
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened')
    }
  )
}

const init = () => {
  initCamera()
  initLight()
  initGeometry()
  initRenderer()
  // 控制器需要在相机和渲染器初始化完成后调用
  initControls()
}

onMounted(() => {
  init()
  render()
  window.addEventListener('resize', () => {
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  })
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100%;
  background-color: #1e1a20;
}
</style>
