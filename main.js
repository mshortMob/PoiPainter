var colorObject = function() {
	this.ci=0;
	this.rList=[255,255,000,000,000,255];
	this.gList=[000,255,255,255,000,000];
	this.bList=[000,000,000,255,255,255];
	ci=this.ci;
	this.change= function(){ci=(ci+1) % 6;}	
	this.requestR= function(){return this.rList[ci];}
	this.requestG= function(){return this.gList[ci];}
	this.requestB= function(){return this.bList[ci];}
}

var mode = function(domName){
    this.vel=parseFloat(sl.defaultValue);
    this.bri=parseFloat(sl2.defaultValue);
    this.clr=parseFloat(sl3.defaultValue);
    this.del=parseFloat(sl4.defaultValue);
    this.alp=parseFloat(sl5.defaultValue);
    this.mix=parseFloat(sl6.defaultValue);
	this.imgRate=parseFloat(sl7.defaultValue);
	this.res=parseFloat(sl8.defaultValue);
	this.imgMode=imageMode;
    this.onSelected = function () {
        sl.value=this.vel;
        sl2.value=this.bri;
        sl3.value=this.clr;
        sl4.value=this.del;
        sl5.value=this.alp;
        sl6.value=this.mix;
		sl7.value=this.imgRate;
		sl8.value=this.res;
		imageMode=this.imgMode;
		document.getElementById(domName).style.backgroundColor='green';
    }
    this.onDeselected = function () {
        this.vel=parseFloat(sl.value);
        this.bri=parseFloat(sl2.value);
        this.clr=parseFloat(sl3.value);
        this.del=parseFloat(sl4.value);
        this.alp=parseFloat(sl5.value);
        this.mix=parseFloat(sl6.value);
		this.imgRate=parseFloat(sl7.value);
		this.res=parseFloat(sl8.value);
		this.imgMode=imageMode;
		document.getElementById(domName).style.backgroundColor='LightGray';
    }
}


function dirUpdateAndFeedback(){
	if (Dir1==-1) {
		document.getElementById("dir1Button").style.backgroundColor="lightblue";
	}
	if (Dir1==1) {
		document.getElementById("dir1Button").style.backgroundColor="#C0C0C0";
	}
	if (Dir2==-1) {
		document.getElementById("dir2Button").style.backgroundColor="lightblue";
	}
	if (Dir2==1) {
		document.getElementById("dir2Button").style.backgroundColor="#C0C0C0";
	}
	document.getElementById('tempCanvas').style.transform="scale("+Dir1+", "+Dir2+")";
    document.getElementById('tracerCanvas').style.transform="scale("+Dir1+", "+Dir2+")";
}

var Dir1=1;
var Dir2=1;
function switchDir1(){
	if (Dir1==1) {
		document.getElementById("dir1Button").style.backgroundColor="lightblue";
	}
	if (Dir1==-1) {
		document.getElementById("dir1Button").style.backgroundColor="#C0C0C0";
	}
	 Dir1=Dir1*-1;
     document.getElementById('tempCanvas').style.transform="scale("+Dir1+", "+Dir2+")";
     document.getElementById('tracerCanvas').style.transform="scale("+Dir1+", "+Dir2+")";
}
function switchDir2(){
	if (Dir2==1) {
		document.getElementById("dir2Button").style.backgroundColor="lightblue";
	}
	if (Dir2==-1) {
		document.getElementById("dir2Button").style.backgroundColor="#C0C0C0";
	}
	 Dir2=Dir2*-1;
     document.getElementById('tempCanvas').style.transform="scale("+Dir1+", "+Dir2+")";
     document.getElementById('tracerCanvas').style.transform="scale("+Dir1+", "+Dir2+")";
}

document.addEventListener('keydown', function(event) {
	console.log(event.keyCode)
    if(event.keyCode == 49) {
       	modeSelector(mode1);
		currentMode="poiPaintButton";
    }
    if(event.keyCode == 50) {
       	modeSelector(mode2);
		currentMode="poiPaintButton2";
    }
    if(event.keyCode == 51) {
       	modeSelector(mode3);
		currentMode="poiPaintButton3";
    }
    if(event.keyCode == 52) {
       	modeSelector(mode4);
		currentMode="poiPaintButton4";
    }
});




