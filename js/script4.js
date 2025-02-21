//script for birds animation and movement

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
//import * as dat from 'dat.gui';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

const Wall_A = '/images/Wall_A.jpeg';
const Wall_B = '/images/Wall_B.jpeg';
const Wall_C = '/images/Wall_C.jpeg';


const renderer = new THREE.WebGL1Renderer(); 

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(0, 30, 0);
orbit.update(); 

const ambientLight = new THREE.AmbientLight(0xff00ff);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 10000);                // 10,000 intensity 
spotLight.position.set(100, 100, -100);
spotLight.castShadow = true;
scene.add(spotLight);

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

    //Texture construction 
const textureLoader = new THREE.TextureLoader();
    //Loading texture for orthographic view
const OVtexture = textureLoader.load(OrthographicView);
    //Orthographic View plane construction
const orthographicViewGeometry = new THREE.PlaneGeometry(32, 16);
const orthographicViewMaterial = new THREE.MeshBasicMaterial({map: OVtexture});

const orthographicView = new THREE.Mesh(orthographicViewGeometry, orthographicViewMaterial);
scene.add(orthographicView);
orthographicView.rotation.x = -0.5 * Math.PI;
orthographicView.receiveShadow = true;
orthographicView.raycast = () => {};

    //Loading texture for Wall A
const WAtexture = textureLoader.load(Wall_A);
    //Wall A plane construction
const wallAGeometry = new THREE.PlaneGeometry (16, 8);
const wallAMaterial = new THREE.MeshBasicMaterial ({map:WAtexture, side: THREE.DoubleSide});

const wallA = new THREE.Mesh(wallAGeometry, wallAMaterial);
scene.add(wallA);
wallA.rotation.y = 0.5 * Math.PI;
wallA.position.x = -16;
wallA.position.y = 4;

    //Loading texture for Wall B
const WBtexture = textureLoader.load(Wall_B);
    //Wall B plane construction 
const wallBGeometry = new THREE.PlaneGeometry(32, 8);
const wallBMaterial = new THREE.MeshBasicMaterial({map:WBtexture, side: THREE.DoubleSide});

const wallB = new THREE.Mesh(wallBGeometry, wallBMaterial);
scene.add(wallB);
wallB.position.y = 4;           // maybe move up and down to 1?
wallB.position.x = 0;
wallB.position.z = -8;

    //Loading texture for Wall C
const WCtexture = textureLoader.load(Wall_C);
    //Wall C plane construction
const wallCGeometry = new THREE.PlaneGeometry(16, 8);
const wallCMaterial = new THREE.MeshBasicMaterial({map:WCtexture, side: THREE.DoubleSide});

const wallC = new THREE.Mesh(wallCGeometry, wallCMaterial);
scene.add(wallC);
wallC.rotation.y = -0.5 * Math.PI;
wallC.position.x = 16;
wallC.position.y = 4;
wallC.position.z = -0.1;


const counter1Geometry = new THREE.BoxGeometry(); 
const counter1Material = new THREE.MeshStandardMaterial({color:0xffffff});

const counter1 = new THREE.Mesh(counter1Geometry, counter1Material);
scene.add(counter1);
counter1.scale.set(2.5, 2.5, 2.5);
counter1.position.set(-11.5, 1.5, -6.5);

const objectLoader = new OBJLoader();

objectLoader.load('/models/Stove/Stove.obj', (stove) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    stove.scale.set(0.038,0.042,0.038);
    stove.position.set(-5.8, 0.2, -6.3);
    stove.rotation.x = -1.55;
    scene.add(stove); });

objectLoader.load('/models/Deep_Fryer/Deep_Fryer.obj', (deep_fryer) => {
    //deep_fryer.children[0].material = new THREE.MeshBasicMaterial({color: 0xffffff});    
    deep_fryer.scale.set(0.035,0.035,0.035);
    deep_fryer.position.set(-12.2, 2.7, -6.3);
    deep_fryer.rotation.x = -1.55;
    deep_fryer.rotation.z = 1.55;
    scene.add(deep_fryer); });

objectLoader.load('/models/Deep_Fryer/Deep_Fryer.obj', (deep_fryer2) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    deep_fryer2.scale.set(0.035,0.035,0.035);
    deep_fryer2.position.set(-10.8, 2.7, -6.3);
    deep_fryer2.rotation.x = -1.55;
    deep_fryer2.rotation.z = 1.55;
    scene.add(deep_fryer2); });

objectLoader.load('/models/Oven/oven.obj', (oven) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    oven.scale.set(0.043,0.053,0.050);
    oven.position.set(-14.4, 0.2, -6.0);
    oven.rotation.x = -1.55;
    scene.add(oven); });

objectLoader.load('/models/Grill/Grill.obj', (grill) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    grill.scale.set(0.025,0.030,0.038);
    grill.position.set(-8.7, 0.2, -6.0);
    grill.rotation.x = -1.55;
    scene.add(grill); });

objectLoader.load('/models/Rack/Rack.obj', (rack) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    rack.scale.set(0.022,0.020,0.025);
    rack.position.set(12.7, 0, 0);
    rack.rotation.y = -1.55;
    scene.add(rack); });

objectLoader.load('/models/Sink/Sink.obj', (sink) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    sink.scale.set(0.022,0.020,0.025);
    sink.position.set(12.7, 0, 0);
    sink.rotation.y = -1.55;
    scene.add(sink); });


function animate(time){

    renderer.render(scene, camera);   
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
