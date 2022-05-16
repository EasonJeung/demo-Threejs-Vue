import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Model path
const MODEL_PATH = './src/assets/tesla_tequila_model/scene.gltf'
const MODEL_MAP = './src/assets/tesla_tequila_model/textures/bottle.inside_normal.png'

var width = 800,
    height = 500;

// Create the scene 
var scene = new THREE.Scene();
scene.background = new THREE.Color('#eee');
// scene.fog = new THREE.Fog('#eee', 20, 100);

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.getElementById('three').appendChild(renderer.domElement);
renderer.shadowMap.enabled = true

// Create a camera
const camera = new THREE.PerspectiveCamera(
    50,
    width / height,
    0.5,
    10000
)
camera.position.set(100, 70, 30);
camera.lookAt(0, 0, 0);

// Add axes
var axes = new THREE.AxisHelper(50);
scene.add(axes);

// Load model
var gltfLoader = new GLTFLoader()
gltfLoader.load(MODEL_PATH, (gltf) => {
    let model = gltf.scene
    //遍历模型每部分
    model.traverse((o) => {
        //将图片作为纹理加载
        let explosionTexture = new THREE.TextureLoader().load(
            MODEL_MAP
        )
        //调整纹理图的方向
        explosionTexture.flipY = false
        //将纹理图生成基础网格材质(MeshBasicMaterial)
        const material = new THREE.MeshBasicMaterial({
            map: explosionTexture,
        })
        //给模型每部分上材质
        o.material = material
        if (o.isMesh) {
            o.castShadow = true
            o.receiveShadow = true
        }
    })
    scene.add(model)
})

// HemisphereLight (半球光/户外光)
const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
hemLight.position.set(0, 48, 0)
scene.add(hemLight)

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
//光源等位置
dirLight.position.set(-10, 8, -5)
//可以产生阴影
dirLight.castShadow = true
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
scene.add(dirLight)

// 设置地面
let floorGeometry = new THREE.PlaneGeometry(8000, 8000)
let floorMaterial = new THREE.MeshPhongMaterial({
    color: 0x708090,
    shininess: 0,
})

let floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -0.5 * Math.PI
floor.receiveShadow = true
floor.position.y = -0.001
scene.add(floor)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


function animate() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
    }
}
animate()

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    var width = window.innerWidth
    var height = window.innerHeight
    var canvasPixelWidth = canvas.width / window.devicePixelRatio
    var canvasPixelHeight = canvas.height / window.devicePixelRatio

    const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height
    if (needResize) {
        renderer.setSize(width, height, false)
    }
    return needResize
}