let camera, scene, renderer, loader, ring;
var element = $('.hero-text');
$(window).scroll(function () {
  if($(window).scrollTop() > 0) {
    element.addClass("fade");
  }
  else {
    element.removeClass("fade");
  }
});


const objects = [];
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
  camera.position.set( 0, 0, 4 );

  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x444444)
  loader = new THREE.GLTFLoader();
  loader.load('ring/scene.gltf', function(gltf){
    ring = gltf.scene;
    ring.position.set(-0.1, 0, 0);
    ring.rotation.set(0, Math.PI/6, 0);
    ring.scale.set(0.07, 0.07, 0.07);
    scene.add(gltf.scene);
  })

  hemiLight = new THREE.HemisphereLight(0xffeeb1, 0xffffff, 3.7);
  scene.add(hemiLight);

  const geometry = new THREE.PlaneBufferGeometry(0.66, 1);
  const count = 6;
  var materials = 
  [
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('img/hobbit.jpg'), side: THREE.DoubleSide, toneMapped: false } ),
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('img/fotr.jpg'), side: THREE.DoubleSide, toneMapped: false } ),
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('img/tt.jpg'), side: THREE.DoubleSide, toneMapped: false } ),
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('img/rotk.jpg'), side: THREE.DoubleSide, toneMapped: false } ),
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('img/silmarillion.jpg'), side: THREE.DoubleSide, toneMapped: false } ),
    new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('img/tales.jpg'), side: THREE.DoubleSide, toneMapped: false } ),
  ];

  for ( let i = 1; i <= count; i ++ ) {
    const mesh = new THREE.Mesh( geometry, materials[i-1] );
    const t = -i * Math.PI/4;
    mesh.position.z = Math.cos( t ) * 3;
    mesh.position.x = Math.sin( t ) * 3;
    mesh.position.y = -i * 0.5;
    mesh.rotation.y = -i * Math.PI/4;      
    scene.add( mesh );
    objects.push( mesh );
  }

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );    
}

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

function updateCamera(ev) {
  scene.rotation.y = (Math.PI/2)*window.scrollY/700;
  scene.position.y = 1*window.scrollY/700;
  ring.position.y = - window.scrollY/600;
  ring.scale.set(0.07 + window.scrollY/50000, 0.07 + window.scrollY/50000, 0.07 + window.scrollY/50000);
}
window.addEventListener("scroll", updateCamera);