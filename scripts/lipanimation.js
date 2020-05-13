
var isLoaded = false;

const backgroundColor = 0x400000;

//render
var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

//INIT SCENE

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(0,0,10);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );

const container = document.querySelector( '#scene-container' );
container.appendChild( renderer.domElement);

//smartboy function

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

//add lights 
var light = new THREE.PointLight( 0xffffcc, 20, 200 );
light.position.set( 4, 30, -20 );
scene.add( light );

var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
light2.position.set( 30, -10, 30 );
scene.add( light2 );

//LOAD GLTF 
var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

//LOAD MY OBJECT

loader.load( 'models/mouthshapes.glb', function ( data ) {
    var object = data.scene;
    object.position.set(0, 0, 9.5);
    object.scale.set(4,4,4);
    scene.add( object );
   
    isLoaded = true;


    /*var zpeechvowel = "a";

    animateLips(zpeechvowel,object);*/
    init(object);

});

function animateLips(zpeechvowel,object){
    var myobject = object;
    var myzpeechvowel = zpeechvowel

    //get mouth shapes we need
    var mouthA = myobject.getObjectByName('porsche_rigmouthshapes_A');
    var mouthEE = myobject.getObjectByName('porsche_rigmouthshapes_EE');
    var mouthO = myobject.getObjectByName('porsche_rigmouthshapes_O');
    var mouthU = myobject.getObjectByName('porsche_rigmouthshapes_U');
    var mouthCDGK = myobject.getObjectByName('porsche_rigmouthshapes_CDGK');
    var mouthstandard = myobject.getObjectByName('porsche_rigmouthshapes_neutral'); 

    //save to array shapes we need
    var mouthshapes = [{vowel:"a",shape:mouthA},
                   {vowel:"e",shape:mouthEE},
                   {vowel:"o",shape:mouthO},
                   {vowel:"u",shape:mouthU},
                   {vowel:"s",shape:mouthCDGK},
                   {vowel:"standard",shape:mouthstandard}];
    
    //get mouthshapes we dont need
    var mouthL = myobject.getObjectByName('porsche_rigmouthshapes_L');
    var mouthTH = myobject.getObjectByName('porsche_rigmouthshapes_TH');
    var mouthR = myobject.getObjectByName('porsche_rigmouthshapes_R');
    var mouthBMP = myobject.getObjectByName('porsche_rigmouthshapes_BMP');
    var mouthFV = myobject.getObjectByName('porsche_rigmouthshapes_FV');
    //save to array mouth shapes we dont need
    var badshapes = [mouthL,mouthTH,mouthR,mouthBMP,mouthFV];
    //make badshapes invisible
    badshapes.forEach((badmouth)=>{
        badmouth.visible = false;
    });

    //switch the state of mouthshapes

    mouthshapes.forEach((mouth)=>{
        if(mouth.vowel == myzpeechvowel){
            mouth.shape.visible = true;
        }else{
            mouth.shape.visible = false;
        }
    });
}

function LoadedOrNot(){
    if(isLoaded == true){
        console.log("boolean true");
    }else{
        console.log("boolean false");
    }
}

LoadedOrNot();