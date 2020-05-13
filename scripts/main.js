//initialize scene

function initScene(){

// Get a reference to the container element that will hold our scene
const container = document.querySelector( '#scene-container' );

//create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color( 'skyblue' );

// Create Camera Variables
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

//Init Camera
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

// every object is initially created at ( 0, 0, 0 )
// we'll move the camera back a bit so that we can view the scene
camera.position.set( 0, 0, 10 );


//before we render set up lights and shit and add them to the scene
const hlight = new THREE.AmbientLight(0x404040);
scene.add(hlight);


//renderer to show scene
const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//add the automatically created <canvas> element to the page
container.appendChild( renderer.domElement );

// render, or 'create a still image', of the scene
//renderer.render( scene, camera );

function renderLoop(){
    requestAnimationFrame(renderLoop);
    renderer.render(scene, camera);
}

renderLoop();

loadGLTF(scene);


}


initScene();


function loadGLTF(myscene){

    //instantiate loader 
    const loader = new THREE.GLTFLoader();

    //path 
    const path = 'models/mouthshapes.glb';

    //Array that contains all the meshes 
    var meshArr = [];

    const onLoad = (gltf)=>{
       /* let object = gltf.scene;
        myscene.add(object);
        object.position.z = -2;
        object.scale.set(10,10,10);
        object.traverse(child => {
            const mesh = child;
            if(mesh.isMesh){
                meshArr.push(mesh);
                console.log("Mesh Loaded!1");
            }
        });*/
        
        //get the objects one by one and make visibility false
        var object = gltf.scene;
        object.scale.set(10,10,10);
        var shapeNeutral = object.getObjectByName('porsche_rigmouthshapes_neutral'); 
        myscene.add(shapeNeutral);
        console.log(shapeNeutral);
        console.log("fuck you 2");
        
        /*var shapeL = gltf.scene.getObjectByName('porsche_rigmouthshapes_L');
        var shapeEE = gltf.scene.getObjectByName('porsche_rigmouthshapes_EE');
        var shapeUU = gltf.scene.getObjectByName('porsche_rigmouthshapes_U');
        var shapeTH = gltf.scene.getObjectByName('porsche_rigmouthshapes_TH');
        var shapeR = gltf.scene.getObjectByName('porsche_rigmouthshapes_R');
        var shapeBMP = gltf.scene.getObjectByName('porsche_rigmouthshapes_BMP');
        var shapeCDGK = gltf.scene.getObjectByName('porsche_rigmouthshapes_CDGK');
        var shapeO = gltf.scene.getObjectByName('porsche_rigmouthshapes_O');
        var shapeFV = gltf.scene.getObjectByName('porsche_rigmouthshapes_FV');
        var shapeA = gltf.scene.getObjectByName('porsche_rigmouthshapes_A');*/
    };

    //call loader function
    loader.load(path, onLoad);
}

function animateLips(){
    
}

