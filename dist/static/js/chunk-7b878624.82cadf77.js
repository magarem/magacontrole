(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b878624"],{"333d":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},a=[];n("c5f6");Math.easeInOutQuad=function(e,t,n,i){return e/=i/2,e<1?n/2*e*e+t:(e--,-n/2*(e*(e-2)-1)+t)};var o=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function r(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,n){var i=s(),a=e-i,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var s=Math.easeInOutQuad(u,i,a,t);r(s),u<t?o(e):n&&"function"===typeof n&&n()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},c=u,d=(n("e498"),n("2877")),p=Object(d["a"])(c,i,a,!1,null,"6af373ef",null);t["a"]=p.exports},6724:function(e,t,n){"use strict";n("8d41");var i="@@wavesContext";function a(e,t){function n(n){var i=Object.assign({},t.value),a=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},i),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(r.width,r.height)+"px",o.appendChild(s)),a.type){case"center":s.style.top=r.height/2-s.offsetHeight/2+"px",s.style.left=r.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-r.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-r.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=a.color,s.className="waves-ripple z-active",!1}}return e[i]?e[i].removeHandle=n:e[i]={removeHandle:n},n}var o={bind:function(e,t){e.addEventListener("click",a(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[i].removeHandle,!1),e.addEventListener("click",a(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[i].removeHandle,!1),e[i]=null,delete e[i]}},r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t["a"]=o},"716b":function(e,t,n){(function(t,n){e.exports=n()})(0,function(){return function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=9)}([function(e,t,n){"use strict";t.a={prefix:"",suffix:"",thousands:",",decimal:".",precision:2}},function(e,t,n){"use strict";var i=n(2),a=n(5),o=n(0);t.a=function(e,t){if(t.value){var r=n.i(a.a)(o.a,t.value);if("INPUT"!==e.tagName.toLocaleUpperCase()){var s=e.getElementsByTagName("input");1!==s.length||(e=s[0])}e.oninput=function(){var t=e.value.length-e.selectionEnd;e.value=n.i(i.a)(e.value,r),t=Math.max(t,r.suffix.length),t=e.value.length-t,t=Math.max(t,r.prefix.length+1),n.i(i.b)(e,t),e.dispatchEvent(n.i(i.c)("change"))},e.onfocus=function(){n.i(i.b)(e,e.value.length-r.suffix.length)},e.oninput(),e.dispatchEvent(n.i(i.c)("input"))}}},function(e,t,n){"use strict";function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m.a;"number"==typeof e&&(e=e.toFixed(r(t.precision)));var n=e.indexOf("-")>=0?"-":"",i=o(e),a=l(i,t.precision),s=d(a).split("."),p=s[0],f=s[1];return p=u(p,t.thousands),t.prefix+n+c(p,f,t.decimal)+t.suffix}function a(e,t){var n=e.indexOf("-")>=0?-1:1,i=o(e),a=l(i,t);return parseFloat(a)*n}function o(e){return d(e).replace(/\D+/g,"")||"0"}function r(e){return s(0,e,20)}function s(e,t,n){return Math.max(e,Math.min(t,n))}function l(e,t){var n=Math.pow(10,t);return(parseFloat(e)/n).toFixed(r(t))}function u(e,t){return e.replace(/(\d)(?=(?:\d{3})+\b)/gm,"$1"+t)}function c(e,t,n){return t?e+n+t:e}function d(e){return e?e.toString():""}function p(e,t){var n=function(){e.setSelectionRange(t,t)};e===document.activeElement&&(n(),setTimeout(n,1))}function f(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var m=n(0);n.d(t,"a",function(){return i}),n.d(t,"d",function(){return a}),n.d(t,"b",function(){return p}),n.d(t,"c",function(){return f})},function(e,t,n){"use strict";function i(e,t){t&&Object.keys(t).map(function(e){s.a[e]=t[e]}),e.directive("money",r.a),e.component("money",o.a)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(6),o=n.n(a),r=n(1),s=n(0);n.d(t,"Money",function(){return o.a}),n.d(t,"VMoney",function(){return r.a}),n.d(t,"options",function(){return s.a}),n.d(t,"VERSION",function(){return l});var l="0.8.1";t.default=i,"undefined"!=typeof window&&window.Vue&&window.Vue.use(i)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),a=n(0),o=n(2);t.default={name:"Money",props:{value:{required:!0,type:[Number,String],default:0},masked:{type:Boolean,default:!1},precision:{type:Number,default:function(){return a.a.precision}},decimal:{type:String,default:function(){return a.a.decimal}},thousands:{type:String,default:function(){return a.a.thousands}},prefix:{type:String,default:function(){return a.a.prefix}},suffix:{type:String,default:function(){return a.a.suffix}}},directives:{money:i.a},data:function(){return{formattedValue:""}},watch:{value:{immediate:!0,handler:function(e,t){var i=n.i(o.a)(e,this.$props);i!==this.formattedValue&&(this.formattedValue=i)}}},methods:{change:function(e){this.$emit("input",this.masked?e.target.value:n.i(o.d)(e.target.value,this.precision))}}}},function(e,t,n){"use strict";t.a=function(e,t){return e=e||{},t=t||{},Object.keys(e).concat(Object.keys(t)).reduce(function(n,i){return n[i]=void 0===t[i]?e[i]:t[i],n},{})}},function(e,t,n){var i=n(7)(n(4),n(8),null,null);e.exports=i.exports},function(e,t){e.exports=function(e,t,n,i){var a,o=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(a=e,o=e.default);var s="function"==typeof o?o.options:o;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),i){var l=s.computed||(s.computed={});Object.keys(i).forEach(function(e){var t=i[e];l[e]=function(){return t}})}return{esModule:a,exports:o,options:s}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"money",rawName:"v-money",value:{precision:e.precision,decimal:e.decimal,thousands:e.thousands,prefix:e.prefix,suffix:e.suffix},expression:"{precision, decimal, thousands, prefix, suffix}"}],staticClass:"v-money",attrs:{type:"tel"},domProps:{value:e.formattedValue},on:{change:e.change}})},staticRenderFns:[]}},function(e,t,n){e.exports=n(3)}])})},7456:function(e,t,n){},"80f2":function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return s}),n.d(t,"d",function(){return l});var i=n("b775"),a=(n("db49"),"");function o(e){return Object(i["a"])({url:a+"/produtos",method:"get",params:e})}function r(e){return Object(i["a"])({url:a+"/produto",method:"delete",params:{pv:e}})}function s(e){return Object(i["a"])({url:a+"/produto",method:"post",data:e})}function l(e){return Object(i["a"])({url:a+"/produto",method:"patch",data:e})}},"8d41":function(e,t,n){},ca40:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"EAN",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.ean,callback:function(t){e.$set(e.listQuery,"ean",t)},expression:"listQuery.ean"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{placeholder:"Descrição",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.descricao,callback:function(t){e.$set(e.listQuery,"descricao",t)},expression:"listQuery.descricao"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      Procurar\n    ")]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("\n      Incluir\n    ")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("\n      Exportar\n    ")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[n("el-table-column",{attrs:{label:"EAN",prop:"ean",sortable:"custom",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.ean))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Descricao",prop:"descricao",sortable:"custom",align:"center",width:"390"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("capitalize")(t.row.descricao)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Preço custo",prop:"pco_custo",sortable:"custom",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.pco_custo)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Preço",prop:"pco_venda",sortable:"custom",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.pco_venda)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Uni",prop:"unidade",sortable:"custom",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.unidade))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Estoque",prop:"estoque",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.estoque))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Actions",align:"center",width:"150","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(i)}}},[e._v("\n          Edit\n        ")]),e._v(" "),"deleted"!=i.status?n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(i)}}},[e._v("\n          Delete\n        ")]):e._e()]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"80px"}},[n("el-form-item",{attrs:{label:"EAN",prop:"ean"}},[n("el-input",{model:{value:e.temp.ean,callback:function(t){e.$set(e.temp,"ean",t)},expression:"temp.ean"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Descrição",prop:"descricao"}},[n("el-input",{model:{value:e.temp.descricao,callback:function(t){e.$set(e.temp,"descricao",t)},expression:"temp.descricao"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Preço custo",prop:"preco_custo"}},[n("money",e._b({staticClass:"el-input__inner",model:{value:e.temp.pco_custo,callback:function(t){e.$set(e.temp,"pco_custo",t)},expression:"temp.pco_custo"}},"money",e.money,!1))],1),e._v(" "),n("el-form-item",{attrs:{label:"Preço",prop:"preco"}},[n("money",e._b({staticClass:"el-input__inner",model:{value:e.temp.pco_venda,callback:function(t){e.$set(e.temp,"pco_venda",t)},expression:"temp.pco_venda"}},"money",e.money,!1))],1),e._v(" "),n("el-form-item",{attrs:{label:"Unidade",prop:"unidade"}},[n("el-input",{model:{value:e.temp.unidade,callback:function(t){e.$set(e.temp,"unidade",t)},expression:"temp.unidade"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Estoque",prop:"estoque"}},[n("el-input",{model:{value:e.temp.estoque,callback:function(t){e.$set(e.temp,"estoque",t)},expression:"temp.estoque"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("\n        Cancela\n      ")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v("\n        Confirma\n      ")])],1)],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(t){e.dialogPvVisible=t}}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pvData,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{prop:"key",label:"Channel"}}),e._v(" "),n("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogPvVisible=!1}}},[e._v("Confirm")])],1)],1)],1)},a=[],o=(n("ac4d"),n("8a81"),n("ac6a"),n("a481"),n("6b54"),n("80f2")),r=n("6724"),s=n("ed08"),l=n("333d"),u=n("716b"),c=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],d=c.reduce(function(e,t){return e[t.key]=t.display_name,e},{}),p={name:"Produtos",components:{Pagination:l["a"],Money:u["Money"]},directives:{waves:r["a"]},filters:{money:function(e){return e=parseFloat(e).toFixed(2),e?(e=e.toString(),-1==e.indexOf(".")&&(e+=",00"),"R$ "+e.replace(".",",")):""},capitalize:function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""},statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return d[e]}},data:function(){return{money:{decimal:",",thousands:".",prefix:"R$ ",precision:2,masked:!1},tableKey:0,list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},importanceOptions:[1,2,3],calendarTypeOptions:c,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0,pco_custo:0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(o["b"])(this.listQuery).then(function(t){console.log("response.data.items:",t.data.items),e.list=t.data.items,e.total=t.data.total,setTimeout(function(){e.listLoading=!1},1500)})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"Success",type:"success"}),e.status=t},sortChange:function(e){var t=e.prop,n=e.order;"id"===t&&this.sortByID(n)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs["dataForm"].clearValidate()})},createData:function(){var e=this;this.$refs["dataForm"].validate(function(t){t&&(e.temp.id=parseInt(100*Math.random())+1024,e.temp.author="vue-element-admin",Object(o["a"])(e.temp).then(function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})}))})},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.pco_custo=this.temp.pco_custo||0,this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs["dataForm"].clearValidate()})},updateData:function(){var e=this;this.$refs["dataForm"].validate(function(t){if(t){var n=Object.assign({},e.temp);n.timestamp=+new Date(n.timestamp),Object(o["d"])(n).then(function(){var t=!0,n=!1,i=void 0;try{for(var a,o=e.list[Symbol.iterator]();!(t=(a=o.next()).done);t=!0){var r=a.value;if(r.id===e.temp.id){var s=e.list.indexOf(r);e.list.splice(s,1,e.temp);break}}}catch(l){n=!0,i=l}finally{try{t||null==o.return||o.return()}finally{if(n)throw i}}e.dialogFormVisible=!1,e.$notify({title:"Sucesso",message:"Registro alterado",type:"success",duration:2e3})})}})},handleDelete:function(e){var t=this;Object(o["c"])(e.id).then(function(e){alert(e.data.pvData),t.pvData=e.data.pvData,t.dialogPvVisible=!0}),this.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3});var n=this.list.indexOf(e);this.list.splice(n,1)},handleFetchPv:function(e){var t=this;Object(o["c"])(e).then(function(e){alert(e.data.pvData),t.pvData=e.data.pvData,t.dialogPvVisible=!0})},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([n.e("chunk-e69e90f4"),n.e("chunk-58293907")]).then(n.bind(null,"4bf8d")).then(function(t){var n=["timestamp","title","type","importance","status"],i=["timestamp","title","type","importance","status"],a=e.formatJson(i,e.list);t.export_json_to_excel({header:n,data:a,filename:"table-list"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?Object(s["f"])(t[e]):t[e]})})}}},f=p,m=n("2877"),v=Object(m["a"])(f,i,a,!1,null,null,null);t["default"]=v.exports},e498:function(e,t,n){"use strict";var i=n("7456"),a=n.n(i);a.a}}]);