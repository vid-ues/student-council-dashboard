(this["webpackJsonpstudent-council-dashboard"]=this["webpackJsonpstudent-council-dashboard"]||[]).push([[0],{12:function(e,t,a){},13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(2),l=a.n(r);a(12),a(13);const c=()=>{const[e,t]=Object(n.useState)([]),[a,r]=Object(n.useState)(null),[l,c]=Object(n.useState)(null);Object(n.useEffect)(()=>{const e=document.createElement("script");return e.src="https://sheets.googleapis.com/v4/spreadsheets/1b6PKIXGqHTFEsU3wiObNe7cSfzNvQMLmGNqiGtBBB5c/values/Form Responses 1!F:AG?key=AIzaSyBSm0APazfjqdqSvpiMQA63NUviz3Qz0FU&callback=onDataLoaded",document.body.appendChild(e),window.onDataLoaded=e=>{if(e.error)return void c("API Error: "+e.error.message);if(!e.values||e.values.length<2)return void c("No data found or insufficient data");const[a,...n]=e.values,s=n.map(e=>a.reduce((t,a,n)=>(t[a]=e[n]||"No response",t),{}));t(s)},()=>{delete window.onDataLoaded,document.body.removeChild(e)}},[]);return l?s.a.createElement("div",{className:"error-message"},l):s.a.createElement("div",{className:"responses-container"},0===e.length?s.a.createElement("div",null,"Loading..."):e.map((e,t)=>s.a.createElement("div",{key:t,className:"response-card"},s.a.createElement("div",{className:"response-header",onClick:()=>(e=>{r(a===e?null:e)})(t)},s.a.createElement("h3",null,"Response ",t+1),s.a.createElement("span",null,a===t?"\u25b2":"\u25bc")),a===t&&s.a.createElement("div",{className:"response-details"},Object.entries(e).map((e,t)=>{let[a,n]=e;return s.a.createElement("div",{key:t,className:"qa-pair"},s.a.createElement("p",{className:"question"},a),s.a.createElement("p",{className:"answer"},n))})))))};var o=function(){return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement("h1",null,"Student Council Survey Responses")),s.a.createElement("main",null,s.a.createElement(c,null)))};var d=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,15)).then(t=>{let{getCLS:a,getFID:n,getFCP:s,getLCP:r,getTTFB:l}=t;a(e),n(e),s(e),r(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(o,null))),d()},3:function(e,t,a){e.exports=a(14)}},[[3,1,2]]]);
//# sourceMappingURL=main.213304cf.chunk.js.map