function initGlobalVars(){
	currentMode="poiPaintButton";
	imageMode=-1;
	vid=[];
	rotState=0;
	colorInterval=0;
	imageChangeInterval=0;
	tracerCanvasDataContext=tracerCanvas.getContext("2d");
	tracerCanvasDataContext.clearRect(0,0,document.getElementById('tracerCanvas').width,document.getElementById('tracerCanvas').height);
	clr= new colorObject();
	initializeVideo();
	initSliders();
	mode1 = new mode("poiPaintButton");
	mode2 = new mode("poiPaintButton2");
	mode3 = new mode("poiPaintButton3");
	mode4 = new mode("poiPaintButton4");
	setInterval(function(){ computeTraces(); }, .1);
	previousMode=mode1;
	document.getElementById('poiPaintButton').style.backgroundColor='Green';
	document.getElementById('poiPaintButton2').style.backgroundColor='LightGray';
	document.getElementById('poiPaintButton3').style.backgroundColor='LightGray';
	document.getElementById('poiPaintButton4').style.backgroundColor='LightGray';
	document.getElementById('justControls').style.width='0px';
	document.getElementById('justControls').style.visibility='hidden';
	document.getElementById('justControls').style.transition='width .05s';
	imageNumber=1;
	setTimeout(function(){changeImage();},5000);
}

function modeSelector(mode){
	deselectTracker(mode);
	mode.onSelected();
	updateControls();
	imageModeFeedback();
}


document.getElementById("poiPaintButton").addEventListener("click", function() {
	modeSelector(mode1);
	currentMode="poiPaintButton";
});

document.getElementById("poiPaintButton2").addEventListener("click", function() {
	modeSelector(mode2);
	currentMode="poiPaintButton2";
});

document.getElementById("poiPaintButton3").addEventListener("click", function() {
	modeSelector(mode3);
	currentMode="poiPaintButton3";
});

document.getElementById("poiPaintButton4").addEventListener("click", function() {
	modeSelector(mode4);
	currentMode="poiPaintButton4";
});

document.getElementById("imgModeButton").addEventListener("click", function() {
	imageMode=imageMode*-1;
	imageModeFeedback();
});

function imageModeFeedback(){
	if (imageMode==1) {
		document.getElementById("imgModeButton").style.backgroundColor="lightblue";
	}
	if (imageMode==-1) {
		document.getElementById("imgModeButton").style.backgroundColor="#C0C0C0";
	}
}

document.getElementById("hideCtls").addEventListener("click", function() {
	var oneClick=0;
	if (document.getElementById('justControls').style.width=='0px' && oneClick==0) {
		document.getElementById('justControls').style.width='200px';
		document.getElementById('justControls').style.visibility='visible';
		document.getElementById('hideCtls').style.transform='rotateZ(-90deg)'
		oneClick=1;			
	}
	if (document.getElementById('justControls').style.width=='200px' && oneClick==0) {
	document.getElementById('justControls').style.width='0px';
	document.getElementById('justControls').style.visibility='hidden';
	document.getElementById('hideCtls').style.transform='rotateZ(90deg)'
	}

});


document.getElementById("fullScreenButton").addEventListener("click", function() {
	fullscreen();
});

document.getElementById("slaveModeButton").addEventListener("click", function() {
	var isFirst=1;
	if (isReadMode==1 && isFirst==1) {
		isFirst=0;
		stopServerInterval()
	}
	if (isReadMode==0 && isFirst==1) {
		isFirst=0;
		startServerInterval()
	}
});

document.getElementById("masterModeButton").addEventListener("click", function() {
	var isFirst=1;
	if (isWriteMode==1 && isFirst==1) {
		isFirst=0;
		stopWriteInterval()
	}
	if (isWriteMode==0 && isFirst==1) {
		isFirst=0;
		startWriteInterval()
	}
});

function setSize(width){
document.getElementById("tempCanvas").setAttribute("width",sl8.value);
document.getElementById("tempCanvas").setAttribute("height", sl8.value*.75);
document.getElementById("tempCanvas2").setAttribute("width",sl8.value);
document.getElementById("tempCanvas2").setAttribute("height", sl8.value*.75);
document.getElementById("video").setAttribute("width",sl8.value);
document.getElementById("video").setAttribute("height", sl8.value*.75);
document.getElementById("tracerCanvas").setAttribute("width",sl8.value);
document.getElementById("tracerCanvas").setAttribute("height", sl8.value*.75);

}


