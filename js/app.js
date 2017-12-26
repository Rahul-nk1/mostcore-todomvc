!function(){"use strict";function t(t,e,n){for(var r=e,i=0,o=n.length;i<o;++i)r=t(r,n[i],i);return r}function e(t,e){if(t<0)throw new TypeError("i must be >= 0");var n=e.length;return 0===n||t>=n?e:1===n?[]:function(t,e,n){var r=new Array(n),i=void 0;for(i=0;i<t;++i)r[i]=e[i];for(i=t;i<n;++i)r[i]=e[i+1];return r}(t,e,n-1)}function n(t,e){for(var n=0,r=e.length;n<r;++n)if(t===e[n])return n;return-1}var r=function(t){return t},i=function(t,e){return function(n){return t(e(n))}};function o(t){function e(n,r){switch(arguments.length){case 0:return e;case 1:return function(e){return t(n,e)};default:return t(n,r)}}return e}function s(t){function e(n,r,i){switch(arguments.length){case 0:return e;case 1:return o(function(e,r){return t(n,e,r)});case 2:return function(e){return t(n,r,e)};default:return t(n,r,i)}}return e}var c=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},u=function(){function t(e,n,r,i,o){c(this,t),this.time=e,this.localOffset=n,this.period=r,this.task=i,this.scheduler=o,this.active=!0}return t.prototype.run=function(){return this.task.run(this.time-this.localOffset)},t.prototype.error=function(t){return this.task.error(this.time-this.localOffset,t)},t.prototype.dispose=function(){return this.scheduler.cancel(this),this.task.dispose()},t}(),a=function(){function t(e,n){c(this,t),this.origin=e,this.scheduler=n}return t.prototype.currentTime=function(){return this.scheduler.currentTime()-this.origin},t.prototype.scheduleTask=function(t,e,n,r){return this.scheduler.scheduleTask(t+this.origin,e,n,r)},t.prototype.relative=function(e){return new t(e+this.origin,this.scheduler)},t.prototype.cancel=function(t){return this.scheduler.cancel(t)},t.prototype.cancelAll=function(t){return this.scheduler.cancelAll(t)},t}(),l=function(t){return Promise.resolve(t).then(h)};function h(t){try{return t.run()}catch(e){return t.error(e)}}var f=function(){function t(e,n){var r=this;c(this,t),this.timer=e,this.timeline=n,this._timer=null,this._nextArrival=1/0,this._runReadyTasksBound=function(){return r._runReadyTasks(r.currentTime())}}return t.prototype.currentTime=function(){return this.timer.now()},t.prototype.scheduleTask=function(t,e,n,r){var i=this.currentTime()+Math.max(0,e),o=new u(i,t,n,r,this);return this.timeline.add(o),this._scheduleNextRun(),o},t.prototype.relative=function(t){return new a(t,this)},t.prototype.cancel=function(t){t.active=!1,this.timeline.remove(t)&&this._reschedule()},t.prototype.cancelAll=function(t){this.timeline.removeAll(t),this._reschedule()},t.prototype._reschedule=function(){this.timeline.isEmpty()?this._unschedule():this._scheduleNextRun(this.currentTime())},t.prototype._unschedule=function(){this.timer.clearTimer(this._timer),this._timer=null},t.prototype._scheduleNextRun=function(){if(!this.timeline.isEmpty()){var t=this.timeline.nextArrival();null===this._timer?this._scheduleNextArrival(t):t<this._nextArrival&&(this._unschedule(),this._scheduleNextArrival(t))}},t.prototype._scheduleNextArrival=function(t){this._nextArrival=t;var e=Math.max(0,t-this.currentTime());this._timer=this.timer.setTimer(this._runReadyTasksBound,e)},t.prototype._runReadyTasks=function(){this._timer=null,this.timeline.runTasks(this.currentTime(),h),this._scheduleNextRun()},t}(),p=function(){function t(){c(this,t),this.tasks=[]}return t.prototype.nextArrival=function(){return this.isEmpty()?1/0:this.tasks[0].time},t.prototype.isEmpty=function(){return 0===this.tasks.length},t.prototype.add=function(t){v(t,this.tasks)},t.prototype.remove=function(t){var e=y(m(t),this.tasks);if(e>=0&&e<this.tasks.length){var r=n(t,this.tasks[e].events);if(r>=0)return this.tasks[e].events.splice(r,1),!0}return!1},t.prototype.removeAll=function(t){for(var e=0;e<this.tasks.length;++e)n=t,(r=this.tasks[e]).events=function(t,e){for(var n,r=e.length,i=new Array(r),o=0,s=0;s<r;++s)t(n=e[s])||(i[o]=n,++o);return i.length=o,i}(n,r.events);var n,r},t.prototype.runTasks=function(t,e){for(var n=this.tasks,r=n.length,i=0;i<r&&n[i].time<=t;)++i;this.tasks=n.slice(i);for(var o=0;o<i;++o)this.tasks=d(e,n[o].events,this.tasks)},t}();function d(t,e,n){for(var r=0;r<e.length;++r){var i=e[r];i.active&&(t(i),i.period>=0&&i.active&&(i.time=i.time+i.period,v(i,n)))}return n}function v(t,e){var n=e.length,r=m(t);if(0!==n){var i=y(r,e);i>=n?e.push(g(r,[t])):function(t,e,n,r){var i=e[r];n===i.time?(o=t,0===(s=i.events).length||o.time>=s[s.length-1].time?s.push(o):function(t,e){for(var n=0;n<e.length;n++)if(t.time<e[n].time){e.splice(n,0,t);break}}(o,s)):e.splice(r,0,g(n,[t]));var o,s}(t,e,r,i)}else e.push(g(r,[t]))}function m(t){return Math.floor(t.time)}function y(t,e){for(var n=0,r=e.length,i=void 0,o=void 0;n<r;){if(t===(o=e[i=Math.floor((n+r)/2)]).time)return i;t<o.time?r=i:n=i+1}return r}var g=function(t,e){return{time:t,events:e}},w=function(){function t(e){c(this,t),this._clock=e}return t.prototype.now=function(){return this._clock.now()},t.prototype.setTimer=function(t,e){return e<=0?function(t){var e=new b(t);return l(e),e}(t):setTimeout(t,e)},t.prototype.clearTimer=function(t){return t instanceof b?t.cancel():clearTimeout(t)},t}(),b=function(){function t(e){c(this,t),this.f=e,this.active=!0}return t.prototype.run=function(){return this.active&&this.f()},t.prototype.error=function(t){throw t},t.prototype.cancel=function(){this.active=!1},t}();var k=function(){function t(e,n){c(this,t),this.origin=n,this.clock=e}return t.prototype.now=function(){return this.clock.now()-this.origin},t}(),N=function(){function t(e,n){c(this,t),this.origin=n,this.hrtime=e}return t.prototype.now=function(){var t=this.hrtime(this.origin);return(1e9*t[0]+t[1])/1e6},t}(),x=function(t){return new k(t,t.now())},T=function(){return"undefined"!=typeof performance&&"function"==typeof performance.now?x(performance):"undefined"!=typeof process&&"function"==typeof process.hrtime?new N(process.hrtime,process.hrtime()):x(Date)},_=o(function(t,e){return e.scheduleTask(0,0,-1,t)}),E=function(){return new w(T())},A=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},$=function(){return C},C=new(function(){function t(){A(this,t)}return t.prototype.dispose=function(){},t}()),O=function(t){return new j(t)},j=function(){function t(e){A(this,t),this.disposed=!1,this.disposable=e}return t.prototype.dispose=function(){this.disposed||(this.disposed=!0,this.disposable.dispose(),this.disposable=void 0)},t}(),S=function(t){return new M(t)},L=o(function(t,e){return S([t,e])}),M=function(){function t(e){A(this,t),this.disposables=e}return t.prototype.dispose=function(){D(R(this.disposables))},t}(),R=function(e){return t(P,[],e)},P=function(t,e){try{e.dispose()}catch(e){t.push(e)}return t},D=function(t){if(t.length>0)throw new B(t.length+" errors",t)},B=function(t){function e(n,r){t.call(this,n),this.message=n,this.name=e.name,this.errors=r,t.captureStackTrace&&t.captureStackTrace(this,e),this.stack=""+this.stack+H(this.errors)}return e.prototype=Object.create(t.prototype),e}(Error),H=function(e){return t(q,"",e)},q=function(t,e,n){return t+"\n["+(n+1)+"] "+e.stack},I=s(function(t,e,n){try{e.dispose()}catch(e){n.error(t,e)}});function z(t){throw t}var F=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},V=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},W=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},G=function(t,e,n){return new J(t,e,n)},Z=function(t,e){return G(K,t,e)},U=function(t){return G(Q,void 0,t)},J=function(){function t(e,n,r){F(this,t),this._run=e,this.value=n,this.sink=r,this.active=!0}return t.prototype.dispose=function(){this.active=!1},t.prototype.run=function(t){if(this.active){var e=this._run;e(t,this.value,this.sink)}},t.prototype.error=function(t,e){if(this.active){this.sink.error(t,e)}else setTimeout(z,0,e)},t}(),K=function(t,e,n){return n.event(t,e)},Q=function(t,e,n){return n.end(t)},X=function(){return tt},Y=function(t){return t===tt},tt=new(function(){function t(){F(this,t)}return t.prototype.run=function(t,e){return _(U(t),e)},t}()),et=new(function(){function t(){F(this,t)}return t.prototype.run=function(){return $()},t}()),nt=function(){function t(e){F(this,t),this.sink=e}return t.prototype.event=function(t,e){return this.sink.event(t,e)},t.prototype.end=function(t){return this.sink.end(t)},t.prototype.error=function(t,e){return this.sink.error(t,e)},t}(),rt=function(){function t(e,n){F(this,t),this.p=e,this.source=n}return t.prototype.run=function(t,e){return this.source.run(new it(this.p,t),e)},t.create=function(e,n){return Y(n)?n:n instanceof t?new t(ot(n.p,e),n.source):new t(e,n)},t}(),it=function(t){V(e,t);function e(n,r){F(this,e);var i=W(this,t.call(this,r));return i.p=n,i}return e.prototype.event=function(t,e){(0,this.p)(e)&&this.sink.event(t,e)},e}(nt),ot=function(t,e){return function(n){return t(n)&&e(n)}},st=function(){function t(e,n,r){F(this,t),this.p=e,this.f=n,this.source=r}return t.prototype.run=function(t,e){return this.source.run(new ct(this.p,this.f,t),e)},t}(),ct=function(t){V(e,t);function e(n,r,i){F(this,e);var o=W(this,t.call(this,i));return o.p=n,o.f=r,o}return e.prototype.event=function(t,e){var n=this.f;(0,this.p)(e)&&this.sink.event(t,n(e))},e}(nt),ut=function(){function t(e,n){F(this,t),this.f=e,this.source=n}return t.prototype.run=function(t,e){return this.source.run(new at(this.f,t),e)},t.create=function(e,n){return Y(n)?X():n instanceof t?new t(i(e,n.f),n.source):n instanceof rt?new st(n.p,e,n.source):new t(e,n)},t}(),at=function(t){V(e,t);function e(n,r){F(this,e);var i=W(this,t.call(this,r));return i.f=n,i}return e.prototype.event=function(t,e){var n=this.f;this.sink.event(t,n(e))},e}(nt),lt=function(){function t(){F(this,t),this.disposable=void 0,this.disposed=!1}return t.prototype.setDisposable=function(t){if(void 0!==this.disposable)throw new Error("setDisposable called more than once");this.disposable=t,this.disposed&&t.dispose()},t.prototype.dispose=function(){this.disposed||(this.disposed=!0,void 0!==this.disposable&&this.disposable.dispose())},t}(),ht=o(function(t,e){return new Promise(function(n,r){return function(t,e,n,r){var i=new lt,o=new ft(n,r,i);i.setDisposable(t.run(o,e))}(t,e,n,r)})});var ft=function(){function t(e,n,r){F(this,t),this._end=e,this._error=n,this._disposable=r,this.active=!0}return t.prototype.event=function(t,e){},t.prototype.end=function(t){this.active&&this._dispose(this._error,this._end,void 0)},t.prototype.error=function(t,e){this._dispose(this._error,this._error,e)},t.prototype._dispose=function(t,e,n){this.active=!1,function(t,e,n,r){try{r.dispose()}catch(e){return void t(e)}e(n)}(t,e,n,this._disposable)},t}();var pt=function(){function t(e,n,r){F(this,t),this.source=r,this.f=e,this.value=n}return t.prototype.run=function(t,e){var n=_(Z(this.value,t),e),r=this.source.run(new dt(this.f,this.value,t),e);return L(n,r)},t}(),dt=function(t){V(e,t);function e(n,r,i){F(this,e);var o=W(this,t.call(this,i));return o.f=n,o.value=r,o}return e.prototype.event=function(t,e){var n=this.f;this.value=n(this.value,e),this.sink.event(t,this.value)},e}(nt),vt=function(t){V(e,t);function e(n,r){F(this,e);var i=W(this,t.call(this,r));return i.index=n,i.active=!0,i.value=void 0,i}return e.prototype.event=function(t,e){this.active&&(this.value=e,this.sink.event(t,this))},e.prototype.end=function(t){this.active&&(this.active=!1,this.sink.event(t,this))},e}(nt);var mt=function(e){return 0===e.length?X():1===e.length?e[0]:new bt(t(wt,[],e))},yt=function(t){return t.filter(gt)},gt=function(t){return!Y(t)},wt=function(t,e){return t.concat(e instanceof bt?e.sources:e)},bt=function(){function t(e){F(this,t),this.sources=e}return t.prototype.run=function(t,e){for(var n,r=this.sources.length,i=new Array(r),o=new Array(r),s=new kt(i,o,t),c=0;c<r;++c)n=o[c]=new vt(c,s),i[c]=this.sources[c].run(n,e);return S(i)},t}(),kt=function(t){V(e,t);function e(n,r,i){F(this,e);var o=W(this,t.call(this,i));return o.disposables=n,o.activeCount=r.length,o}return e.prototype.event=function(t,e){e.active?this.sink.event(t,e.value):this._dispose(t,e.index)},e.prototype._dispose=function(t,e){I(t,this.disposables[e],this.sink),0==--this.activeCount&&this.sink.end(t)},e}(nt);var Nt=function(t,e){return Y(e)?X():new xt(t,e)},xt=function(){function t(e,n){F(this,t),this.equals=e,this.source=n}return t.prototype.run=function(t,e){return this.source.run(new Tt(this.equals,t),e)},t}(),Tt=function(t){V(e,t);function e(n,r){F(this,e);var i=W(this,t.call(this,r));return i.equals=n,i.value=void 0,i.init=!0,i}return e.prototype.event=function(t,e){this.init?(this.init=!1,this.value=e,this.sink.event(t,e)):this.equals(this.value,e)||(this.value=e,this.sink.event(t,e))},e}(nt);function _t(t,e){return t===e}function Et(t,e,n){try{n.event(t,e)}catch(e){n.error(t,e)}}function At(t,e){try{e.end(t)}catch(n){e.error(t,n)}}var $t=function(){function t(e){F(this,t),this.source=e,this.sinks=[],this.disposable=$()}return t.prototype.run=function(t,e){return 1===this.add(t)&&(this.disposable=this.source.run(this,e)),O(new Ct(this,t))},t.prototype.dispose=function(){var t=this.disposable;return this.disposable=$(),t.dispose()},t.prototype.add=function(t){return this.sinks=function(t,e){for(var n=e.length,r=new Array(n+1),i=0;i<n;++i)r[i]=e[i];return r[n]=t,r}(t,this.sinks),this.sinks.length},t.prototype.remove=function(t){var r=n(t,this.sinks);return r>=0&&(this.sinks=e(r,this.sinks)),this.sinks.length},t.prototype.event=function(t,e){var n=this.sinks;if(1===n.length)return n[0].event(t,e);for(var r=0;r<n.length;++r)Et(t,e,n[r])},t.prototype.end=function(t){for(var e=this.sinks,n=0;n<e.length;++n)At(t,e[n])},t.prototype.error=function(t,e){for(var n=this.sinks,r=0;r<n.length;++r)n[r].error(t,e)},t}(),Ct=function(){function t(e,n){F(this,t),this.source=e,this.sink=n}return t.prototype.dispose=function(){0===this.source.remove(this.sink)&&this.source.dispose()},t}(),Ot=o(ht),jt=s(function(t,e,n){return new pt(t,e,n)}),St=o(function(t,e){return ut.create(t,e)}),Lt=function(t,e,n){this.event=t,this.node=e,this.capture=n};Lt.prototype.run=function(t,e){var n=this,r=function(n){return function(t,e,n){try{n.event(t,e)}catch(e){n.error(t,e)}}(e.currentTime(),n,t)};return this.node.addEventListener(this.event,r,this.capture),{dispose:function(){return n.node.removeEventListener(n.event,r,n.capture)}}};function Mt(){}const Rt=(t,e)=>{const n="_"+t+"$";return{get(){return this[n]||(this[t]=e.call(this,t))},set(t){Object.defineProperty(this,n,{configurable:!0,value:t})}}},Pt={},Dt=[],Bt=Pt.hasOwnProperty;let Ht=0;var qt=(t,e)=>{for(let n=0;n<Ht;n++){let r=Dt[n];if(Bt.call(t,r))return Pt[r](t[r],e)}};const It=document.defaultView,zt=1,Ft="http://www.w3.org/2000/svg",Vt="connected",Wt="dis"+Vt,Gt=/^style|textarea$/i,Zt="_hyper: "+(Math.random()*new Date|0)+";",Ut="\x3c!--"+Zt+"--\x3e";let Jt=It.Event;try{new Jt("Event")}catch(t){Jt=function(t){const e=document.createEvent("Event");return e.initEvent(t,!1,!1),e}}const Kt=It.Map||function(){const t=[],e=[];return{get:n=>e[t.indexOf(n)],set(n,r){e[t.push(n)-1]=r}}},Qt=It.WeakMap||function(){return{get:t=>t[Zt],set(t,e){Object.defineProperty(t,Zt,{configurable:!0,value:e})}}},Xt=It.WeakSet||function(){const t=new Qt;return{add(e){t.set(e,!0)},has:e=>!0===t.get(e)}},Yt=Array.isArray||(te={}.toString,t=>"[object Array]"===te.call(t));var te;const ee=Zt.trim||function(){return this.replace(/^\s+|\s+$/g,"")},ne=(t,e)=>re(t).createElement(e),re=t=>t.ownerDocument||t,ie=t=>re(t).createDocumentFragment(),oe=(t,e)=>re(t).createTextNode(e),se=ie(document),ce="append"in se,ue="content"in ne(document,"template");se.appendChild(oe(se,"g")),se.appendChild(oe(se,""));const ae=1===se.cloneNode(!0).childNodes.length,le="importNode"in document,he=ce?(t,e)=>{t.append.apply(t,e)}:(t,e)=>{const n=e.length;for(let r=0;r<n;r++)t.appendChild(e[r])},fe="[^\\S]+[^ \\f\\n\\r\\t\\/>\"'=]+",pe=new RegExp("(<[a-z]+[a-z0-9:_-]*)((?:"+fe+"(?:=(?:'.*?'|\".*?\"|<.+?>|\\S+))?)+)([^\\S]*/?>)","gi"),de=new RegExp("("+fe+"=)(['\"]?)"+Ut+"\\2","gi"),ve=(t,e,n,r)=>e+n.replace(de,me)+r,me=(t,e,n)=>e+(n||'"')+Zt+(n||'"'),ye=(t,e)=>("ownerSVGElement"in t?Te:xe)(t,e.replace(pe,ve)),ge=ae?t=>{const e=t.cloneNode(),n=t.childNodes||[],r=n.length;for(let t=0;t<r;t++)e.appendChild(ge(n[t]));return e}:t=>t.cloneNode(!0),we=le?(t,e)=>t.importNode(e,!0):(t,e)=>ge(e),be=[].slice,ke=t=>Ne(t);let Ne=t=>{if(t.propertyIsEnumerable("raw")||/Firefox\/(\d+)/.test((It.navigator||{}).userAgent)&&parseFloat(RegExp.$1)<55){const t={};Ne=(e=>{const n="_"+e.join(Zt);return t[n]||(t[n]=e)})}else Ne=(t=>t);return Ne(t)};const xe=ue?(t,e)=>{const n=ne(t,"template");return n.innerHTML=e,n.content}:(t,e)=>{const n=ne(t,"template"),r=ie(t);if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){const t=RegExp.$1;n.innerHTML="<table>"+e+"</table>",he(r,be.call(n.querySelectorAll(t)))}else n.innerHTML=e,he(r,be.call(n.childNodes));return r},Te=ue?(t,e)=>{const n=ie(t),r=re(t).createElementNS(Ft,"svg");return r.innerHTML=e,he(n,be.call(r.childNodes)),n}:(t,e)=>{const n=ie(t),r=ne(t,"div");return r.innerHTML='<svg xmlns="'+Ft+'">'+e+"</svg>",he(n,be.call(r.firstChild.childNodes)),n};function _e(t){this.childNodes=t,this.length=t.length,this.first=t[0],this.last=t[this.length-1]}_e.prototype.insert=function(){const t=ie(this.first);return he(t,this.childNodes),t},_e.prototype.remove=function(){const t=this.first,e=this.last;if(2===this.length)e.parentNode.removeChild(e);else{const n=re(t).createRange();n.setStartBefore(this.childNodes[1]),n.setEndAfter(e),n.deleteContents()}return t};const Ee=(t,e,n)=>{t.unshift(t.indexOf.call(e.childNodes,n))};var Ae=(t,e,n)=>({type:t,name:n,node:e,path:(t=>{const e=[];let n;switch(t.nodeType){case zt:case 11:n=t;break;case 8:n=t.parentNode,Ee(e,n,t);break;default:n=t.ownerElement}for(t=n;n=n.parentNode;t=n)Ee(e,n,t);return e})(e)}),$e=(t,e)=>{const n=e.length;for(let r=0;r<n;r++)t=t.childNodes[e[r]];return t};const Ce=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;const Oe=(t,e)=>{let n,r;return i=>{switch(typeof i){case"object":if(i){if("object"===n){if(!e&&r!==i)for(const e in r)e in i||(t[e]="")}else e?t.value="":t.cssText="";const o=e?{}:t;for(const t in i){const e=i[t];o[t]="number"!=typeof e||Ce.test(t)?e:e+"px"}n="object",e?t.value=Le(r=o):r=i;break}default:r!=i&&(n="string",r=i,e?t.value=i||"":t.cssText=i||"")}}},je=/([^A-Z])([A-Z]+)/g,Se=(t,e,n)=>e+"-"+n.toLowerCase(),Le=t=>{const e=[];for(const n in t)e.push(n.replace(je,Se),":",t[n],";");return e.join("")},Me=t=>t,Re=(t,e,n,r,i)=>{const o=r||Me,s=null==i?null:o(i,0);let c=0,u=0,a=e.length-1,l=e[0],h=e[a],f=n.length-1,p=n[0],d=n[f];for(;c<=a&&u<=f;)if(null==l)l=e[++c];else if(null==h)h=e[--a];else if(null==p)p=n[++u];else if(null==d)d=n[--f];else if(l==p)l=e[++c],p=n[++u];else if(h==d)h=e[--a],d=n[--f];else if(l==d)t.insertBefore(o(l,1),o(h,-0).nextSibling),l=e[++c],d=n[--f];else if(h==p)t.insertBefore(o(h,1),o(l,0)),h=e[--a],p=n[++u];else{let r=e.indexOf(p);if(r<0)t.insertBefore(o(p,1),o(l,0)),p=n[++u];else{let i=e[r];e[r]=null,t.insertBefore(o(i,1),o(l,0)),p=n[++u]}}if(c>a){const e=n[f+1],r=null!=e?o(e,0):s;for(;u<=f;){const e=n[u++];null!=e&&t.insertBefore(o(e,1),r)}}else if(u>f)for(;c<=a;){const n=e[c++];null!=n&&t.removeChild(o(n,-1))}return n},Pe=new Xt;function De(){}De.prototype=Object.create(null);const Be=t=>({html:t}),He=(t,e)=>"ELEMENT_NODE"in t?t:t.constructor===_e?1/e<0?e?t.remove():t.last:e?t.insert():t.first:He(t.render(),e),qe=(t,e,n)=>{const r=t.childNodes,i=r.length;for(let o=0;o<i;o++){let i=r[o];switch(i.nodeType){case zt:Ie(i,e,n),qe(i,e,n);break;case 8:i.textContent===Zt&&(n.shift(),e.push(Gt.test(t.nodeName)?Ae("text",t):Ae("any",i)));break;case 3:Gt.test(t.nodeName)&&ee.call(i.textContent)===Ut&&(n.shift(),e.push(Ae("text",t)))}}},Ie=(t,e,n)=>{const r=new De,i=t.attributes,o=be.call(i),s=[],c=o.length;for(let t=0;t<c;t++){const c=o[t];if(c.value===Zt){const t=c.name;if(!(t in r)){const o=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1");r[t]=i[o]||i[o.toLowerCase()],e.push(Ae("attr",r[t],o))}s.push(c)}}const u=s.length;for(let e=0;e<u;e++)t.removeAttributeNode(s[e]);const a=t.nodeName;if(/^script$/i.test(a)){const e=ne(t,a);for(let t=0;t<i.length;t++)e.setAttributeNode(i[t].cloneNode(!0));e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}},ze=(t,e)=>{e(t.placeholder),"text"in t?Promise.resolve(t.text).then(String).then(e):"any"in t?Promise.resolve(t.any).then(e):"html"in t?Promise.resolve(t.html).then(Be).then(e):Promise.resolve(qt(t,e)).then(e)},Fe=t=>null!=t&&"then"in t,Ve=(t,e)=>{let n,r=!1;const i=o=>{switch(typeof o){case"string":case"number":case"boolean":r?n!==o&&(n=o,e[0].textContent=o):(r=!0,n=o,e=Re(t.parentNode,e,[oe(t,o)],He,t));break;case"object":case"undefined":if(null==o){r=!1,e=Re(t.parentNode,e,[],He,t);break}default:if(r=!1,n=o,Yt(o))if(0===o.length)e.length&&(e=Re(t.parentNode,e,[],He,t));else switch(typeof o[0]){case"string":case"number":case"boolean":i({html:o});break;case"object":if(Yt(o[0])&&(o=o.concat.apply([],o)),Fe(o[0])){Promise.all(o).then(i);break}default:e=Re(t.parentNode,e,o,He,t)}else We=o,"ELEMENT_NODE"in We||We instanceof _e||We instanceof Mt?e=Re(t.parentNode,e,11===o.nodeType?be.call(o.childNodes):[o],He,t):Fe(o)?o.then(i):"placeholder"in o?ze(o,i):"text"in o?i(String(o.text)):"any"in o?i(o.any):"html"in o?e=Re(t.parentNode,e,be.call(ye(t,[].concat(o.html).join("")).childNodes),He,t):i("length"in o?be.call(o):qt(o,i))}};return i};var We;const Ge=(t,e,n)=>{const r="ownerSVGElement"in t;let i;if("style"===e)return((t,e,n)=>{if(n){const r=e.cloneNode(!0);return r.value="",t.setAttributeNode(r),Oe(r,n)}return Oe(t.style,n)})(t,n,r);if(/^on/.test(e)){let n=e.slice(2);return n===Vt||n===Wt?(Je&&(Je=!1,function(){const t=(t,n)=>{const r=new Jt(n),i=t.length;for(let n=0;n<i;n++){let i=t[n];i.nodeType===zt&&e(i,r)}},e=(t,n)=>{if(Pe.has(t))t.dispatchEvent(n);else{const r=t.children,i=r.length;for(let t=0;t<i;t++)e(r[t],n)}};try{new MutationObserver(e=>{const n=e.length;for(let r=0;r<n;r++){let n=e[r];t(n.removedNodes,Wt),t(n.addedNodes,Vt)}}).observe(document,{subtree:!0,childList:!0})}catch(e){document.addEventListener("DOMNodeRemoved",e=>{t([e.target],Wt)},!1),document.addEventListener("DOMNodeInserted",e=>{t([e.target],Vt)},!1)}}()),Pe.add(t)):e.toLowerCase()in t&&(n=n.toLowerCase()),e=>{i!==e&&(i&&t.removeEventListener(n,i,!1),i=e,e&&t.addEventListener(n,e,!1))}}if("data"===e||!r&&e in t)return n=>{i!==n&&(i=n,t[e]!==n&&(t[e]=n,null==n&&t.removeAttribute(e)))};{let e=!1;const r=n.cloneNode(!0);return n=>{i!==n&&(i=n,r.value!==n&&(null==n?(e&&(e=!1,t.removeAttributeNode(r)),r.value=n):(r.value=n,e||(e=!0,t.setAttributeNode(r)))))}}},Ze=t=>{let e;const n=r=>{e!==r&&(e=r,"object"==typeof r&&r?Fe(r)?r.then(n):"placeholder"in r?ze(r,n):n("text"in r?String(r.text):"any"in r?r.any:"html"in r?[].concat(r.html).join(""):"length"in r?be.call(r).join(""):qt(r,n)):t.textContent=null==r?"":r)};return n};var Ue={create:(t,e)=>{const n=[],r=e.length;for(let i=0;i<r;i++){const r=e[i],o=$e(t,r.path);switch(r.type){case"any":n.push(Ve(o,[]));break;case"attr":n.push(Ge(o,r.name,r.node));break;case"text":n.push(Ze(o))}}return n},find:qe};let Je=!0;const Ke=new Qt,Qe=new Kt;function Xe(t){const e=Ke.get(this);return e&&e.template===ke(t)?Ye.apply(e.updates,arguments):function(t){t=ke(t);const e=Qe.get(t)||function(t){const e=[],n=ye(this,t.join(Ut));Ue.find(n,e,t.slice());const r={fragment:n,paths:e};return Qe.set(t,r),r}.call(this,t),n=we(this.ownerDocument,e.fragment),r=Ue.create(n,e.paths);Ke.set(this,{template:t,updates:r}),Ye.apply(r,arguments),this.textContent="",this.appendChild(n)}.apply(this,arguments),this}function Ye(){const t=arguments.length;for(let e=1;e<t;e++)this[e-1](arguments[e])}const tn=new Qt,en=(t,e)=>null==t?nn(e||"html"):rn(t,e||"html"),nn=t=>{let e,n,r,i,o;return function(s){s=ke(s);let c=i!==s;return c&&(i=s,r=ie(document),n="svg"===t?document.createElementNS(Ft,"svg"):r,o=Xe.bind(n)),o.apply(null,arguments),c&&("svg"===t&&he(r,be.call(n.childNodes)),e=on(r)),e}},rn=(t,e)=>{const n=e.indexOf(":");let r=tn.get(t),i=e;return-1<n&&(i=e.slice(n+1),e=e.slice(0,n)||"html"),r||tn.set(t,r={}),r[i]||(r[i]=nn(e))},on=t=>{const e=t.childNodes,n=e.length,r=[];for(let t=0;t<n;t++){let n=e[t];n.nodeType!==zt&&0===ee.call(n.textContent).length||r.push(n)}return 1===r.length?r[0]:new _e(r)},sn=t=>Xe.bind(t);cn=nn,Object.defineProperties(Mt.prototype,{handleEvent:{value(t){const e=t.currentTarget;this["getAttribute"in e&&e.getAttribute("data-call")||"on"+t.type](t)}},html:Rt("html",cn),svg:Rt("svg",cn),state:Rt("state",function(){return this.defaultState}),defaultState:{get:()=>({})},setState:{value(t){const e=this.state,n="function"==typeof t?t.call(this,e):t;for(const t in n)e[t]=n[t];this.render()}}});var cn,un=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};const an=(t,{completed:e})=>t+(e?1:0);var ln,hn;const fn=t=>{const e=t.closest("[data-id]");return e instanceof HTMLElement?Number(e.dataset.id):-1},pn=t=>{const e=t.target.value.trim();return 13!==t.keyCode||0===e.length?r:(t.target.value="",dn=e,t=>un({},t,{nextId:t.nextId+1,todos:t.todos.concat([(ln=dn,hn=t.nextId,{description:ln,completed:!1,id:hn})])}))};var dn;const vn=t=>(mn=t.target.checked,t=>un({},t,{todos:t.todos.map(t=>un({},t,{completed:mn}))}));var mn;const yn=t=>(gn=t.target.checked,wn=fn(t.target),t=>un({},t,{todos:t.todos.map(t=>t.id===wn?un({},t,{completed:gn}):t)}));var gn,wn;const bn=t=>(kn=fn(t.target),t=>un({},t,{todos:t.todos.filter(t=>t.id!==kn)}));var kn;const Nn=t=>t=>un({},t,{todos:t.todos.filter(t=>!t.completed)});var xn;const Tn=t=>e=>e?t:"",_n=Tn("completed"),En=Tn("selected"),An=(t,e,n)=>en()`<section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" checked=${e} onchange=${i(t,vn)}>
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class editing when editing and completed when marked as completed -->
      ${n.map($n(i(t,yn),i(t,bn)))}
    </ul>
  </section>`,$n=(t,e)=>({id:n,completed:r,description:i})=>en()`<li data-id="${n}" class="${_n(r)}">
    <div class="view">
      <input class="toggle" type="checkbox" checked=${r} onchange=${t}>
      <label>${i}</label>
      <button class="destroy" onclick="${e}"></button>
    </div>
    <input class="edit" value="${i}">
  </li>`,Cn=(t,e,n,{todos:r,filter:o})=>en()`<footer class="footer" style="${0===r.length?"display:none":""}">
    <!-- This should be 0 items left by default -->
    <span class="todo-count"><strong>${e}</strong> ${1===e?"item":"items"} left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li><a class="${En("/"===o)}" href="#/">All</a><li>
      <li><a class="${En("/active"===o)}" href="#/active">Active</a><li>
      <li><a class="${En("/completed"===o)}" href="#/completed">Completed</a><li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" style="${n>0?"":"display:none"}" onclick="${i(t,Nn)}">Clear completed</button>
  </footer>`,On=t=>{const e=new $t(et);return[n=>e.event(t.currentTime(),n),e]},jn=(Sn=".todoapp",Ln=document,Ln.querySelector(Sn)||(t=>{throw new Error(t)})(`${Sn} not found`));var Sn,Ln;const Mn={todos:[],focus:null,filter:"/",nextId:0},Rn=new f(E(),new p),[Pn,Dn]=On(Rn),Bn=St(t=>(xn=t.newURL.replace(/^.*#/,""),t=>un({},t,{filter:xn})),function(t,e){return void 0===e&&(e=!1),void 0===(n=e)&&(n=!1),new Lt("hashchange",t,n);var n}(window)),Hn=(qn=[Dn,Bn],mt(yt(qn)));var qn;const In=(zn=jt((t,e)=>e(t),Mn,Hn),Nt(_t,zn));var zn;var Fn;Ot(jt((Fn=Pn,(t,e)=>{const n=(({todos:t})=>t.reduce(an,0))(e);return sn(t)`
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" name="new-todo" placeholder="What needs to be done?" autofocus onkeypress="${i(Fn,pn)}">
    </header>
    ${An(Fn,e.todos.length>0&&n===e.todos.length,e.todos)}
    ${Cn(Fn,e.todos.length-n,n,e)}`}),jn,In),Rn)}();
//# sourceMappingURL=app.js.map
