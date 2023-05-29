<script setup lang="ts">
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  MeshNormalMaterial,
  PointLight
} from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
class ThreeJs {
  scene: Scene | null = null
  camera: PerspectiveCamera | null = null
  renderer: WebGLRenderer | null = null
  ambientLight: AmbientLight | null = null
  mesh: Mesh | null = null
  canvas: HTMLDivElement | null = null
  pointLight: PointLight | null = null
  controls: OrbitControls | null = null

  constructor(canvas: HTMLDivElement | null) {
    this.canvas = canvas
    this.init()
  }

  init(): void {
    this.scene = new Scene()
    this.setCamera()
    this.setRenderer()
    this.setFont()

    // this.animate()
    this.onChange()
    // this.setCube()

    this.render()
  }
  stop(): void {
    this.controls.removeEventListener('change', this.render)
  }
  onChange(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement) //创建控制对象，把相机作为参数。

    this.controls.addEventListener('change', this.render)
  }
  // 新建透视相机
  setCamera(): void {
    this.camera = new PerspectiveCamera(
      75,
      this.canvas.offsetWidth / this.canvas.offsetHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5
  }

  // 设置渲染器
  setRenderer(): void {
    this.renderer = new WebGLRenderer()
    // 设置画布的大小
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
    this.renderer.setClearColor(0xb9d3ff, 0.3) //设置背景颜色
    //这里 其实就是canvas 画布  renderer.domElement
    this.canvas?.appendChild(this.renderer.domElement)
  }

  // 设置环境光
  setLight(): void {
    if (this.scene) {
      this.ambientLight = new AmbientLight(0xffcea3) // 环境光
      this.pointLight = new PointLight(0x444444)
      this.pointLight.position.set(400, 100, 200)
      this.scene.add(this.ambientLight)
      this.scene.add(this.pointLight)
    }
  }

  // 创建网格模型
  // setCube(): void {
  //   if (this.scene) {
  //     const geometry = new BoxGeometry() //创建一个立方体几何对象Geometry
  //     // const material = new MeshBasicMaterial({ color: 0xff3200 }); //材质对象Material
  //     const texture = new TextureLoader().load('http://rudxzhmj6.bkt.clouddn.com/1684570899517.png') //首先，获取到纹理
  //     const material = new MeshBasicMaterial({ map: texture }) //然后创建一个phong材质来处理着色，并传递给纹理映射
  //     this.mesh = new Mesh(geometry, material) //网格模型对象Mesh
  //     this.scene.add(this.mesh) //网格模型添加到场景中
  //     this.animate()
  //     this.render()
  //   }
  // }
  setFont(): void {
    if (this.scene) {
      const loader = new FontLoader()
      loader.load('/helvetiker_regular.typeface.json', (res) => {
        const font = new TextGeometry('hello world', {
          font: res,
          size: 1,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.05,
          bevelSegments: 3
        })
        font.center()
        const material = new MeshNormalMaterial({
          flatShading: true,
          transparent: true,
          opacity: 0.9
        })
        this.mesh = new Mesh(font, material)
        this.mesh.position.set(0, 0, 0)
        this.scene.add(this.mesh)
        this.animate()
        this.onChange()
        this.render()
      })
    }
  }
  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }
  // 动画
  animate(): void {
    if (this.mesh) {
      requestAnimationFrame(this.animate.bind(this))
      // this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.render()
    }
  }
}
const demo = ref()
let instance = ref()
onMounted(() => {
  instance.value = new ThreeJs(demo.value)
})
onUnmounted(() => {
  instance.value.stop()
  instance.value = null
})
</script>

<template>
  <div class="demo" ref="demo" style="height: 100%"></div>
</template>
