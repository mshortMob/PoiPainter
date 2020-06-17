initGlobalVars()
function initGlobalVars(){
     displayObjectsArray = [];
     currentObject = "";
}

var displayObject = function(id, classNumber, image, mask, zindex, opacity,isCurrent){
    this.id=id;
    this.classNumber =classNumber;
    this.image=document.getElementById('imageSelector').value;
    this.mask=document.getElementById('maskSelector').value;
    this.zindex=zindex;
    this.opacity=opacity;
    this.isCurrent=isCurrent;
    this.updateOpacity = function(opacity){
       document.getElementById(this.id).style.opacity=opacity;
       this.opacity=opacity
       //console.log(document.getElementById(this.id));
    }
    this.getOpacity = function(opacity){
          return this.opacity;
    }
    this.updateMask = function(){
          var canvas = document.getElementById(this.id);
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.mask=document.getElementById('maskSelector').value
          if (this.mask != 'None' && this.mask != 'Gradient1') {
               var canvas = document.getElementById(this.id);
               var context = canvas.getContext('2d');
               base_image = new Image();
               base_image.src = this.mask;
               base_image.onload = function(){
                    context.drawImage(base_image, 0, 0, base_image.width,base_image.height,0,0, canvas.width,canvas.height);
               }
          }
          if (this.mask == 'None') {
               var canvas = document.getElementById(this.id);
               var context = canvas.getContext('2d');
               context.clearRect(0, 0, canvas.width, canvas.height);
          }
          if (this.mask == 'Gradient1') {
               var canvas = document.getElementById(this.id);
               var context = canvas.getContext('2d');
               var grd = context.createLinearGradient(50, 50, canvas.width, canvas.height);
               grd.addColorStop(0, "black");
               grd.addColorStop(1, "transparent");
               context.fillStyle = grd;
               context.fillRect(0, 0, canvas.width, canvas.height);          
          }          
          

    }
    this.updateImage = function(){
          this.image=document.getElementById('imageSelector').value;
          document.getElementById(this.id).src="http://www.nimbuslaboratory.com/Fractals%20"+this.image+".mp4";
          // this.image=document.getElementById('imageSelector').value
          // document.getElementById(this.id).style.backgroundImage="url("+this.image+")";
          // console.log(this.image)
    }
    this.setCurrent = function (){
          currentObject=this.id
          var handlesSet = document.getElementsByClassName(this.classNumber)
          for(var x=0; x<handlesSet.length; x++){
               handlesSet[x].style.display='inline'
          }
          this.isCurrent=true;
          document.getElementById("imageSelector").value=document.getElementById(currentObject).src.substring(43,document.getElementById(currentObject).src.length-4);
          document.getElementById("maskSelector").value=this.mask;
    }
    this.setNotCurrent = function (){
          var handlesSet = document.getElementsByClassName(this.classNumber)
          for(var x=0; x<handlesSet.length; x++){
               handlesSet[x].style.display='none'
          }
          this.isCurrent=false;
    }
    this.init = function () {
          //hide All Handles
          for(var x=0; x<displayObjectsArray.length;x++){
               var handlesSet = document.getElementsByClassName('handlesSet'+x)
               for(var x=0; x<handlesSet.length; x++){
                    handlesSet[x].style.display='none'
               }
          }
          //addObject(this.id, this.image)
          var node = document.createElement("video");
          //node.style.backgroundImage="url("+this.image+")";
          //node.style.backgroundSize="cover";
          //node.style.backgroundRepeat="no-repeat";
          node.setAttribute("Id",this.id)
          node.setAttribute("class","displayCanvas")
          node.setAttribute("onclick",'selectObject(this.id)')
          node.src="http://www.nimbuslaboratory.com/Fractals%201.mp4"
          node.width=640;
          node.height=360;
          node.autoplay=true;
          node.loop=true;
          //node.setAttribute("onmousedown",'showCoords(event);')
          document.body.appendChild(node);
          makeTransformable("#"+ this.id)
          //mask section
          if (this.mask != 'None') {
               var canvas = document.getElementById(this.id);
               var context = canvas.getContext('2d');
               base_image = new Image();
               base_image.src = this.mask;
               base_image.onload = function(){
               context.drawImage(base_image, 0, 0, base_image.width,base_image.height,0,0, canvas.width,canvas.height)             
          }
          if (this.mask != 'Gradient1') {
               var canvas = document.getElementById(this.id);
               var context = canvas.getContext('2d');
               var grd = context.createLinearGradient(50, 50, canvas.width, canvas.height);
               grd.addColorStop(0, "black");
               grd.addColorStop(1, "transparent");
               context.fillStyle = grd;
               context.fillRect(0, 0, canvas.width, canvas.height);          
          }          
        }
        selectObject(this.id);
    }
    this.init();
}

function addObject(){
     displayObjectsArray.push(new displayObject(displayObjectsArray.length, 'handlesSet'+displayObjectsArray.length, "anim1.gif", 'mask1.png', 1, 1, true))
}

function removeCurrentObject(){
     document.getElementById(currentObject).style.display='none';
     selectObject(currentObject)
}