isReadMode=0;
isWriteMode=0;
writeString="";
function createWriteString(){
		writeString=currentMode+","+imageMode+","+Dir1+","+Dir2;
		writeString=writeString+","+mode1.vel;
        writeString=writeString+","+mode1.bri
        writeString=writeString+","+mode1.clr;
        writeString=writeString+","+mode1.del;
        writeString=writeString+","+mode1.alp;
        writeString=writeString+","+mode1.mix;
		writeString=writeString+","+mode1.imgRate;
		writeString=writeString+","+mode1.imgMode;
		writeString=writeString+","+mode1.res;
		
		writeString=writeString+","+mode2.vel;
        writeString=writeString+","+mode2.bri
        writeString=writeString+","+mode2.clr;
        writeString=writeString+","+mode2.del;
        writeString=writeString+","+mode2.alp;
        writeString=writeString+","+mode2.mix;
		writeString=writeString+","+mode2.imgRate;
		writeString=writeString+","+mode2.imgMode;
		writeString=writeString+","+mode2.res;
		
		writeString=writeString+","+mode3.vel;
        writeString=writeString+","+mode3.bri
        writeString=writeString+","+mode3.clr;
        writeString=writeString+","+mode3.del;
        writeString=writeString+","+mode3.alp;
        writeString=writeString+","+mode3.mix;
		writeString=writeString+","+mode3.imgRate;
		writeString=writeString+","+mode3.imgMode;
		writeString=writeString+","+mode3.res;
	
		writeString=writeString+","+mode4.vel;
        writeString=writeString+","+mode4.bri
        writeString=writeString+","+mode4.clr;
        writeString=writeString+","+mode4.del;
        writeString=writeString+","+mode4.alp;
        writeString=writeString+","+mode4.mix;
		writeString=writeString+","+mode4.imgRate;
		writeString=writeString+","+mode4.imgMode;
		writeString=writeString+","+mode4.res;

}


writeInterval=2000;
function startWriteInterval(){
	isWriteMode=1;
	currentValue="poiPaintButton"
	writeInterval=setInterval(function(){writeToServer(writeString);},1000);
	document.getElementById("masterModeButton").style.backgroundColor="lightblue";
}

function stopWriteInterval(){
	document.getElementById("masterModeButton").style.backgroundColor="#C0C0C0";
	clearInterval(writeInterval);
	isWriteMode=0;
}



function writeToServer(someString) {
	createWriteString();
    var request = new XMLHttpRequest();
    request = new XMLHttpRequest();
    var urlquery = 'test.php?key='+someString;            
      console.log('Calling PHP Loading with query '+urlquery);
      request.open("GET",urlquery,true);
      request.timeout = 10000; 
      request.responseType = 'arraybuffer';
      request.onload = function () {
          request.response;
      };
      request.send();
}


function readFromServer() {
    var request = new XMLHttpRequest();
    request = new XMLHttpRequest();
    var urlquery = 'test2.php?key='+'newfile.txt';            
      console.log('Calling PHP Loading with query '+urlquery);
      request.open("GET",urlquery,true);
      request.timeout = 10000; 
      //request.responseType = 'arraybuffer';
      request.onload = function () {
          console.log(request.response);
		  responseArray=request.response.split(",");
		  document.getElementById(responseArray[0]).click();
		  imageMode=responseArray[1];
		  imageModeFeedback();
		  Dir1=responseArray[2];
		  Dir2=responseArray[3];
		  dirUpdateAndFeedback();
		  
		mode1.vel=responseArray[4];
        mode1.bri=responseArray[5];
        mode1.clr=responseArray[6];
        mode1.del=responseArray[7];
        mode1.alp=responseArray[8];
        mode1.mix=responseArray[9];
		mode1.imgRate=responseArray[10];
		mode1.imgMode=responseArray[11];
		mode1.res=responseArray[12];
		  
		mode2.vel=responseArray[13];
        mode2.bri=responseArray[14];
        mode2.clr=responseArray[15];
        mode2.del=responseArray[16];
        mode2.alp=responseArray[17];
        mode2.mix=responseArray[18];
		mode2.imgRate=responseArray[19];
		mode2.imgMode=responseArray[20];
		mode2.res=responseArray[21];
		  
		mode3.vel=responseArray[22];
        mode3.bri=responseArray[23];
        mode3.clr=responseArray[24];
        mode3.del=responseArray[25];
        mode3.alp=responseArray[26];
        mode3.mix=responseArray[27];
		mode3.imgRate=responseArray[28];
		mode3.imgMode=responseArray[29];
		mode3.res=responseArray[30];
		  
		mode4.vel=responseArray[31];
        mode4.bri=responseArray[32];
        mode4.clr=responseArray[33];
        mode4.del=responseArray[34];
        mode4.alp=responseArray[35];
        mode4.mix=responseArray[36];
		mode4.imgRate=responseArray[37];
		mode4.imgMode=responseArray[38];
		mode4.res=responseArray[39];
		  
		  
		  
		  return responseArray;
      };
      request.send();
}

