!function(){"use strict";function t(t,e,n){for(var r=e,i=0,o=n.length;i<o;++i)r=t(r,n[i],i);return r}var e=function(t){return t};function n(t){function e(n,r){switch(arguments.length){case 0:return e;case 1:return function(e){return t(n,e)};default:return t(n,r)}}return e}function r(t){function e(r,i,o){switch(arguments.length){case 0:return e;case 1:return n(function(e,n){return t(r,e,n)});case 2:return function(e){return t(r,i,e)};default:return t(r,i,o)}}return e}var i=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},o=function(){function t(e,n,r,o,s){i(this,t),this.time=e,this.localOffset=n,this.period=r,this.task=o,this.scheduler=s,this.active=!0}return t.prototype.run=function(){return this.task.run(this.time-this.localOffset)},t.prototype.error=function(t){return this.task.error(this.time-this.localOffset,t)},t.prototype.dispose=function(){return this.scheduler.cancel(this),this.task.dispose()},t}(),s=function(){function t(e,n){i(this,t),this.origin=e,this.scheduler=n}return t.prototype.currentTime=function(){return this.scheduler.currentTime()-this.origin},t.prototype.scheduleTask=function(t,e,n,r){return this.scheduler.scheduleTask(t+this.origin,e,n,r)},t.prototype.relative=function(e){return new t(e+this.origin,this.scheduler)},t.prototype.cancel=function(t){return this.scheduler.cancel(t)},t.prototype.cancelAll=function(t){return this.scheduler.cancelAll(t)},t}(),c=function(t){return Promise.resolve(t).then(u)};function u(t){try{return t.run()}catch(e){return t.error(e)}}var l=function(){function t(e,n){var r=this;i(this,t),this.timer=e,this.timeline=n,this._timer=null,this._nextArrival=1/0,this._runReadyTasksBound=function(){return r._runReadyTasks(r.currentTime())}}return t.prototype.currentTime=function(){return this.timer.now()},t.prototype.scheduleTask=function(t,e,n,r){var i=this.currentTime()+Math.max(0,e),s=new o(i,t,n,r,this);return this.timeline.add(s),this._scheduleNextRun(),s},t.prototype.relative=function(t){return new s(t,this)},t.prototype.cancel=function(t){t.active=!1,this.timeline.remove(t)&&this._reschedule()},t.prototype.cancelAll=function(t){this.timeline.removeAll(t),this._reschedule()},t.prototype._reschedule=function(){this.timeline.isEmpty()?this._unschedule():this._scheduleNextRun(this.currentTime())},t.prototype._unschedule=function(){this.timer.clearTimer(this._timer),this._timer=null},t.prototype._scheduleNextRun=function(){if(!this.timeline.isEmpty()){var t=this.timeline.nextArrival();null===this._timer?this._scheduleNextArrival(t):t<this._nextArrival&&(this._unschedule(),this._scheduleNextArrival(t))}},t.prototype._scheduleNextArrival=function(t){this._nextArrival=t;var e=Math.max(0,t-this.currentTime());this._timer=this.timer.setTimer(this._runReadyTasksBound,e)},t.prototype._runReadyTasks=function(){this._timer=null,this.timeline.runTasks(this.currentTime(),u),this._scheduleNextRun()},t}(),a=function(){function t(){i(this,t),this.tasks=[]}return t.prototype.nextArrival=function(){return this.isEmpty()?1/0:this.tasks[0].time},t.prototype.isEmpty=function(){return 0===this.tasks.length},t.prototype.add=function(t){f(t,this.tasks)},t.prototype.remove=function(t){var e=d(p(t),this.tasks);if(e>=0&&e<this.tasks.length){var n=function(t,e){for(var n=0,r=e.length;n<r;++n)if(t===e[n])return n;return-1}(t,this.tasks[e].events);if(n>=0)return this.tasks[e].events.splice(n,1),!0}return!1},t.prototype.removeAll=function(t){for(var e=0;e<this.tasks.length;++e)n=t,(r=this.tasks[e]).events=function(t,e){for(var n,r=e.length,i=new Array(r),o=0,s=0;s<r;++s)t(n=e[s])||(i[o]=n,++o);return i.length=o,i}(n,r.events);var n,r},t.prototype.runTasks=function(t,e){for(var n=this.tasks,r=n.length,i=0;i<r&&n[i].time<=t;)++i;this.tasks=n.slice(i);for(var o=0;o<i;++o)this.tasks=h(e,n[o].events,this.tasks)},t}();function h(t,e,n){for(var r=0;r<e.length;++r){var i=e[r];i.active&&(t(i),i.period>=0&&i.active&&(i.time=i.time+i.period,f(i,n)))}return n}function f(t,e){var n=e.length,r=p(t);if(0!==n){var i=d(r,e);i>=n?e.push(v(r,[t])):function(t,e,n,r){var i=e[r];n===i.time?(o=t,0===(s=i.events).length||o.time>=s[s.length-1].time?s.push(o):function(t,e){for(var n=0;n<e.length;n++)if(t.time<e[n].time){e.splice(n,0,t);break}}(o,s)):e.splice(r,0,v(n,[t]));var o,s}(t,e,r,i)}else e.push(v(r,[t]))}function p(t){return Math.floor(t.time)}function d(t,e){for(var n=0,r=e.length,i=void 0,o=void 0;n<r;){if(t===(o=e[i=Math.floor((n+r)/2)]).time)return i;t<o.time?r=i:n=i+1}return r}var v=function(t,e){return{time:t,events:e}},m=function(){function t(e){i(this,t),this._clock=e}return t.prototype.now=function(){return this._clock.now()},t.prototype.setTimer=function(t,e){return e<=0?function(t){var e=new y(t);return c(e),e}(t):setTimeout(t,e)},t.prototype.clearTimer=function(t){return t instanceof y?t.cancel():clearTimeout(t)},t}(),y=function(){function t(e){i(this,t),this.f=e,this.active=!0}return t.prototype.run=function(){return this.active&&this.f()},t.prototype.error=function(t){throw t},t.prototype.cancel=function(){this.active=!1},t}();var g=function(){function t(e,n){i(this,t),this.origin=n,this.clock=e}return t.prototype.now=function(){return this.clock.now()-this.origin},t}(),w=function(){function t(e,n){i(this,t),this.origin=n,this.hrtime=e}return t.prototype.now=function(){var t=this.hrtime(this.origin);return(1e9*t[0]+t[1])/1e6},t}(),b=function(t){return new g(t,t.now())},k=function(){return"undefined"!=typeof performance&&"function"==typeof performance.now?b(performance):"undefined"!=typeof process&&"function"==typeof process.hrtime?new w(process.hrtime,process.hrtime()):b(Date)},x=n(function(t,e){return e.scheduleTask(0,0,-1,t)}),N=function(){return new m(k())},_=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},T=new(function(){function t(){_(this,t)}return t.prototype.dispose=function(){},t}()),E=function(t){return new C(t)},A=n(function(t,e){return E([t,e])}),C=function(){function t(e){_(this,t),this.disposables=e}return t.prototype.dispose=function(){j($(this.disposables))},t}(),$=function(e){return t(O,[],e)},O=function(t,e){try{e.dispose()}catch(e){t.push(e)}return t},j=function(t){if(t.length>0)throw new S(t.length+" errors",t)},S=function(t){function e(n,r){t.call(this,n),this.message=n,this.name=e.name,this.errors=r,t.captureStackTrace&&t.captureStackTrace(this,e),this.stack=""+this.stack+L(this.errors)}return e.prototype=Object.create(t.prototype),e}(Error),L=function(e){return t(M,"",e)},M=function(t,e,n){return t+"\n["+(n+1)+"] "+e.stack},R=r(function(t,e,n){try{e.dispose()}catch(e){n.error(t,e)}});function P(t){throw t}var D=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},B=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},H=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},I=function(t,e,n){return new V(t,e,n)},z=function(t,e){return I(W,t,e)},F=function(t){return I(q,void 0,t)},V=function(){function t(e,n,r){D(this,t),this._run=e,this.value=n,this.sink=r,this.active=!0}return t.prototype.dispose=function(){this.active=!1},t.prototype.run=function(t){if(this.active){var e=this._run;e(t,this.value,this.sink)}},t.prototype.error=function(t,e){if(this.active){this.sink.error(t,e)}else setTimeout(P,0,e)},t}(),W=function(t,e,n){return n.event(t,e)},q=function(t,e,n){return n.end(t)},G=function(){return U},Z=function(t){return t===U},U=new(function(){function t(){D(this,t)}return t.prototype.run=function(t,e){return x(F(t),e)},t}()),J=(new(function(){function t(){D(this,t)}return t.prototype.run=function(){return T},t}()),function(){function t(e){D(this,t),this.sink=e}return t.prototype.event=function(t,e){return this.sink.event(t,e)},t.prototype.end=function(t){return this.sink.end(t)},t.prototype.error=function(t,e){return this.sink.error(t,e)},t}()),K=function(){function t(e,n){D(this,t),this.p=e,this.source=n}return t.prototype.run=function(t,e){return this.source.run(new Q(this.p,t),e)},t.create=function(e,n){return Z(n)?n:n instanceof t?new t(X(n.p,e),n.source):new t(e,n)},t}(),Q=function(t){B(e,t);function e(n,r){D(this,e);var i=H(this,t.call(this,r));return i.p=n,i}return e.prototype.event=function(t,e){(0,this.p)(e)&&this.sink.event(t,e)},e}(J),X=function(t,e){return function(n){return t(n)&&e(n)}},Y=function(){function t(e,n,r){D(this,t),this.p=e,this.f=n,this.source=r}return t.prototype.run=function(t,e){return this.source.run(new tt(this.p,this.f,t),e)},t}(),tt=function(t){B(e,t);function e(n,r,i){D(this,e);var o=H(this,t.call(this,i));return o.p=n,o.f=r,o}return e.prototype.event=function(t,e){var n=this.f;(0,this.p)(e)&&this.sink.event(t,n(e))},e}(J),et=function(){function t(e,n){D(this,t),this.f=e,this.source=n}return t.prototype.run=function(t,e){return this.source.run(new nt(this.f,t),e)},t.create=function(e,n){if(Z(n))return G();if(n instanceof t)return new t((r=e,i=n.f,function(t){return r(i(t))}),n.source);var r,i;return n instanceof K?new Y(n.p,e,n.source):new t(e,n)},t}(),nt=function(t){B(e,t);function e(n,r){D(this,e);var i=H(this,t.call(this,r));return i.f=n,i}return e.prototype.event=function(t,e){var n=this.f;this.sink.event(t,n(e))},e}(J),rt=function(){function t(){D(this,t),this.disposable=void 0,this.disposed=!1}return t.prototype.setDisposable=function(t){if(void 0!==this.disposable)throw new Error("setDisposable called more than once");this.disposable=t,this.disposed&&t.dispose()},t.prototype.dispose=function(){this.disposed||(this.disposed=!0,void 0!==this.disposable&&this.disposable.dispose())},t}(),it=n(function(t,e){return new Promise(function(n,r){return function(t,e,n,r){var i=new rt,o=new ot(n,r,i);i.setDisposable(t.run(o,e))}(t,e,n,r)})});var ot=function(){function t(e,n,r){D(this,t),this._end=e,this._error=n,this._disposable=r,this.active=!0}return t.prototype.event=function(t,e){},t.prototype.end=function(t){this.active&&this._dispose(this._error,this._end,void 0)},t.prototype.error=function(t,e){this._dispose(this._error,this._error,e)},t.prototype._dispose=function(t,e,n){this.active=!1,function(t,e,n,r){try{r.dispose()}catch(e){return void t(e)}e(n)}(t,e,n,this._disposable)},t}();var st=function(){function t(e,n,r){D(this,t),this.source=r,this.f=e,this.value=n}return t.prototype.run=function(t,e){var n=x(z(this.value,t),e),r=this.source.run(new ct(this.f,this.value,t),e);return A(n,r)},t}(),ct=function(t){B(e,t);function e(n,r,i){D(this,e);var o=H(this,t.call(this,i));return o.f=n,o.value=r,o}return e.prototype.event=function(t,e){var n=this.f;this.value=n(this.value,e),this.sink.event(t,this.value)},e}(J),ut=function(){function t(e,n){D(this,t),this.source=n,this.f=e}return t.prototype.run=function(t,e){return this.source.run(new lt(this.f,t),e)},t}(),lt=function(t){B(e,t);function e(n,r){D(this,e);var i=H(this,t.call(this,r));return i.f=n,i}return e.prototype.event=function(t,e){(0,this.f)(e),this.sink.event(t,e)},e}(J),at=function(t){B(e,t);function e(n,r){D(this,e);var i=H(this,t.call(this,r));return i.index=n,i.active=!0,i.value=void 0,i}return e.prototype.event=function(t,e){this.active&&(this.value=e,this.sink.event(t,this))},e.prototype.end=function(t){this.active&&(this.active=!1,this.sink.event(t,this))},e}(J);var ht=function(e){return 0===e.length?G():1===e.length?e[0]:new vt(t(dt,[],e))},ft=function(t){return t.filter(pt)},pt=function(t){return!Z(t)},dt=function(t,e){return t.concat(e instanceof vt?e.sources:e)},vt=function(){function t(e){D(this,t),this.sources=e}return t.prototype.run=function(t,e){for(var n,r=this.sources.length,i=new Array(r),o=new Array(r),s=new mt(i,o,t),c=0;c<r;++c)n=o[c]=new at(c,s),i[c]=this.sources[c].run(n,e);return E(i)},t}(),mt=function(t){B(e,t);function e(n,r,i){D(this,e);var o=H(this,t.call(this,i));return o.disposables=n,o.activeCount=r.length,o}return e.prototype.event=function(t,e){e.active?this.sink.event(t,e.value):this._dispose(t,e.index)},e.prototype._dispose=function(t,e){R(t,this.disposables[e],this.sink),0==--this.activeCount&&this.sink.end(t)},e}(J);var yt=n(it),gt=r(function(t,e,n){return new st(t,e,n)}),wt=n(function(t,e){return et.create(t,e)}),bt=n(function(t,e){return new ut(t,e)}),kt=function(t,e,n){return void 0===n&&(n=!1),new xt(t,e,n)},xt=function(t,e,n){this.event=t,this.node=e,this.capture=n};xt.prototype.run=function(t,e){var n=this,r=function(n){return function(t,e,n){try{n.event(t,e)}catch(e){n.error(t,e)}}(e.currentTime(),n,t)};return this.node.addEventListener(this.event,r,this.capture),{dispose:function(){return n.node.removeEventListener(n.event,r,n.capture)}}};function Nt(){}const _t=(t,e)=>{const n="_"+t+"$";return{get(){return this[n]||(this[t]=e.call(this,t))},set(t){Object.defineProperty(this,n,{configurable:!0,value:t})}}},Tt={},Et=[],At=Tt.hasOwnProperty;let Ct=0;var $t=(t,e)=>{for(let n=0;n<Ct;n++){let r=Et[n];if(At.call(t,r))return Tt[r](t[r],e)}};const Ot=document.defaultView,jt=1,St="http://www.w3.org/2000/svg",Lt="connected",Mt="dis"+Lt,Rt=/^style|textarea$/i,Pt="_hyper: "+(Math.random()*new Date|0)+";",Dt="\x3c!--"+Pt+"--\x3e";let Bt=Ot.Event;try{new Bt("Event")}catch(t){Bt=function(t){const e=document.createEvent("Event");return e.initEvent(t,!1,!1),e}}const Ht=Ot.Map||function(){const t=[],e=[];return{get:n=>e[t.indexOf(n)],set(n,r){e[t.push(n)-1]=r}}},It=Ot.WeakMap||function(){return{get:t=>t[Pt],set(t,e){Object.defineProperty(t,Pt,{configurable:!0,value:e})}}},zt=Ot.WeakSet||function(){const t=new It;return{add(e){t.set(e,!0)},has:e=>!0===t.get(e)}},Ft=Array.isArray||(Vt={}.toString,t=>"[object Array]"===Vt.call(t));var Vt;const Wt=Pt.trim||function(){return this.replace(/^\s+|\s+$/g,"")},qt=(t,e)=>Gt(t).createElement(e),Gt=t=>t.ownerDocument||t,Zt=t=>Gt(t).createDocumentFragment(),Ut=(t,e)=>Gt(t).createTextNode(e),Jt=Zt(document),Kt="append"in Jt,Qt="content"in qt(document,"template");Jt.appendChild(Ut(Jt,"g")),Jt.appendChild(Ut(Jt,""));const Xt=1===Jt.cloneNode(!0).childNodes.length,Yt="importNode"in document,te=Kt?(t,e)=>{t.append.apply(t,e)}:(t,e)=>{const n=e.length;for(let r=0;r<n;r++)t.appendChild(e[r])},ee="[^\\S]+[^ \\f\\n\\r\\t\\/>\"'=]+",ne=new RegExp("(<[a-z]+[a-z0-9:_-]*)((?:"+ee+"(?:=(?:'.*?'|\".*?\"|<.+?>|\\S+))?)+)([^\\S]*/?>)","gi"),re=new RegExp("("+ee+"=)(['\"]?)"+Dt+"\\2","gi"),ie=(t,e,n,r)=>e+n.replace(re,oe)+r,oe=(t,e,n)=>e+(n||'"')+Pt+(n||'"'),se=(t,e)=>("ownerSVGElement"in t?pe:fe)(t,e.replace(ne,ie)),ce=Xt?t=>{const e=t.cloneNode(),n=t.childNodes||[],r=n.length;for(let t=0;t<r;t++)e.appendChild(ce(n[t]));return e}:t=>t.cloneNode(!0),ue=Yt?(t,e)=>t.importNode(e,!0):(t,e)=>ce(e),le=[].slice,ae=t=>he(t);let he=t=>{if(t.propertyIsEnumerable("raw")||/Firefox\/(\d+)/.test((Ot.navigator||{}).userAgent)&&parseFloat(RegExp.$1)<55){const t={};he=(e=>{const n="_"+e.join(Pt);return t[n]||(t[n]=e)})}else he=(t=>t);return he(t)};const fe=Qt?(t,e)=>{const n=qt(t,"template");return n.innerHTML=e,n.content}:(t,e)=>{const n=qt(t,"template"),r=Zt(t);if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){const t=RegExp.$1;n.innerHTML="<table>"+e+"</table>",te(r,le.call(n.querySelectorAll(t)))}else n.innerHTML=e,te(r,le.call(n.childNodes));return r},pe=Qt?(t,e)=>{const n=Zt(t),r=Gt(t).createElementNS(St,"svg");return r.innerHTML=e,te(n,le.call(r.childNodes)),n}:(t,e)=>{const n=Zt(t),r=qt(t,"div");return r.innerHTML='<svg xmlns="'+St+'">'+e+"</svg>",te(n,le.call(r.firstChild.childNodes)),n};function de(t){this.childNodes=t,this.length=t.length,this.first=t[0],this.last=t[this.length-1]}de.prototype.insert=function(){const t=Zt(this.first);return te(t,this.childNodes),t},de.prototype.remove=function(){const t=this.first,e=this.last;if(2===this.length)e.parentNode.removeChild(e);else{const n=Gt(t).createRange();n.setStartBefore(this.childNodes[1]),n.setEndAfter(e),n.deleteContents()}return t};const ve=(t,e,n)=>{t.unshift(t.indexOf.call(e.childNodes,n))};var me=(t,e,n)=>({type:t,name:n,node:e,path:(t=>{const e=[];let n;switch(t.nodeType){case jt:case 11:n=t;break;case 8:n=t.parentNode,ve(e,n,t);break;default:n=t.ownerElement}for(t=n;n=n.parentNode;t=n)ve(e,n,t);return e})(e)}),ye=(t,e)=>{const n=e.length;for(let r=0;r<n;r++)t=t.childNodes[e[r]];return t};const ge=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;const we=(t,e)=>{let n,r;return i=>{switch(typeof i){case"object":if(i){if("object"===n){if(!e&&r!==i)for(const e in r)e in i||(t[e]="")}else e?t.value="":t.cssText="";const o=e?{}:t;for(const t in i){const e=i[t];o[t]="number"!=typeof e||ge.test(t)?e:e+"px"}n="object",e?t.value=xe(r=o):r=i;break}default:r!=i&&(n="string",r=i,e?t.value=i||"":t.cssText=i||"")}}},be=/([^A-Z])([A-Z]+)/g,ke=(t,e,n)=>e+"-"+n.toLowerCase(),xe=t=>{const e=[];for(const n in t)e.push(n.replace(be,ke),":",t[n],";");return e.join("")},Ne=t=>t,_e=(t,e,n,r,i)=>{const o=r||Ne,s=null==i?null:o(i,0);let c=0,u=0,l=e.length-1,a=e[0],h=e[l],f=n.length-1,p=n[0],d=n[f];for(;c<=l&&u<=f;)if(null==a)a=e[++c];else if(null==h)h=e[--l];else if(null==p)p=n[++u];else if(null==d)d=n[--f];else if(a==p)a=e[++c],p=n[++u];else if(h==d)h=e[--l],d=n[--f];else if(a==d)t.insertBefore(o(a,1),o(h,-0).nextSibling),a=e[++c],d=n[--f];else if(h==p)t.insertBefore(o(h,1),o(a,0)),h=e[--l],p=n[++u];else{let r=e.indexOf(p);if(r<0)t.insertBefore(o(p,1),o(a,0)),p=n[++u];else{let i=e[r];e[r]=null,t.insertBefore(o(i,1),o(a,0)),p=n[++u]}}if(c>l){const e=n[f+1],r=null!=e?o(e,0):s;for(;u<=f;){const e=n[u++];null!=e&&t.insertBefore(o(e,1),r)}}else if(u>f)for(;c<=l;){const n=e[c++];null!=n&&t.removeChild(o(n,-1))}return n},Te=new zt;function Ee(){}Ee.prototype=Object.create(null);const Ae=t=>({html:t}),Ce=(t,e)=>"ELEMENT_NODE"in t?t:t.constructor===de?1/e<0?e?t.remove():t.last:e?t.insert():t.first:Ce(t.render(),e),$e=(t,e,n)=>{const r=t.childNodes,i=r.length;for(let o=0;o<i;o++){let i=r[o];switch(i.nodeType){case jt:Oe(i,e,n),$e(i,e,n);break;case 8:i.textContent===Pt&&(n.shift(),e.push(Rt.test(t.nodeName)?me("text",t):me("any",i)));break;case 3:Rt.test(t.nodeName)&&Wt.call(i.textContent)===Dt&&(n.shift(),e.push(me("text",t)))}}},Oe=(t,e,n)=>{const r=new Ee,i=t.attributes,o=le.call(i),s=[],c=o.length;for(let t=0;t<c;t++){const c=o[t];if(c.value===Pt){const t=c.name;if(!(t in r)){const o=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1");r[t]=i[o]||i[o.toLowerCase()],e.push(me("attr",r[t],o))}s.push(c)}}const u=s.length;for(let e=0;e<u;e++)t.removeAttributeNode(s[e]);const l=t.nodeName;if(/^script$/i.test(l)){const e=qt(t,l);for(let t=0;t<i.length;t++)e.setAttributeNode(i[t].cloneNode(!0));e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}},je=(t,e)=>{e(t.placeholder),"text"in t?Promise.resolve(t.text).then(String).then(e):"any"in t?Promise.resolve(t.any).then(e):"html"in t?Promise.resolve(t.html).then(Ae).then(e):Promise.resolve($t(t,e)).then(e)},Se=t=>null!=t&&"then"in t,Le=(t,e)=>{let n,r=!1;const i=o=>{switch(typeof o){case"string":case"number":case"boolean":r?n!==o&&(n=o,e[0].textContent=o):(r=!0,n=o,e=_e(t.parentNode,e,[Ut(t,o)],Ce,t));break;case"object":case"undefined":if(null==o){r=!1,e=_e(t.parentNode,e,[],Ce,t);break}default:if(r=!1,n=o,Ft(o))if(0===o.length)e.length&&(e=_e(t.parentNode,e,[],Ce,t));else switch(typeof o[0]){case"string":case"number":case"boolean":i({html:o});break;case"object":if(Ft(o[0])&&(o=o.concat.apply([],o)),Se(o[0])){Promise.all(o).then(i);break}default:e=_e(t.parentNode,e,o,Ce,t)}else Me=o,"ELEMENT_NODE"in Me||Me instanceof de||Me instanceof Nt?e=_e(t.parentNode,e,11===o.nodeType?le.call(o.childNodes):[o],Ce,t):Se(o)?o.then(i):"placeholder"in o?je(o,i):"text"in o?i(String(o.text)):"any"in o?i(o.any):"html"in o?e=_e(t.parentNode,e,le.call(se(t,[].concat(o.html).join("")).childNodes),Ce,t):i("length"in o?le.call(o):$t(o,i))}};return i};var Me;const Re=(t,e,n)=>{const r="ownerSVGElement"in t;let i;if("style"===e)return((t,e,n)=>{if(n){const r=e.cloneNode(!0);return r.value="",t.setAttributeNode(r),we(r,n)}return we(t.style,n)})(t,n,r);if(/^on/.test(e)){let n=e.slice(2);return n===Lt||n===Mt?(Be&&(Be=!1,function(){const t=(t,n)=>{const r=new Bt(n),i=t.length;for(let n=0;n<i;n++){let i=t[n];i.nodeType===jt&&e(i,r)}},e=(t,n)=>{if(Te.has(t))t.dispatchEvent(n);else{const r=t.children,i=r.length;for(let t=0;t<i;t++)e(r[t],n)}};try{new MutationObserver(e=>{const n=e.length;for(let r=0;r<n;r++){let n=e[r];t(n.removedNodes,Mt),t(n.addedNodes,Lt)}}).observe(document,{subtree:!0,childList:!0})}catch(e){document.addEventListener("DOMNodeRemoved",e=>{t([e.target],Mt)},!1),document.addEventListener("DOMNodeInserted",e=>{t([e.target],Lt)},!1)}}()),Te.add(t)):e.toLowerCase()in t&&(n=n.toLowerCase()),e=>{i!==e&&(i&&t.removeEventListener(n,i,!1),i=e,e&&t.addEventListener(n,e,!1))}}if("data"===e||!r&&e in t)return n=>{i!==n&&(i=n,t[e]!==n&&(t[e]=n,null==n&&t.removeAttribute(e)))};{let e=!1;const r=n.cloneNode(!0);return n=>{i!==n&&(i=n,r.value!==n&&(null==n?(e&&(e=!1,t.removeAttributeNode(r)),r.value=n):(r.value=n,e||(e=!0,t.setAttributeNode(r)))))}}},Pe=t=>{let e;const n=r=>{e!==r&&(e=r,"object"==typeof r&&r?Se(r)?r.then(n):"placeholder"in r?je(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?le.call(r).join(""):$t(r,n)):t.textContent=null==r?"":r)};return n};var De={create:(t,e)=>{const n=[],r=e.length;for(let i=0;i<r;i++){const r=e[i],o=ye(t,r.path);switch(r.type){case"any":n.push(Le(o,[]));break;case"attr":n.push(Re(o,r.name,r.node));break;case"text":n.push(Pe(o))}}return n},find:$e};let Be=!0;const He=new It,Ie=new Ht;function ze(t){const e=He.get(this);return e&&e.template===ae(t)?Fe.apply(e.updates,arguments):function(t){t=ae(t);const e=Ie.get(t)||function(t){const e=[],n=se(this,t.join(Dt));De.find(n,e,t.slice());const r={fragment:n,paths:e};return Ie.set(t,r),r}.call(this,t),n=ue(this.ownerDocument,e.fragment),r=De.create(n,e.paths);He.set(this,{template:t,updates:r}),Fe.apply(r,arguments),this.textContent="",this.appendChild(n)}.apply(this,arguments),this}function Fe(){const t=arguments.length;for(let e=1;e<t;e++)this[e-1](arguments[e])}const Ve=new It,We=(t,e)=>null==t?qe(e||"html"):Ge(t,e||"html"),qe=t=>{let e,n,r,i,o;return function(s){s=ae(s);let c=i!==s;return c&&(i=s,r=Zt(document),n="svg"===t?document.createElementNS(St,"svg"):r,o=ze.bind(n)),o.apply(null,arguments),c&&("svg"===t&&te(r,le.call(n.childNodes)),e=Ze(r)),e}},Ge=(t,e)=>{const n=e.indexOf(":");let r=Ve.get(t),i=e;return-1<n&&(i=e.slice(n+1),e=e.slice(0,n)||"html"),r||Ve.set(t,r={}),r[i]||(r[i]=qe(e))},Ze=t=>{const e=t.childNodes,n=e.length,r=[];for(let t=0;t<n;t++){let n=e[t];n.nodeType!==jt&&0===Wt.call(n.textContent).length||r.push(n)}return 1===r.length?r[0]:new de(r)},Ue=t=>ze.bind(t);Je=qe,Object.defineProperties(Nt.prototype,{handleEvent:{value(t){const e=t.currentTarget;this["getAttribute"in e&&e.getAttribute("data-call")||"on"+t.type](t)}},html:_t("html",Je),svg:_t("svg",Je),state:_t("state",function(){return this.defaultState}),defaultState:{get:()=>({})},setState:{value(t){const e=this.state,n="function"==typeof t?t.call(this,e):t;for(const t in n)e[t]=n[t];this.render()}}});var Je,Ke=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};var Qe,Xe;const Ye=t=>e=>e?t:"",tn=Ye("completed"),en=Ye("selected"),nn=t=>{const e=(rn=t.todos,rn.reduce((t,{completed:e})=>t+(e?1:0),0));return We()`${on(t)}
    ${sn(t.todos.length>0&&e===t.todos.length,t.todos)}
    ${un(t.todos.length-e,e,t)}`};var rn;const on=t=>We()`<header class="header">
    <h1>todos</h1>
    <form class="add-todo">
      <input class="new-todo" name="new-todo" placeholder="What needs to be done?" autofocus>
    </form>
  </header>`,sn=(t,e)=>We()`<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" checked=${t}>
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class editing when editing and completed when marked as completed -->
      ${e.map(cn)}
    </ul>
  </section>`,cn=({completed:t,description:e})=>We()`<li class="${tn(t)}">
    <div class="view">
      <input class="toggle" type="checkbox" checked=${t}>
      <label>${e}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${e}">
  </li>`,un=(t,e,{todos:n,filter:r})=>We()`<footer class="footer" style="${0===n.length?"display:none":""}">
    <!-- This should be 0 items left by default -->
    <span class="todo-count"><strong>${n.length}</strong> ${1===t?"item":"items"} left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li><a class="${en("/"===r)}" href="#/">All</a><li>
      <li><a class="${en("/active"===r)}" href="#/active">Active</a><li>
      <li><a class="${en("/selected"===r)}" href="#/completed">Completed</a><li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" style="${e>0?"":"display:none"}">Clear completed</button>
  </footer>`,ln=(bt(t=>t.target.reset()),bt(t=>t.preventDefault())),an=(hn=".todoapp",fn=document,fn.querySelector(hn)||(t=>{throw new Error(t)})(`${hn} not found`));var hn,fn;const pn={todos:[],focus:null,filter:"/",nextId:0};var dn;const vn=wt(({target:t})=>{const n=t["new-todo"].value;return n?(t.reset(),dn=n,t=>Ke({},t,{nextId:t.nextId+1,todos:t.todos.concat([(Qe=dn,Xe=t.nextId,{description:Qe,completed:!1,id:Xe})])})):e},ln((mn=an,yn=void 0,void 0===yn&&(yn=!1),kt("submit",mn,yn))));var mn,yn;const gn=wt(t=>(kn=t.newURL.replace(/^.*#/,""),t=>Ke({},t,{filter:kn})),(wn=window,bn=void 0,void 0===bn&&(bn=!1),kt("hashchange",wn,bn)));var wn,bn,kn;yt(gt((t,e)=>Ue(t)`${nn(e)}`,an,gt((t,e)=>e(t),pn,ht(ft([vn,gn])))),new l(N(),new a))}();
//# sourceMappingURL=app.js.map