function selectObject(id){
     for(var x=0;x<displayObjectsArray.length;x++){
          if (x==id) {
              if (displayObjectsArray[x].isCurrent==true) {
                    displayObjectsArray[id].setNotCurrent(); 
              }else{
                    displayObjectsArray[id].setCurrent(); 
              } 
          }else{
              displayObjectsArray[x].setNotCurrent();    
          }  
     }
     currentObject=id;
}

function changeCurrentImage(){
     if (displayObjectsArray[currentObject].isCurrent) {
           displayObjectsArray[currentObject].updateImage();
     }
}

function changeCurrentMask(){
     if (displayObjectsArray[currentObject].isCurrent) {
           displayObjectsArray[currentObject].updateMask();
     }
}

function hideControls(){
     document.getElementById('controls').style.display='none'
     document.getElementById('showControlsButton').style.display='inline';
}

function showControls(){
     document.getElementById('controls').style.display='inline'
     document.getElementById('showControlsButton').style.display='none';
}

function requestFullScreen() {
    // Supports most browsers and their versions.
    var element = document.body; // Make the body go full screen.
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

initStretcher();
function initStretcher() {
(function() {
  var $, applyTransform, getTransform, makeTransformable;
  $ = jQuery;
  getTransform = function(from, to) {
    var A, H, b, h, i, k_i, lhs, rhs, _i, _j, _k, _ref;
    console.assert((from.length === (_ref = to.length) && _ref === 4));
    A = [];
    for (i = _i = 0; _i < 4; i = ++_i) {
      A.push([from[i].x, from[i].y, 1, 0, 0, 0, -from[i].x * to[i].x, -from[i].y * to[i].x]);
      A.push([0, 0, 0, from[i].x, from[i].y, 1, -from[i].x * to[i].y, -from[i].y * to[i].y]);
    }
    b = [];
    for (i = _j = 0; _j < 4; i = ++_j) {
      b.push(to[i].x);
      b.push(to[i].y);
    }
    h = numeric.solve(A, b);
    H = [[h[0], h[1], 0, h[2]], [h[3], h[4], 0, h[5]], [0, 0, 1, 0], [h[6], h[7], 0, 1]];
    for (i = _k = 0; _k < 4; i = ++_k) {
      lhs = numeric.dot(H, [from[i].x, from[i].y, 0, 1]);
      k_i = lhs[3];
      rhs = numeric.dot(k_i, [to[i].x, to[i].y, 0, 1]);
      console.assert(numeric.norm2(numeric.sub(lhs, rhs)) < 1e-9, "Not equal:", lhs, rhs);
    }
    return H;
  };
  applyTransform = function(element, originalPos, targetPos, callback) {
    var H, from, i, j, p, to;
    from = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = originalPos.length; _i < _len; _i++) {
        p = originalPos[_i];
        _results.push({
          x: (p[0] - originalPos[0][0])-15,
          y: (p[1] - originalPos[0][1])-15
        });
      }
      return _results;
    })();
    to = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = targetPos.length; _i < _len; _i++) {
        p = targetPos[_i];
        _results.push({
          x: p[0] - originalPos[0][0],
          y: p[1] - originalPos[0][1]
        });
      }
      return _results;
    })();
    H = getTransform(from, to);
    $(element).css({
      'transform': "matrix3d(" + (((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i < 4; i = ++_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (j = _j = 0; _j < 4; j = ++_j) {
              _results1.push(H[j][i].toFixed(20));
            }
            return _results1;
          })());
        }
        return _results;
      })()).join(',')) + ")",
      'transform-origin': '0 0'
    });
    return typeof callback === "function" ? callback(element, H) : void 0;
  };
  classCount=0;
  makeTransformable = function(selector, callback) {
    return $(selector).each(function(i, element) {
      var controlPoints, originalPos, p, position;
      $(element).css('transform', '');
      controlPoints = (function() {
        var _i, _len, _ref, _results;
        _ref = ['left top', 'left bottom', 'right top', 'right bottom'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          position = _ref[_i];
          _results.push($('<div class=handlesSet'+classCount+'>').css({
            border: '3px solid darkgrey',
            borderRadius: '8px',
            cursor: 'move',
            position: 'absolute',
            zIndex: 100000
          }).appendTo('body').position({
            at: position,
            of: element,
            collision: 'none'
          }));
        }
        classCount=classCount+1;
        return _results;
      })();
      originalPos = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = controlPoints.length; _i < _len; _i++) {
          p = controlPoints[_i];
          _results.push([p.offset().left, p.offset().top]);
        }
        return _results;
      })();
      $(controlPoints).draggable({
        start: (function(_this) {
          return function() {
            return $(element).css('pointer-events', 'none');
          };
        })(this),
        drag: (function(_this) {
          return function() {
            return applyTransform(element, originalPos, (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = controlPoints.length; _i < _len; _i++) {
                p = controlPoints[_i];
                _results.push([p.offset().left, p.offset().top]);
              }
              return _results;
            })(), callback);
          };
        })(this),
        stop: (function(_this) {
          return function() {
            applyTransform(element, originalPos, (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = controlPoints.length; _i < _len; _i++) {
                p = controlPoints[_i];
                _results.push([p.offset().left, p.offset().top]);
              }
              return _results;
            })(), callback);
            return $(element).css('pointer-events', 'auto');
          };
        })(this)
      });
      return element;
    });
  };
  window.makeTransformable = makeTransformable
}).call(this);
}