serverInterval=1000;
function startServerInterval(){
	isReadMode=1; 
	currentValue="poiPaintButton"
	serverInterval=setInterval(function(){readAndClick();},500);
	function readAndClick(){
		currentvalue=readFromServer();
		console.log(currentValue);
		//document.getElementById(currentValue).click();
	}
	document.getElementById("slaveModeButton").style.backgroundColor="lightblue";
}

function stopServerInterval(){
	document.getElementById("slaveModeButton").style.backgroundColor="#C0C0C0";
	clearInterval(serverInterval);
	isReadMode=0;
}



function fullscreen(){
           var el = document.getElementById('allCanvases');
 
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }                       
}

function deselectTracker(currentMode){
	if (previousMode != currentMode) {
		previousMode.onDeselected();
	}
	previousMode=currentMode;
}

previousResolution=sl8.value;
function updateControls(){
	clearInterval(colorInterval);
	colorInterval=setInterval(function(){ clr.change();}, parseFloat(sl3.max)+parseFloat(sl3.min)-parseFloat(sl3.value));
	clearInterval(imageChangeInterval);
	imageChangeInterval=setInterval(function(){ changeImage();}, parseFloat(sl7.max)+parseFloat(sl7.min)-parseFloat(sl7.value));
	previousMode.vel=parseFloat(sl.value);
    previousMode.bri=parseFloat(sl2.value);
    previousMode.clr=parseFloat(sl3.value);
    previousMode.del=parseFloat(sl4.value);
    previousMode.alp=parseFloat(sl5.value);
    previousMode.mix=parseFloat(sl6.value);
	previousMode.imgRate=parseFloat(sl7.value);
	previousMode.res=parseFloat(sl8.value);
	if (parseFloat(sl8.value)!=previousResolution) {
		previousResolution=parseFloat(sl8.value);
		setSize();
	}
	previousMode.imgMode=imageMode;
}

function initSliders(){
	sl=document.getElementById("sl");
	sl.max=764;
	sl.min=1;
	sl.step=3;
	sl.defaultValue=600;
	
	sl2=document.getElementById("sl2");
	sl2.max=764;
	sl2.min=1;
	sl2.step=3;
	sl2.defaultValue=700;
	
	sl3=document.getElementById("sl3");
	sl3.max=10000;
	sl3.min=50;
	sl3.step=25;
	sl3.defaultValue=8000;
	
	sl4=document.getElementById("sl4");
	sl4.max=100;
	sl4.min=0;
	sl4.step=1;
	sl4.defaultValue=5;
	
	sl5=document.getElementById("sl5");
	sl5.max=1.0;
	sl5.min=0.0;
	sl5.step=.01;
	sl5.defaultValue=0;
	
	sl6=document.getElementById("sl6");
	sl6.max=1.0;
	sl6.min=0.0;
	sl6.step=.01;
	sl6.defaultValue=.4;
	
	sl7=document.getElementById("sl7");
	sl7.max=3000;
	sl7.min=10;
	sl7.step=5;
	sl7.defaultValue=900;
	
	sl8=document.getElementById("sl8");
	sl8.max=400;
	sl8.min=10;
	sl8.step=2;
	sl8.defaultValue=200;
	
}



function changeImage(){
	imageNumber=((imageNumber+1)%8);
	imageNumberAdd=imageNumber+1;
	//console.log(imageNumber);
	tempCanvas2.getContext('2d').drawImage(document.getElementById("img"+imageNumberAdd), 0, 0, document.getElementById('video').width, document.getElementById('video').height);
	imgDataContext = tempCanvas2.getContext("2d");
	img=imgDataContext.getImageData(0,0,document.getElementById('video').width,document.getElementById('video').height);
}

