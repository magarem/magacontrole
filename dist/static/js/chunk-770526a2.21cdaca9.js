(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-770526a2"],{6724:function(e,t,n){"use strict";n("8d41");var a="@@wavesContext";function i(e,t){function n(n){var a=Object.assign({},t.value),i=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),o=i.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(r.width,r.height)+"px",o.appendChild(s)),i.type){case"center":s.style.top=r.height/2-s.offsetHeight/2+"px",s.style.left=r.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(n.pageY-r.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(n.pageX-r.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=i.color,s.className="waves-ripple z-active",!1}}return e[a]?e[a].removeHandle=n:e[a]={removeHandle:n},n}var o={bind:function(e,t){e.addEventListener("click",i(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[a].removeHandle,!1),e.addEventListener("click",i(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[a].removeHandle,!1),e[a]=null,delete e[a]}},r=function(e){e.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(r)),o.install=r;t["a"]=o},"716b":function(e,t,n){(function(t,n){e.exports=n()})(0,function(){return function(e){function t(a){if(n[a])return n[a].exports;var i=n[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=9)}([function(e,t,n){"use strict";t.a={prefix:"",suffix:"",thousands:",",decimal:".",precision:2}},function(e,t,n){"use strict";var a=n(2),i=n(5),o=n(0);t.a=function(e,t){if(t.value){var r=n.i(i.a)(o.a,t.value);if("INPUT"!==e.tagName.toLocaleUpperCase()){var s=e.getElementsByTagName("input");1!==s.length||(e=s[0])}e.oninput=function(){var t=e.value.length-e.selectionEnd;e.value=n.i(a.a)(e.value,r),t=Math.max(t,r.suffix.length),t=e.value.length-t,t=Math.max(t,r.prefix.length+1),n.i(a.b)(e,t),e.dispatchEvent(n.i(a.c)("change"))},e.onfocus=function(){n.i(a.b)(e,e.value.length-r.suffix.length)},e.oninput(),e.dispatchEvent(n.i(a.c)("input"))}}},function(e,t,n){"use strict";function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m.a;"number"==typeof e&&(e=e.toFixed(r(t.precision)));var n=e.indexOf("-")>=0?"-":"",a=o(e),i=l(a,t.precision),s=d(i).split("."),p=s[0],f=s[1];return p=c(p,t.thousands),t.prefix+n+u(p,f,t.decimal)+t.suffix}function i(e,t){var n=e.indexOf("-")>=0?-1:1,a=o(e),i=l(a,t);return parseFloat(i)*n}function o(e){return d(e).replace(/\D+/g,"")||"0"}function r(e){return s(0,e,20)}function s(e,t,n){return Math.max(e,Math.min(t,n))}function l(e,t){var n=Math.pow(10,t);return(parseFloat(e)/n).toFixed(r(t))}function c(e,t){return e.replace(/(\d)(?=(?:\d{3})+\b)/gm,"$1"+t)}function u(e,t,n){return t?e+n+t:e}function d(e){return e?e.toString():""}function p(e,t){var n=function(){e.setSelectionRange(t,t)};e===document.activeElement&&(n(),setTimeout(n,1))}function f(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var m=n(0);n.d(t,"a",function(){return a}),n.d(t,"d",function(){return i}),n.d(t,"b",function(){return p}),n.d(t,"c",function(){return f})},function(e,t,n){"use strict";function a(e,t){t&&Object.keys(t).map(function(e){s.a[e]=t[e]}),e.directive("money",r.a),e.component("money",o.a)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(6),o=n.n(i),r=n(1),s=n(0);n.d(t,"Money",function(){return o.a}),n.d(t,"VMoney",function(){return r.a}),n.d(t,"options",function(){return s.a}),n.d(t,"VERSION",function(){return l});var l="0.8.1";t.default=a,"undefined"!=typeof window&&window.Vue&&window.Vue.use(a)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),i=n(0),o=n(2);t.default={name:"Money",props:{value:{required:!0,type:[Number,String],default:0},masked:{type:Boolean,default:!1},precision:{type:Number,default:function(){return i.a.precision}},decimal:{type:String,default:function(){return i.a.decimal}},thousands:{type:String,default:function(){return i.a.thousands}},prefix:{type:String,default:function(){return i.a.prefix}},suffix:{type:String,default:function(){return i.a.suffix}}},directives:{money:a.a},data:function(){return{formattedValue:""}},watch:{value:{immediate:!0,handler:function(e,t){var a=n.i(o.a)(e,this.$props);a!==this.formattedValue&&(this.formattedValue=a)}}},methods:{change:function(e){this.$emit("input",this.masked?e.target.value:n.i(o.d)(e.target.value,this.precision))}}}},function(e,t,n){"use strict";t.a=function(e,t){return e=e||{},t=t||{},Object.keys(e).concat(Object.keys(t)).reduce(function(n,a){return n[a]=void 0===t[a]?e[a]:t[a],n},{})}},function(e,t,n){var a=n(7)(n(4),n(8),null,null);e.exports=a.exports},function(e,t){e.exports=function(e,t,n,a){var i,o=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(i=e,o=e.default);var s="function"==typeof o?o.options:o;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),a){var l=s.computed||(s.computed={});Object.keys(a).forEach(function(e){var t=a[e];l[e]=function(){return t}})}return{esModule:i,exports:o,options:s}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{directives:[{name:"money",rawName:"v-money",value:{precision:e.precision,decimal:e.decimal,thousands:e.thousands,prefix:e.prefix,suffix:e.suffix},expression:"{precision, decimal, thousands, prefix, suffix}"}],staticClass:"v-money",attrs:{type:"tel"},domProps:{value:e.formattedValue},on:{change:e.change}})},staticRenderFns:[]}},function(e,t,n){e.exports=n(3)}])})},7514:function(e,t,n){"use strict";var a=n("5ca1"),i=n("0a49")(5),o="find",r=!0;o in[]&&Array(1)[o](function(){r=!1}),a(a.P+a.F*r,"Array",{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(o)},"8d41":function(e,t,n){},bc97:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"250px"},attrs:{placeholder:"Código"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.codigo,callback:function(t){e.$set(e.listQuery,"codigo",t)},expression:"listQuery.codigo"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("\n      Procurar\n    ")]),e._v(" "),n("router-link",{attrs:{to:"/vendas/balcao"}},[n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"}},[e._v("\n        Incluir\n      ")])],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v("\n      Exportar\n    ")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[n("el-table-column",{attrs:{label:"N",prop:"id",sortable:"custom",align:"center",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Código",prop:"vendaID",sortable:"custom",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[n("a",{attrs:{href:""},on:{click:function(n){return n.preventDefault(),e.getList_vendaItens(t.row.vendaID)}}},[e._v(e._s(t.row.vendaID))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Cliente",prop:"cliente",sortable:"custom",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("capitalize")(t.row.cliente)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Subtotal",prop:"subtotal",sortable:"custom",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.subtotal)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Acrescimo",prop:"Acrescimo",sortable:"custom",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.acrescimo)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Desconto",prop:"desconto",sortable:"custom",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.desconto)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Dinheiro",prop:"dinheiro",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.dinheiro)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Débito",prop:"debito",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.debito)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Crédito",prop:"credito",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.credito)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Pago",prop:"totalpago",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.totalpago)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Troco",prop:"troco",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.troco)))])]}}])})],1),e._v(" "),n("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"80px"}},[n("el-form-item",{attrs:{label:"EAN",prop:"ean"}},[n("el-input",{model:{value:e.temp.ean,callback:function(t){e.$set(e.temp,"ean",t)},expression:"temp.ean"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Descrição",prop:"descricao"}},[n("el-input",{model:{value:e.temp.descricao,callback:function(t){e.$set(e.temp,"descricao",t)},expression:"temp.descricao"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Preço",prop:"preco"}},[n("money",e._b({staticClass:"el-input__inner",model:{value:e.temp.pco_venda,callback:function(t){e.$set(e.temp,"pco_venda",t)},expression:"temp.pco_venda"}},"money",e.money,!1))],1),e._v(" "),n("el-form-item",{attrs:{label:"Unidade",prop:"unidade"}},[n("el-input",{model:{value:e.temp.unidade,callback:function(t){e.$set(e.temp,"unidade",t)},expression:"temp.unidade"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"Estoque",prop:"estoque"}},[n("el-input",{model:{value:e.temp.estoque,callback:function(t){e.$set(e.temp,"estoque",t)},expression:"temp.estoque"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("\n        Cancela\n      ")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v("\n        Confirma\n      ")])],1)],1),e._v(" "),n("el-dialog",{attrs:{visible:e.dialogPvVisible,title:"Venda",width:"80%",top:"5vh",center:""},on:{"update:visible":function(t){e.dialogPvVisible=t}}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:4}},[n("div",{staticClass:"grid-content bg-purple"},[n("b",[e._v("Venda #:")]),e._v(" "+e._s(e.vendaNumero))])]),e._v(" "),n("el-col",{attrs:{span:4}},[n("div",{staticClass:"grid-content bg-purple"},[n("b",[e._v("Código:")]),e._v(" "+e._s(e.vendaID))])]),e._v(" "),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"grid-content bg-purple"},[n("b",[e._v("Data:")]),e._v(" "+e._s(e.vendaData))])]),e._v(" "),n("el-col",{attrs:{span:6}},[n("div",{staticClass:"grid-content bg-purple"},[n("b",[e._v("Valor:")]),e._v(" "+e._s(e._f("money")(e.vendaTotal)))])])],1),e._v(" "),n("br"),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:!1,expression:"false"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{height:"250",data:e.list2,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[n("el-table-column",{attrs:{label:"Código",prop:"ean",sortable:"custom",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.ean))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Descricao",prop:"descricao",sortable:"custom",align:"center",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("capitalize")(t.row.descricao)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Unidade",prop:"unidade",sortable:"custom",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.unidade))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Preço",prop:"pco_venda",sortable:"custom",align:"center",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.pco_venda)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"Qnt",prop:"qnt",sortable:"custom",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.qnt))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"subtotal",prop:"subtotal",sortable:"custom",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("money")(t.row.subtotal)))])]}}])})],1),e._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogPvVisible=!1}}},[e._v("Fechar")])],1)],1)],1)},i=[],o=(n("ac4d"),n("8a81"),n("ac6a"),n("7514"),n("a481"),n("6b54"),n("b775")),r=(n("db49"),"");function s(e){return Object(o["a"])({url:r+"/vendas",method:"get",params:e})}function l(e){return Object(o["a"])({url:r+"/vendaItens",method:"get",params:e})}function c(e){return Object(o["a"])({url:r+"/produto",method:"post",data:e})}function u(e){return Object(o["a"])({url:r+"/produto",method:"patch",data:e})}var d=n("6724"),p=n("ed08"),f=n("716b"),m=[{key:"CN",display_name:"China"},{key:"US",display_name:"USA"},{key:"JP",display_name:"Japan"},{key:"EU",display_name:"Eurozone"}],v=m.reduce(function(e,t){return e[t.key]=t.display_name,e},{}),h={name:"Vendas",components:{Money:f["Money"]},directives:{waves:d["a"]},filters:{money:function(e){return e?(e=e.toString(),-1===e.indexOf(".")&&(e+=",00"),"R$ "+e.replace(".",",")):""},capitalize:function(e){return e?(e=e.toString(),e.charAt(0).toUpperCase()+e.slice(1)):""},statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return v[e]}},data:function(){return{vendaNumero:0,vendaTotal:0,vendaID:"",money:{decimal:",",thousands:".",prefix:"R$ ",precision:2,masked:!1},vendaData:"",tableKey:0,list:[],list2:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},importanceOptions:[1,2,3],calendarTypeOptions:m,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,pvData:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(e){var t=this;this.listLoading=!0,s(this.listQuery).then(function(e){console.log("response.data.items:",e.data.items),t.list=e.data.items,t.total=e.data.total,setTimeout(function(){t.listLoading=!1},1500)})},getList_vendaItens:function(e){var t=this;this.listLoading=!0,this.dialogPvVisible=!0;var n=this.list.find(function(t){return t.vendaID===e});this.vendaNumero=n.id,this.vendaID=e,this.vendaData=new Date(parseFloat(n.created)).toLocaleDateString(),this.vendaTotal=n.subtotal-n.desconto+parseFloat(n.acrescimo),l({vendaID:e}).then(function(e){console.log("response.data.items:",e.data.items),t.list2=e.data.items,t.total=e.data.total,setTimeout(function(){t.listLoading=!1},1500)})},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(e,t){this.$message({message:"Success",type:"success"}),e.status=t},sortChange:function(e){var t=e.prop,n=e.order;"id"===t&&this.sortByID(n)},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp={id:void 0,importance:1,remark:"",timestamp:new Date,title:"",status:"published",type:""}},handleCreate:function(){var e=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){e.$refs["dataForm"].clearValidate()})},createData:function(){var e=this;this.$refs["dataForm"].validate(function(t){t&&(e.temp.id=parseInt(100*Math.random())+1024,c(e.temp).then(function(){e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})}))})},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs["dataForm"].clearValidate()})},updateData:function(){var e=this;this.$refs["dataForm"].validate(function(t){if(t){var n=Object.assign({},e.temp);n.timestamp=+new Date(n.timestamp),u(n).then(function(){var t=!0,n=!1,a=void 0;try{for(var i,o=e.list[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var r=i.value;if(r.id===e.temp.id){var s=e.list.indexOf(r);e.list.splice(s,1,e.temp);break}}}catch(l){n=!0,a=l}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}e.dialogFormVisible=!1,e.$notify({title:"Sucesso",message:"Registro alterado",type:"success",duration:2e3})})}})},handleDelete:function(e){this.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3});var t=this.list.indexOf(e);this.list.splice(t,1)},handleFetchPv:function(e){},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([n.e("chunk-e69e90f4"),n.e("chunk-58293907")]).then(n.bind(null,"4bf8d")).then(function(t){var n=["timestamp","title","type","importance","status"],a=["timestamp","title","type","importance","status"],i=e.formatJson(a,e.list);t.export_json_to_excel({header:n,data:i,filename:"table-list"}),e.downloadLoading=!1})},formatJson:function(e,t){return t.map(function(t){return e.map(function(e){return"timestamp"===e?Object(p["f"])(t[e]):t[e]})})}}},b=h,g=n("2877"),y=Object(g["a"])(b,a,i,!1,null,null,null);t["default"]=y.exports}}]);