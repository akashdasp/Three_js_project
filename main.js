import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//control


const pointUI=document.querySelector("#points");
let points=0

const randomnumgen=(max,min)=>{
  return Math.floor(Math.random()*(max-min+1)+min);
}

const moveobst=(arr,speed,maxX,maxZ,minZ)=>{
  arr.forEach((el) => {
    el.position.z +=speed;
    if (el.position.z> camera.position.z){
      el.position.x=randomnumgen(maxX,minX);
      el.position.z=randomnumgen(maxZ,minZ);
    }
    
  });
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z=4.5;
camera.position.y=1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls=new OrbitControls(camera,renderer.domElement);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
const ground= new THREE.Mesh(
  new THREE.BoxGeometry( 30, 1, 30 ), 
  new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
);
ground.position.y=-1
scene.add(ground);

//adding a player 

const player= new THREE.Mesh(
  new THREE.BoxGeometry( 0.5, 0.5, 0.5 ), 
  new THREE.MeshBasicMaterial( { color: 0xff0000 } )
);
scene.add(player);


// adding powerup
const poweups=[]
for(let i=0;i<10;i++){
  const powerup = new THREE.Mesh(
    new THREE.TorusGeometry(1,0.4,16,50),
    new THREE.MeshBasicMaterial({color:0xFFFF00})
  );
  powerup.scale.set(0.1,0.1,0.1)
  powerup.name="powerup"+i+1;
  powerup.position.x=randomnumgen(8,-8);
  powerup.position.z=randomnumgen(-5,-10);
  poweups.push(powerup)
  scene.add(powerup);
}


// adding Grid Helper Fuction

const gridHelper=new THREE.GridHelper(30,30);
scene.add(gridHelper)
function animate() {
	requestAnimationFrame( animate );
  moveobst(poweups,0.1,8,-8,-5,-10)
  controls.update();

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

//fuction for animate loop

animate();
window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})
window.addEventListener("keydown",(e)=>{
  if(e.key==="d"||e.key==="D"||e.key==="ArrowRight"){
    player.position.x+=0.1;
  }
  if(e.key==="a"||e.key==="A"||e.key==="ArrowLeft"){
    player.position.x-=0.1;
  }
})