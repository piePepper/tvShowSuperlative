(this["webpackJsonptv-show-superlative"]=this["webpackJsonptv-show-superlative"]||[]).push([[0],{148:function(e,t,a){e.exports=a(451)},152:function(e,t,a){},451:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(24),i=a.n(c),o=(a(152),a(7)),s=a(8),l=a(10),u=a(9),m=a(34),p=a(3),h=a(57),d=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).setDisplayArray=function(){console.log(n.props.data),n.setState({displayArray:n.props.data},(function(){return console.log(n.state.displayArray)}))},n.state={displayArray:[]},n}return Object(s.a)(a,[{key:"componentDidUpdate",value:function(e,t){e.data!==this.props.data&&this.setDisplayArray()}},{key:"render",value:function(){return r.a.createElement("div",null,this.state.displayArray.map((function(e){return r.a.createElement(m.b,{to:"/show/".concat(e.id)},r.a.createElement("div",{className:"cardContainer"},r.a.createElement("img",{src:e.image.medium,alt:"add this"}),r.a.createElement("h4",{className:"bodyCardRating"},e.rating.average),r.a.createElement("h3",{className:"bodyCardTitle"},e.name)))})))}}]),a}(n.Component),f=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).createFilterArrays=function(t){var a=[];e.props.chosenFilters.forEach((function(e,n){var r=[],c=Object(h.a)(e,2),i=c[0],o=c[1];void 0===o?t.forEach((function(e){null===e["".concat(i)]||void 0===e["".concat(i)]||(e["".concat(i)].constructor===Array?e["".concat(i)].forEach((function(e){r.includes(e)||r.push(e)})):r.includes(e["".concat(i)])||r.push(e["".concat(i)]))})):t.forEach((function(e){null===e["".concat(i)]||void 0===e["".concat(i)]||null===e["".concat(i)]["".concat(o)]||void 0===e["".concat(i)]["".concat(o)]||(e["".concat(i)]["".concat(o)].constructor===Array?e["".concat(i)]["".concat(o)].forEach((function(e){r.includes(e)||r.push(e)})):r.includes(e["".concat(i)]["".concat(o)])||r.push(e["".concat(i)]["".concat(o)]))})),a.push([r.sort(),[i],[o]])})),e.setState({filters:a})},e.dropHandler=function(t){var a=e.state.returnFilter;""===t.target.value?a["".concat(t.target.id)][0]="":a["".concat(t.target.id)][0]=t.target.value,e.setState({returnFilter:a},(function(){return e.props.bringItOnBack(e.state.returnFilter)}))},e.searchHandler=function(t){e.setState({searchBar:t.target.value})},e.sideBarData=function(t){t.preventDefault(),e.props.searchPass(e.state.searchBar)},e.state={searchBar:"",filters:[],returnFilter:[["","language"],["","genres"],["","status"],["","network","name"]]},e}return Object(s.a)(a,[{key:"componentDidUpdate",value:function(e,t){e.apiData!==this.props.apiData&&this.createFilterArrays(this.props.apiData)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("input",{type:"text",placeholder:"Search",onChange:this.searchHandler}),r.a.createElement("button",{className:"sideBarSearchBtn",onClick:this.sideBarData},"Search")),r.a.createElement("form",null,this.state.filters.map((function(t,a){return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"".concat(t[1])),r.a.createElement("select",{id:"".concat(a),name:"".concat(t[1]),onChange:e.dropHandler},r.a.createElement("option",{value:""}),e.state.filters[a][0].map((function(e){return r.a.createElement("option",{value:"".concat(e)},"".concat(e))}))))}))))}}]),a}(n.Component),v=a(48),y=a.n(v),b=(a(97),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).setSearch=function(e){n.setState({query:e},(function(){return n.apiHandler()}))},n.setFilterArray=function(e){var t=e.filter((function(e){if(""!==e[0])return e}));n.setState({filterArray:t},(function(){return n.filterData()}))},n.state={query:"",chosenFilters:[["language"],["genres"],["status"],["network","name"]],apiData:[],filterArray:[],displayArray:[]},n}return Object(s.a)(a,[{key:"apiHandler",value:function(){var e=this;""===this.state.query?y()({url:"https://api.tvmaze.com/shows"}).then((function(t){e.setState({apiData:t.data,displayArray:t.data})})):y()({url:" http://api.tvmaze.com/search/shows?q=".concat(this.state.query)}).then((function(t){e.setState({apiData:t.data.map((function(e){return e.show})),displayArray:t.data.map((function(e){return e.show}))})}))}},{key:"componentDidMount",value:function(){this.apiHandler()}},{key:"filterData",value:function(){var e=this.state.apiData;this.state.filterArray.forEach((function(t){var a=Object(h.a)(t,3),n=a[0],r=a[1],c=a[2];e=e.filter((function(e){if(void 0!==c){if(null===e["".concat(r)]||void 0===e["".concat(r)]||null===e["".concat(r)]["".concat(c)]||void 0===e["".concat(r)]["".concat(c)]);else if(e["".concat(r)]["".concat(c)].includes(n))return e}else if(null!==e["".concat(r)]&&void 0!==e["".concat(r)]&&e["".concat(r)].includes(n))return e}))})),this.setState({displayArray:e})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(f,{chosenFilters:this.state.chosenFilters,apiData:this.state.apiData,bringItOnBack:this.setFilterArray,searchPass:this.setSearch}),r.a.createElement(d,{data:this.state.displayArray}))}}]),a}(n.Component)),E=a(84),g=a.n(E);a(173);g.a.initializeApp({apiKey:"AIzaSyBtt_2ViryDprk5dNwiZzqWYaV8fHTd_K0",authDomain:"tvshowsuperlatives.firebaseapp.com",databaseURL:"https://tvshowsuperlatives.firebaseio.com",projectId:"tvshowsuperlatives",storageBucket:"tvshowsuperlatives.appspot.com",messagingSenderId:"737126203732",appId:"1:737126203732:web:6d32c3814e4e2de65f08c1"});var k=g.a,O=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).componentDidMount=function(){k.database().ref().on("value",(function(t){var a=[],n=t.val();for(var r in n)r.length>14&&a.push({key:r,name:n[r]});console.log(a,"this is my database array"),e.setState({dbReturn:a})}))},e.state={dbReturn:[]},e}return Object(s.a)(a,[{key:"removeList",value:function(e){k.database().ref().child(e).remove()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"firebase-data"},r.a.createElement("h1",null,"User Lists"),r.a.createElement("ul",null,this.state.dbReturn.map((function(t){return r.a.createElement("li",{key:t.key},r.a.createElement(m.b,{to:"/list/".concat(t.key)},r.a.createElement("p",null,t.name.listName),r.a.createElement("button",{onClick:function(){e.removeList(t.key)}},"X")))}))))}}]),a}(n.Component),j=(a(175),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(o.a)(this,a),(e=t.call(this)).state={apiData:[]},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;y()({url:"https://api.tvmaze.com/shows/"+this.props.match.params.id}).then((function(t){console.log(t.data),e.setState({apiData:t.data})}))}},{key:"render",value:function(){var e=this.state.apiData;return e?r.a.createElement("div",{className:"tvShowCard"},r.a.createElement("h1",{className:"showTitle"},e.name),r.a.createElement("img",{src:e.image&&e.image.medium,alt:e.name}),r.a.createElement("ul",null,r.a.createElement("li",null,e.network&&e.network.name),r.a.createElement("li",null,e.country),r.a.createElement("li",null,e.genres),r.a.createElement("li",null,e.summary&&e.summary.replace(/(<([^>]+)>)/gi,"")))):r.a.createElement("div",null,"loading")}}]),a}(n.Component)),w=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"If you see this you got it"))}}]),a}(n.Component),D=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).getListNameThenAddToDatabase=function(){var e={listName:prompt("Enter List Name"),shows:[]};k.database().ref().push(e)},e}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(m.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement("h1",null,"Test PiePepper"),r.a.createElement("button",{onClick:this.getListNameThenAddToDatabase},"Create List")),r.a.createElement(O,null),r.a.createElement(p.a,{exact:!0,path:"/",component:b}),r.a.createElement(p.a,{path:"/show/:id",component:j}),r.a.createElement(p.a,{path:"/list/:listid",component:w})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},97:function(e,t,a){}},[[148,1,2]]]);
//# sourceMappingURL=main.720f3a14.chunk.js.map