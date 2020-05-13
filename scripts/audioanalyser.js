const el = document.getElementById('AudioButton');

//Zpeech Variables
var refreshrate, samples, formants, preFormants, vowels;

//(function(){

 /* window.onload = start; 
  //Press the button to start the audio processing 
  function start(){
	el.addEventListener('click', init);
  }*/

  //initialize the global variables
  var analyser, data, audio, source;

  function init(object){

    //initialize the object 
    var thisobject = object;

    //initialize audio
    audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.src = 'audiofiles/activation_1_4-en.mp3';
    //audio.src = 'https://cdn.glitch.com/88609874-d94a-4130-a260-89c623fe206b%2Factivation_1_3-en.mp3?v=1589212430708';

    //connect nodes
    context = new AudioContext();
	source = context.createMediaElementSource(audio);
	audio.play();
    analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    
    //zpeech variables init
    samples = 1024;
    refreshrate = 5;

    //initialize data array and FFT
    data = new Uint8Array(samples);
    analyser.smoothingTimeConstant = 0.7;
    analyser.fftSize = samples*2;

     //storing variables for extracting Formants, initialize
     formants = [];

    //initialize predefined formants
    initPreFormants();
    //start the loop 
    loopAudio();  

    loopAnimation(thisobject);
  }

  function initPreFormants(){
    preFormants  = {
        e: [100, 1500],
        e: [430, 2336],
        u: [490, 1500],
        a: [827, 1542],
        o: [562, 3577],
        a: [695, 1840],
        s: [350,4900],
      };
  }

  function loopAudio(){
      setInterval(function(){

        analyser.getByteFrequencyData(data);

        formants = getFormants(data);

        console.log(formants[0],formants[1]);

        vowels = getVowels(formants,preFormants);

      },refreshrate);
  }

  function loopAnimation(object){
      setInterval(function(){

        var myobject = object;
        var myvalue = vowels[0][0];
        
        //change mouthshapes according to vowels in here
        animateLips(myvalue,myobject);

      },50);
  }

  function getFormants(){
      var f1,f2;
      var max1 = 0, max2 = 0;
      _.each(data,function(value,i){

        var freq = Math.round(i*context.sampleRate/analyser.fftSize);
        var val = value/255;
        var db = sma(val);

        //find formant Frequencies
        if(freq<1500){
            if(db>max1){
                max1 = db;
                f1 = freq;
            }
        }else if(freq<5000){
            if(db>max2){
                max2 = db;
                f2 = freq;
            }
        }

      });
      return [{db:max1,freq:f1},{db:max2,freq:f2}];
  }

  function getVowels(formants,preFormants){
    //check if dB value too small
    if(formants[0].db < 0.5 && formants[1].db < 0.5) return [["standard","standard"]];
    //Formants Object to array with frequencies
    var formantfreq = _.map(formants,"freq");

    //start with calculating 
    var distances = _.map(preFormants,function(f,vowel){
        var formantDistance = _(f)
        .zip(formantfreq)
        .map(function(pair){
            var dis = pair[0]-pair[1];
            return dis*dis;
        })
        .reduce(function (sum, num){
            return sum + num;
        },0);
        return [vowel,formantDistance];
    });

    //calculate the distance
    var maxdis = _.max(_.pluck(distances,1));

    var maxdis = _.max(_.pluck(distances,1));
    
    var probabilities = distances 
    .sort((a,b)=>a[1]-b[1])
    .map((pair)=>{
      var dis = pair[1]/maxdis;
      return [pair[0],1-dis];
    });
    return probabilities;

  }

  function sma(num){
      var nums = [];
      var period = 16;
      nums.push(num);
      if(nums.length>period){
          //remove first element 
          nums.splice(0,1);
      }
      var sum = 0;
      for(var i in nums){
          sum+=nums[i];
      }
      var n = period;
      if(nums.length<period){
          n = nums.length;
      }
      return (sum/n);
  }

//})();