function computeTraces() {
	tempCanvas.getContext('2d').drawImage(video, 0, 0, document.getElementById('video').width, document.getElementById('video').height);
	vidDataContext = tempCanvas.getContext("2d");
	oldvid=vid;
	vid=vidDataContext.getImageData(0,0,document.getElementById('video').width,document.getElementById('video').height);
	tracerCanvasData=tracerCanvasDataContext.getImageData(0,0,document.getElementById('video').width,document.getElementById('video').height);
	var velVal=parseFloat(sl.min)+parseFloat(sl.max)-parseFloat(sl.value);
	var briVal=parseFloat(sl2.min)+parseFloat(sl2.max)-parseFloat(sl2.value);
	var delVal=parseFloat(sl4.min)+parseFloat(sl4.max)-parseFloat(sl4.value);
	var mixVal=parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value);
	var imgMix=parseFloat(sl7.min)+parseFloat(sl7.max)-parseFloat(sl7.value);
	for (x=0; x < ((document.getElementById('video').width * document.getElementById('video').height) * 4); x=x+4) {
		if (tracerCanvasData.data[x+3] > 0) {
			tracerCanvasData.data[x+3]=tracerCanvasData.data[x+3]-(delVal);
		}
		if (Math.abs((vid.data[x]+vid.data[x+1]+vid.data[x+2])-(oldvid.data[x]+oldvid.data[x+1]+oldvid.data[x+2])) > (velVal) && (vid.data[x]+vid.data[x+1]+vid.data[x+2] > briVal)) {
			if (imageMode == -1) {
				tracerCanvasData.data[x]=clr.requestR()*(1-(mixVal))+vid.data[x]*((mixVal));
				tracerCanvasData.data[x+1]=clr.requestG()*(1-(mixVal))+vid.data[x+1]*((mixVal));
				tracerCanvasData.data[x+2]=clr.requestB()*(1-(mixVal))+vid.data[x+2]*((mixVal));
			}
			if (imageMode == 1) {
				tracerCanvasData.data[x]=img.data[x]*((mixVal))+clr.requestR()*(1-(mixVal));
				tracerCanvasData.data[x+1]=img.data[x+1]*((mixVal))+clr.requestG()*(1-(mixVal));
				tracerCanvasData.data[x+2]=img.data[x+2]*((mixVal))+clr.requestB()*(1-(mixVal));
			}
			tracerCanvasData.data[x+3]=255;
		}
	}
	document.getElementById('tempCanvas').style.opacity=parseFloat(sl5.value);
	tracerCanvasDataContext.putImageData(tracerCanvasData,0,0);
}

//function computeTraces() {
//	tempCanvas.getContext('2d').drawImage(video, 0, 0, document.getElementById('video').width, document.getElementById('video').height);
//	vidDataContext = tempCanvas.getContext("2d");
//	oldvid=vid;
//	vid=vidDataContext.getImageData(0,0,document.getElementById('video').width,document.getElementById('video').height);
//	tracerCanvasData=tracerCanvasDataContext.getImageData(0,0,document.getElementById('video').width,document.getElementById('video').height);
//	for (x=0; x < ((document.getElementById('video').width * document.getElementById('video').height) * 4); x=x+4) {
//		if (tracerCanvasData.data[x+3] > 0) {
//			tracerCanvasData.data[x+3]=tracerCanvasData.data[x+3]-(parseFloat(sl4.min)+parseFloat(sl4.max)-parseFloat(sl4.value));
//		}
//		if (Math.abs((vid.data[x]+vid.data[x+1]+vid.data[x+2])-(oldvid.data[x]+oldvid.data[x+1]+oldvid.data[x+2])) > (parseFloat(sl.min)+parseFloat(sl.max)-parseFloat(sl.value)) && (vid.data[x]+vid.data[x+1]+vid.data[x+2] > (parseFloat(sl2.min)+parseFloat(sl2.max)-parseFloat(sl2.value)))) {
//			tracerCanvasData.data[x]=clr.requestR()*(1-(parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value)))+vid.data[x]*((parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value)));
//			tracerCanvasData.data[x+1]=clr.requestG()*(1-(parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value)))+vid.data[x+1]*((parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value)));
//			tracerCanvasData.data[x+2]=clr.requestB()*(1-(parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value)))+vid.data[x+2]*((parseFloat(sl6.min)+parseFloat(sl6.max)-parseFloat(sl6.value)));
//			tracerCanvasData.data[x+3]=255;
//		}
//	}
//	document.getElementById('tempCanvas').style.opacity=parseFloat(sl5.value);
//	tracerCanvasDataContext.putImageData(tracerCanvasData,0,0);
//	tracerCanvasDataContext.scale(-1, 1);
//}

function initializeVideo() {
	window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	video = document.getElementById("video"),
	videoObj = { "video": true },
	errBack = function(error) {
		console.log("Video capture error: ", error.code); 
	};
	// Put video listeners into place
	if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	}, false);
}

initGlobalVars();
document.getElementById("slaveModeButton").click();
setTimeout(function(){document.getElementById("slaveModeButton").click();},100);
