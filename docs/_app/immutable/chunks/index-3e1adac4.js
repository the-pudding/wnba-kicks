function k(){}const bt=t=>t;function xt(t,e){for(const n in e)t[n]=e[n];return t}function rt(t){return t()}function Y(){return Object.create(null)}function A(t){t.forEach(rt)}function U(t){return typeof t=="function"}function Xt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let H;function Yt(t,e){return H||(H=document.createElement("a")),H.href=e,t===H.href}function $t(t){return Object.keys(t).length===0}function vt(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Zt(t,e,n){t.$$.on_destroy.push(vt(e,n))}function te(t,e,n,i){if(t){const r=ot(t,e,n,i);return t[0](r)}}function ot(t,e,n,i){return t[1]&&i?xt(n.ctx.slice(),t[1](i(e))):n.ctx}function ee(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)o[l]=e.dirty[l]|r[l];return o}return e.dirty|r}return e.dirty}function ne(t,e,n,i,r,o){if(r){const s=ot(e,n,i,o);t.p(s,r)}}function ie(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function se(t){return t&&U(t.destroy)?t.destroy:k}const ct=typeof window<"u";let Et=ct?()=>window.performance.now():()=>Date.now(),V=ct?t=>requestAnimationFrame(t):k;const E=new Set;function lt(t){E.forEach(e=>{e.c(t)||(E.delete(e),e.f())}),E.size!==0&&V(lt)}function kt(t){let e;return E.size===0&&V(lt),{promise:new Promise(n=>{E.add(e={c:t,f:n})}),abort(){E.delete(e)}}}let F=!1;function At(){F=!0}function Nt(){F=!1}function St(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function Mt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let a=0;a<e.length;a++){const _=e[a];_.claim_order!==void 0&&c.push(_)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const a=e[c].claim_order,_=(r>0&&e[n[r]].claim_order<=a?r+1:St(1,r,u=>e[n[u]].claim_order,a))-1;i[c]=n[_]+1;const f=_+1;n[f]=c,r=Math.max(f,r)}const o=[],s=[];let l=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(o.push(e[c-1]);l>=c;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);o.reverse(),s.sort((c,a)=>c.claim_order-a.claim_order);for(let c=0,a=0;c<s.length;c++){for(;a<o.length&&s[c].claim_order>=o[a].claim_order;)a++;const _=a<o.length?o[a]:null;t.insertBefore(s[c],_)}}function at(t,e){t.appendChild(e)}function ut(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Tt(t){const e=G("style");return Ct(ut(t),e),e.sheet}function Ct(t,e){at(t.head||t,e)}function jt(t,e){if(F){for(Mt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function zt(t,e,n){t.insertBefore(e,n||null)}function Dt(t,e,n){F&&!n?jt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function C(t){t.parentNode.removeChild(t)}function re(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function G(t){return document.createElement(t)}function ft(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function X(t){return document.createTextNode(t)}function oe(){return X(" ")}function ce(){return X("")}function Z(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ht(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function le(t,e){for(const n in e)Ht(t,n,e[n])}function ae(t){return t===""?null:+t}function Lt(t){return Array.from(t.childNodes)}function dt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function _t(t,e,n,i,r=!1){dt(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function ht(t,e,n,i){return _t(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||o.push(l.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function ue(t,e,n){return ht(t,e,n,G)}function fe(t,e,n){return ht(t,e,n,ft)}function Rt(t,e){return _t(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>X(e),!0)}function de(t){return Rt(t," ")}function tt(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function _e(t,e){const n=tt(t,"HTML_TAG_START",0),i=tt(t,"HTML_TAG_END",n);if(n===i)return new et(void 0,e);dt(t);const r=t.splice(n,i-n+1);C(r[0]),C(r[r.length-1]);const o=r.slice(1,r.length-1);for(const s of o)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new et(o,e)}function he(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function me(t,e){t.value=e==null?"":e}function pe(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let L;function qt(){if(L===void 0){L=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{L=!0}}return L}function ye(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=G("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=qt();let o;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=Z(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{o=Z(i.contentWindow,"resize",e)}),at(t,i),()=>{(r||o&&i.contentWindow)&&o(),C(i)}}function ge(t,e,n){t.classList[n?"add":"remove"](e)}function mt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function we(t,e=document.body){return Array.from(e.querySelectorAll(t))}class Pt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=ft(n.nodeName):this.e=G(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)zt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(C)}}class et extends Pt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Dt(this.t,this.n[n],e)}}const O=new Map;let B=0;function Ot(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Bt(t,e){const n={stylesheet:Tt(e),rules:{}};return O.set(t,n),n}function nt(t,e,n,i,r,o,s,l=0){const c=16.666/i;let a=`{
`;for(let p=0;p<=1;p+=c){const g=e+(n-e)*o(p);a+=p*100+`%{${s(g,1-g)}}
`}const _=a+`100% {${s(n,1-n)}}
}`,f=`__svelte_${Ot(_)}_${l}`,u=ut(t),{stylesheet:h,rules:d}=O.get(u)||Bt(u,t);d[f]||(d[f]=!0,h.insertRule(`@keyframes ${f} ${_}`,h.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${f} ${i}ms linear ${r}ms 1 both`,B+=1,f}function Wt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),B-=r,B||Ft())}function Ft(){V(()=>{B||(O.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),O.clear())})}let j;function T(t){j=t}function N(){if(!j)throw new Error("Function called outside component initialization");return j}function be(t){N().$$.on_mount.push(t)}function xe(t){N().$$.after_update.push(t)}function $e(t){N().$$.on_destroy.push(t)}function ve(){const t=N();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=mt(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,o)}),!o.defaultPrevented}return!0}}function Ee(t,e){return N().$$.context.set(t,e),e}function ke(t){return N().$$.context.get(t)}function Ae(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const M=[],it=[],q=[],st=[],pt=Promise.resolve();let Q=!1;function yt(){Q||(Q=!0,pt.then(gt))}function Ne(){return yt(),pt}function W(t){q.push(t)}const J=new Set;let R=0;function gt(){const t=j;do{for(;R<M.length;){const e=M[R];R++,T(e),Gt(e.$$)}for(T(null),M.length=0,R=0;it.length;)it.pop()();for(let e=0;e<q.length;e+=1){const n=q[e];J.has(n)||(J.add(n),n())}q.length=0}while(M.length);for(;st.length;)st.pop()();Q=!1,J.clear(),T(t)}function Gt(t){if(t.fragment!==null){t.update(),A(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(W)}}let S;function It(){return S||(S=Promise.resolve(),S.then(()=>{S=null})),S}function K(t,e,n){t.dispatchEvent(mt(`${e?"intro":"outro"}${n}`))}const P=new Set;let x;function Se(){x={r:0,c:[],p:x}}function Me(){x.r||A(x.c),x=x.p}function wt(t,e){t&&t.i&&(P.delete(t),t.i(e))}function Jt(t,e,n,i){if(t&&t.o){if(P.has(t))return;P.add(t),x.c.push(()=>{P.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Kt={duration:0};function Te(t,e,n,i){let r=e(t,n),o=i?0:1,s=null,l=null,c=null;function a(){c&&Wt(t,c)}function _(u,h){const d=u.b-o;return h*=Math.abs(d),{a:o,b:u.b,d,duration:h,start:u.start,end:u.start+h,group:u.group}}function f(u){const{delay:h=0,duration:d=300,easing:y=bt,tick:p=k,css:g}=r||Kt,$={start:Et()+h,b:u};u||($.group=x,x.r+=1),s||l?l=$:(g&&(a(),c=nt(t,o,u,d,h,y,g)),u&&p(0,1),s=_($,d),W(()=>K(t,u,"start")),kt(v=>{if(l&&v>l.start&&(s=_(l,d),l=null,K(t,s.b,"start"),g&&(a(),c=nt(t,o,s.b,s.duration,0,y,r.css))),s){if(v>=s.end)p(o=s.b,1-o),K(t,s.b,"end"),l||(s.b?a():--s.group.r||A(s.group.c)),s=null;else if(v>=s.start){const z=v-s.start;o=s.a+s.d*y(z/s.duration),p(o,1-o)}}return!!(s||l)}))}return{run(u){U(r)?It().then(()=>{r=r(),f(u)}):f(u)},end(){a(),s=l=null}}}function Ce(t,e){Jt(t,1,1,()=>{e.delete(t.key)})}function je(t,e,n,i,r,o,s,l,c,a,_,f){let u=t.length,h=o.length,d=u;const y={};for(;d--;)y[t[d].key]=d;const p=[],g=new Map,$=new Map;for(d=h;d--;){const m=f(r,o,d),w=n(m);let b=s.get(w);b?i&&b.p(m,e):(b=a(w,m),b.c()),g.set(w,p[d]=b),w in y&&$.set(w,Math.abs(d-y[w]))}const v=new Set,z=new Set;function I(m){wt(m,1),m.m(l,_),s.set(m.key,m),_=m.first,h--}for(;u&&h;){const m=p[h-1],w=t[u-1],b=m.key,D=w.key;m===w?(_=m.first,u--,h--):g.has(D)?!s.has(b)||v.has(b)?I(m):z.has(D)?u--:$.get(b)>$.get(D)?(z.add(b),I(m)):(v.add(D),u--):(c(w,s),u--)}for(;u--;){const m=t[u];g.has(m.key)||c(m,s)}for(;h;)I(p[h-1]);return p}function ze(t,e){const n={},i={},r={$$scope:1};let o=t.length;for(;o--;){const s=t[o],l=e[o];if(l){for(const c in s)c in l||(i[c]=1);for(const c in l)r[c]||(n[c]=l[c],r[c]=1);t[o]=l}else for(const c in s)r[c]=1}for(const s in i)s in n||(n[s]=void 0);return n}function De(t){return typeof t=="object"&&t!==null?t:{}}function He(t){t&&t.c()}function Le(t,e){t&&t.l(e)}function Qt(t,e,n,i){const{fragment:r,on_mount:o,on_destroy:s,after_update:l}=t.$$;r&&r.m(e,n),i||W(()=>{const c=o.map(rt).filter(U);s?s.push(...c):A(c),t.$$.on_mount=[]}),l.forEach(W)}function Ut(t,e){const n=t.$$;n.fragment!==null&&(A(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Vt(t,e){t.$$.dirty[0]===-1&&(M.push(t),yt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Re(t,e,n,i,r,o,s,l=[-1]){const c=j;T(t);const a=t.$$={fragment:null,ctx:null,props:o,update:k,not_equal:r,bound:Y(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Y(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};s&&s(a.root);let _=!1;if(a.ctx=n?n(t,e.props||{},(f,u,...h)=>{const d=h.length?h[0]:u;return a.ctx&&r(a.ctx[f],a.ctx[f]=d)&&(!a.skip_bound&&a.bound[f]&&a.bound[f](d),_&&Vt(t,f)),u}):[],a.update(),_=!0,A(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){At();const f=Lt(e.target);a.fragment&&a.fragment.l(f),f.forEach(C)}else a.fragment&&a.fragment.c();e.intro&&wt(t.$$.fragment),Qt(t,e.target,e.anchor,e.customElement),Nt(),gt()}T(c)}class qe{$destroy(){Ut(this,1),this.$destroy=k}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!$t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{it as $,De as A,Ut as B,xt as C,Ne as D,k as E,vt as F,A as G,U as H,te as I,ne as J,ie as K,ee as L,jt as M,we as N,se as O,Z as P,me as Q,re as R,qe as S,ae as T,ft as U,fe as V,le as W,ge as X,ke as Y,W as Z,Zt as _,oe as a,Yt as a0,et as a1,_e as a2,ye as a3,Te as a4,Ae as a5,je as a6,ve as a7,Ce as a8,$e as a9,Dt as b,de as c,Me as d,ce as e,wt as f,Se as g,C as h,Re as i,Ee as j,xe as k,G as l,ue as m,Lt as n,be as o,Ht as p,pe as q,X as r,Xt as s,Jt as t,Rt as u,he as v,He as w,Le as x,Qt as y,ze as z};