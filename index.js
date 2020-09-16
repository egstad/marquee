"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var Marquee=/*#__PURE__*/function(){function a(b){// marquee el
if(_classCallCheck(this,a),"object"===_typeof(b))this.el=b;else if("string"==typeof b)this.el=document.querySelector(b);else throw new TypeError("Marquee accepts either a HTML Element (object) or a class/id to query (string).");// marquee content
this.sign=this.el.children[0],this.RAF=null,this.offset=this.el.offsetWidth,this.speed=this.el.dataset.speed||1,this.styleElements(),this.init()}return _createClass(a,[{key:"init",value:function init(){this.draw()}},{key:"styleElements",value:function styleElements(){this.el.style.display="flex",this.sign.style.display="inline-flex"}},{key:"draw",value:function draw(){var a=this,b=function(){a.RAF=requestAnimationFrame(b),a.offset-=a.speed,a.sign.style.transform="translate3d(".concat(a.offset,"px, 0, 0)")};requestAnimationFrame(b)}},{key:"stop",value:function stop(){cancelAnimationFrame(this.RAF)}},{key:"reset",value:function reset(){this.offset=this.el.offsetWidth,this.sign.style.transform="translate3d(".concat(this.offset,"px, 0, 0)")}},{key:"destroy",value:function destroy(){this.stop()}}]),a}();exports.default=Marquee;