import{d as g,u as h,s as b,a as s,o as u,c as B,w as t,b as n,e as x,h as o,f as y,g as C,j as V,k as N}from"./index-BPLZHYt-.js";const w={key:0},P=["href"],I=g({__name:"UserView",setup(S){const i=N(),r=h(),m=String(i.params.id).split("-");r.getPostById(m[0]);const{currentPost:a}=b(r);return(p,c)=>{const d=s("v-avatar"),l=s("v-list-item"),f=s("v-btn"),v=s("v-list"),k=s("v-container");return u(),B(k,null,{default:t(()=>[n(a)?(u(),x("div",w,[o(v,null,{default:t(()=>{var _;return[o(l,{class:"mt-2",title:(_=n(a).user)==null?void 0:_.username},{prepend:t(()=>{var e;return[o(d,{class:"mt-2",rounded:"",image:(e=n(a).user)==null?void 0:e.avatar_url,size:"80"},null,8,["image"])]}),default:t(()=>{var e;return[y("a",{class:"d-flex mt-2 text-blue-accent-2",href:(e=n(a).user)==null?void 0:e.profile_url,target:"_blank"}," Link Giphy ",8,P)]}),_:1},8,["title"]),o(l,null,{default:t(()=>[o(f,{class:"bg-primary",onClick:c[0]||(c[0]=e=>p.$router.go(-1))},{default:t(()=>[C(" Back to Giphy? ")]),_:1})]),_:1})]}),_:1})])):V("",!0)]),_:1})}}});export{I as default};