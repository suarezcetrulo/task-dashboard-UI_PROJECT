(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,a){e.exports=a(33)},28:function(e,t,a){},29:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n=a(2),l=a.n(n),s=a(18),c=a.n(s),r=(a(28),a(29),a(20)),o=a(35);const u=Object(r.a)("http://localhost:4000"),d=e=>{let{tasks:t}=e;return l.a.createElement("div",{className:"task-list"},t.length>0?t.map(e=>l.a.createElement(i,{key:e.id,task:e})):l.a.createElement("p",null,"No tasks available."))},i=e=>{let{task:t}=e;return l.a.createElement("div",{className:`task-item status-${t.status.toLowerCase().replace(" ","-")}`},l.a.createElement("h2",null,t.task_name),l.a.createElement("p",null,"Status: ",t.status),l.a.createElement("p",null,"Created at: ",new Date(t.created_at).toLocaleString()),l.a.createElement("p",null,"Execution time: ",t.execution_time," minutes"),t.ended_at&&l.a.createElement("p",null,"Ended at: ",new Date(t.ended_at).toLocaleString()))};var m=()=>{const[e,t]=Object(n.useState)([]),[a,s]=Object(n.useState)(!0),[c,r]=Object(n.useState)(null);return Object(n.useEffect)(()=>{(async()=>{try{const e=await o.a.get("http://localhost:4000/api/tasks");t(e.data)}catch(c){r("Failed to fetch tasks. Please try again later."),console.error("Error fetching tasks",c)}finally{s(!1)}})()},[]),Object(n.useEffect)(()=>(u.on("taskAdded",e=>{t(t=>[...t,e])}),u.on("taskUpdated",e=>{t(t=>t.map(t=>t.id===e.id?e:t))}),()=>{u.off("taskAdded"),u.off("taskUpdated")}),[]),l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"Task Dashboard"),a?l.a.createElement("p",null,"Loading tasks..."):c?l.a.createElement("p",null,c):l.a.createElement(d,{tasks:e}))};var p=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,36)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:s,getTTFB:c}=t;a(e),n(e),l(e),s(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(m,null))),p()}},[[21,1,2]]]);
//# sourceMappingURL=main.e9b8ce09.chunk.js.map