import{d as c,g as w,o,c as m,r as f,O as A,k as _,b as v,J as $,_ as b,D as h,w as r,I as u,a as p,a1 as C,v as d,a2 as D,a3 as E,a4 as P,a5 as S,a6 as x,a7 as R,a8 as k,a9 as B,aa as G,ab as j,ac as L,u as N,j as T,z as V,ad as I,ae as O,af as F}from"./chunks/framework.wQMPUQgK.js";import{t as g}from"./chunks/theme.qfyTmEs2.js";function l(e){const t=e;return t.install=a=>{a.component(t.name,e)},e}const z=c({name:"SGrid",__name:"Grid",props:{templateColumns:{default:()=>["repeat(24, 1fr)"]},templateRows:{default:()=>[]}},setup(e){const t=e,a=w(()=>({"grid-template-columns":t.templateColumns.join(" "),"grid-template-rows":t.templateRows.join(" ")}));return console.log(a),(n,i)=>(o(),m("div",{class:"s-grid",style:A(a.value)},[f(n.$slots,"default")],4))}}),M=l(z),H={class:"s-cell"},J=c({name:"SCell",__name:"Cell",setup(e){return(t,a)=>(o(),m("div",H,[f(t.$slots,"default")]))}}),U=l(J),q=[M,U],K=e=>({install:t=>{e.forEach(a=>{t.use(a)})}}),Q=K(q),W={class:"demo"},X={class:"demo-example"},Y={class:"demo-code"},Z=c({name:"Demo",__name:"Demo",props:{demoName:{default:""}},setup(e){const t=e;return(a,n)=>(o(),m("div",W,[_("div",X,[(o(),v($(t.demoName)))]),_("div",Y,[f(a.$slots,"default")])]))}}),ee=l(Z),te=[ee],ae=e=>({install:t=>{e.forEach(a=>{t.use(a)})}}),ne=ae(te),se={};function oe(e,t){const a=h("s-cell"),n=h("s-grid");return o(),v(n,{"template-columns":["1fr","1fr"]},{default:r(()=>[u(a,{style:{background:"red"}},{default:r(()=>[p("网格1")]),_:1}),u(a,{style:{background:"blue"}},{default:r(()=>[p("网格2")]),_:1}),u(a,{style:{background:"yellow"}},{default:r(()=>[p("网格3")]),_:1})]),_:1})}const re=b(se,[["render",oe]]),ce=l({name:"GridBasic",...re}),le=[ce],ie=e=>({install:t=>{e.forEach(a=>{t.use(a)})}}),ue=ie(le),pe={extends:g,Layout:()=>C(g.Layout,null,{}),enhanceApp({app:e,router:t,siteData:a}){e.use(Q),e.use(ne),e.use(ue)}};function y(e){if(e.extends){const t=y(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const s=y(pe),de=c({name:"VitePressApp",setup(){const{site:e}=N();return T(()=>{V(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),e.value.router.prefetchLinks&&I(),O(),F(),s.setup&&s.setup(),()=>C(s.Layout)}});async function me(){const e=_e(),t=fe();t.provide(E,e);const a=P(e.route);return t.provide(S,a),t.component("Content",x),t.component("ClientOnly",R),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:t,router:e,siteData:k}),{app:t,router:e,data:a}}function fe(){return B(de)}function _e(){let e=d,t;return G(a=>{let n=j(a),i=null;return n&&(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),i=L(()=>import(n),__vite__mapDeps([]))),d&&(e=!1),i},s.NotFound)}d&&me().then(({app:e,router:t,data:a})=>{t.go().then(()=>{D(t.route,a.site),e.mount("#app")})});export{me as createApp};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}