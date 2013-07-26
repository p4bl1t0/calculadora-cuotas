/*!Copyright (C) 2013 by WebReflection */
(function(h){
/*! (C) WebReflection Mit Style License */
;if(document.createEvent){return}var b=true,g=false,v="onreadystatechange",m="DOMContentLoaded",q="__IE8__"+Math.random(),t=h.Object,f=t.defineProperty||function(y,z,A){y[z]=A.value},s=t.defineProperties||function(y,A){for(var z in A){if(i.call(A,z)){f(y,z,A[z])}}},i=t.prototype.hasOwnProperty,u=h.Element.prototype,e=h.Event.prototype,x=h.HTMLDocument.prototype,p=h.Window.prototype,k=/^[a-z]+$/,w=/loaded|complete/,j={},l=document.createElement("div");function o(z,D,E,B){for(var G,A=E.slice(),F=r(D,z),C=0,y=A.length;C<y;C++){handler=A[C];if(typeof handler==="object"&&typeof handler.handleEvent==="function"){handler.handleEvent(F)}else{handler.call(z,F)}if(F.stoppedImmediatePropagation){break}}G=!F.stoppedPropagation;if(G&&!B&&!d(z)){F.cancelBubble=true}return(B&&G&&z.parentNode)?z.parentNode.dispatchEvent(F):!F.defaultPrevented}function r(z,y){z.currentTarget=y;z.eventPhase=(z.target===z.currentTarget?2:3);return z}function n(A,z){var y=A.length;while(y--&&A[y]!==z){}return y}function d(y){return y.nodeType!==9&&document.documentElement.contains(y)}function c(y){if(!g&&w.test(document.readyState)){g=!g;document.detachEvent(v,c);y=document.createEvent("Event");y.initEvent(m,true,true);document.dispatchEvent(y)}}function a(y,z){if(!z){z=h.event}if(!z.target){z.target=z.srcElement||z.fromElement||document}if(!z.timeStamp){z.timeStamp=(new Date).getTime()}return z}s(u,{addEventListener:{value:function(C,F,E){var G=this,y="on"+C,D=G[q]||f(G,q,{value:{}})[q],A=D[y]||(D[y]={}),z=A.h||(A.h=[]),B;if(!i.call(A,"w")){A.w=function(H){return H[q]||o(G,a(G,H),z,false)};if(!i.call(j,y)){if(k.test(C)){try{B=document.createEventObject();B[q]=true;if(G.nodeType!=9&&G.parentNode==null){l.appendChild(G)}G.fireEvent(y,B);j[y]=true}catch(B){j[y]=false;while(l.hasChildNodes()){l.removeChild(l.firstChild)}}}else{j[y]=false}}if(A.n=j[y]){G.attachEvent(y,A.w)}}if(n(z,F)<0){z[E?"unshift":"push"](F)}}},dispatchEvent:{value:function(E){var z=this,C="on"+E.type,D=z[q],A=D&&D[C],B=!!A,y;if(!E.target){E.target=z}return B?(A.n&&d(z)?(z.fireEvent(C,E),!E.defaultPrevented):o(z,E,A.h,true)):((y=z.parentNode)&&d(z)?y.dispatchEvent(E):true)}},removeEventListener:{value:function(C,F,E){var G=this,y="on"+C,D=G[q],B=D&&D[y],z=B&&B.h,A=z?n(z,F):-1;if(-1<A){z.splice(A,1)}}}});s(e,{bubbles:{value:true,writable:true},cancelable:{value:true,writable:true},preventDefault:{value:function(){if(this.cancelable){this.defaultPrevented=true;this.returnValue=false}}},stopPropagation:{value:function(){this.stoppedPropagation=true;this.cancelBubble=true}},stopImmediatePropagation:{value:function(){this.stoppedImmediatePropagation=true;this.stopPropagation()}},initEvent:{value:function(A,z,y){this.type=A;this.bubbles=!!z;this.cancelable=!!y;if(!this.bubbles){this.stopPropagation()}}}});s(x,{addEventListener:{value:function(C,B,A){var z=this;u.addEventListener.call(z,C,B,A);if(b&&C===m&&!w.test(z.readyState)){b=false;z.attachEvent(v,c);if(h==top){(function y(E){try{z.documentElement.doScroll("left");c()}catch(D){setTimeout(y,50)}}())}}}},dispatchEvent:{value:u.dispatchEvent},removeEventListener:{value:u.removeEventListener},createEvent:{value:function(y){var z;if(y!=="Event"){throw new Error("unsupported "+y)}z=document.createEventObject();z.timeStamp=(new Date).getTime();return z}}});s(p,{addEventListener:{value:function(C,B,A){var z=h,D="on"+C,y;if(!z[D]){z[D]=function(E){return o(z,a(z,E),y,false)}}y=z[D][q]||(z[D][q]=[]);if(n(y,B)<0){y[A?"unshift":"push"](B)}}},dispatchEvent:{value:function(y){var z=h["on"+y.type];return z?z.call(h,y)!==false&&!y.defaultPrevented:true}},removeEventListener:{value:function(C,B,z){var D="on"+C,y=(h[D]||t)[q],A=y?n(y,B):-1;if(-1<A){y.splice(A,1)}}}})}(this));