
vjo.ctype("vjo.darwin.tracking.sojourner.SojData").props({sojD:null}).endType();

vjo.ctype("vjo.darwin.tracking.sojourner.CalData").props({setData:function(_1,_2){if(!_1||!_2){return;}
this.cal[_1]=_2;},getData:function(_3){if(_3){return this.cal[_3];}}}).inits(function(){this.cal={};}).endType();

vjo.ctype("vjo.darwin.tracking.sojourner.TrackingRespHdl").needs(["vjo.darwin.tracking.sojourner.SojData","vjo.darwin.tracking.sojourner.CalData"]).props({handleResponse:function(_1){if(_1.errors&&_1.errors.length>0){this.vj$.SojData.sojD="";}
if(_1.response&&_1.response.dataMap&&_1.response.dataMap.SOJDATA){this.vj$.SojData.sojD=_1.response.dataMap.SOJDATA;}
if(_1.response&&_1.response.dataMap&&_1.response.dataMap.TDATA){this.vj$.CalData.setData(_1.svcId,_1.response.dataMap.TDATA);}}}).endType();

vjo.ctype("vjo.darwin.tracking.enabler.TrackingEnablerUtil").needs("vjo.dsf.EventDispatcher").needs("vjo.dsf.utils.URL").needs("vjo.dsf.cookie.VjCookieJar").props({seekParent:function(_1,_2){if(!_1||!_1.tagName){return"";}
if(_1.tagName.toLowerCase()=="a"||_1.tagName.toLowerCase()=="area"){return _1;}
if(_1.tagName.toUpperCase()=="INPUT"&&_1.getAttribute("type")&&_1.getAttribute("type").toUpperCase()=="SUBMIT"){return _1;}
if(_2>0){return this.seekParent(_1.parentNode,_2-1);}else{return"";}},splitParm:function(_3){var v=[-1,-1,-1,-1];var f=_3.split(".");for(var i=0;i<f.length;i++){var s=f[i].substr(0,1);if(s=="p"){v[0]=f[i].substr(1);}
if(s=="c"){v[1]=f[i].substr(1);}
if(s=="m"){v[2]=f[i].substr(1);}
if(s=="l"){v[3]=f[i].substr(1);}}
return v;},enc:function(i){var A=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];var P="z";var _b="";var B=A.length;var _d;if(i==-1){return P;}
while(i>=B){_d=i%B;_b=A[_d]+_b;i=i/B|0;}
_b=A[i]+_b;return _b;},checkSiteDomain:function(_e){var dd=document.domain,i=dd.indexOf(".ebay.");if(i!=-1){dd=dd.substr(i+1);}
if(_e&&_e.length>0){if(_e.charAt(0)=="/"){return true;}else{if(_e.indexOf(dd)==-1){return false;}}
return true;}
return dd;}}).endType();

vjo.ctype("vjo.darwin.tracking.enabler.TrackingEnabler").needs("vjo.dsf.utils.URL").needs("vjo.dsf.cookie.VjCookieJar").needs("vjo.darwin.tracking.enabler.TrackingEnablerUtil").props({rewriteURLs:function(_1,_2,_3,_4,_5){if(_1.nativeEvent===null||_1.nativeEvent===undefined){return;}
var _6=_1.nativeEvent.srcElement||_1.nativeEvent.target;if(_6===null||_6===undefined){return;}
if(_6.tagName.toLowerCase()=="img"||_6.tagName.toLowerCase()=="span"){_6=_6.parentNode;}
var _7=_6.getAttribute(_4);if(_7===null){return;}
_7=_7.split(_5);if(_7[0]){var _8=_6.href;if(_8&&vjo.darwin.tracking.enabler.TrackingEnablerUtil.checkSiteDomain(_8)){_8=vjo.dsf.utils.URL.addArg(_8,_2,_7[0]);if(_7[1]){_8=vjo.dsf.utils.URL.addArg(_8,_3,_7[1]);}
_6.href=" "+_8;}}},copySIDToCookie:function(_9,_a,_b,_c){var _d=";";var vj=vjo.dsf.cookie.VjCookieJar;var u=vjo.darwin.tracking.enabler.TrackingEnablerUtil;var x="undefined";if(typeof(_GlobalNavHeaderCookieTracking)==x||!_GlobalNavHeaderCookieTracking){return this.rewriteURLs(_9,_a,_c,_b,_d);}
if(typeof(_GlobalNavHeaderStatic)!=x&&_GlobalNavHeaderStatic){vj.writeCookielet("ds2","sotr");return;}
var pid=_GlobalNavHeaderSrcPageId;var V="a";var P="zzzz";var _14=_9.nativeEvent.srcElement||_9.nativeEvent.target;if(!_14){return;}
_14=u.seekParent(_14,3);if(!_14){return;}
var url=_14.href;var isF=false;var _17=_14.getAttribute(_b);if(_14.tagName=="INPUT"&&_14.getAttribute("type").toUpperCase()=="SUBMIT"){var _18=document.getElementsByName(_a);url=_14.form.action;for(var i=0;i<_18.length;i++){if(_18[i].tagName=="INPUT"&&_18[i].getAttribute("type")&&_18[i].getAttribute("type").toUpperCase()=="HIDDEN"&&_18[i].form==_14.form){isF=true;_17=_18[i].value;}}}
if(!u.checkSiteDomain(url)){return;}
var v=[-1,-1,-1,-1];var _1b=[-1,-1,-1,-1];var oc=vj.readCookie("ds2","sotr");if(oc&&oc.length==12&&oc.substr(0,1)=="a"){var _1d=oc.substr(1,4);if(_1d!="zzzz"){_1b[0]=_1d;}
_1d=oc.substr(5,1);if(_1d!="z"){_1b[1]=_1d;}
_1d=oc.substr(6,3);if(_1d!="zzz"){_1b[2]=_1d;}
_1d=oc.substr(9,3);if(_1d!="zzz"){_1b[3]=_1d;}}
var b=false;if(_17){_17=_17.split(_d);var _1f;if(url&&_17[0]){_1f=_17[0];if(_17[1]){try{url=vjo.dsf.utils.URL.addArg(url,_c,_17[1]);_14.href=" "+url;}
catch(e){}}
v=u.splitParm(_1f);b=true;}}
if(!b){var _20=_a+"=";if(url&&url.indexOf(_20)!=-1){try{var p=(url.substr(url.indexOf(_20)+_20.length)).split("&");_1f=p[0];v=u.splitParm(_1f);b=true;}
catch(e){}}}
if(!b&&v[0]==-1){if(!pid||!_9.nativeEvent){return;}else{v[0]=pid;b=true;}}
if(isF&&v[0]===0&&pid){v[0]=pid;}
if(b){var cv=V;if(v[0]==-1&&_1b[0]!=-1){cv+=_1b[0];}else{cv+=(u.enc(v[0])+P).substr(0,4);}
if(v[1]==-1&&_1b[1]!=-1){cv+=_1b[1];}else{cv+=u.enc(v[1]);}
if(v[2]==-1&&_1b[2]!=-1){cv+=_1b[2];}else{cv+=(u.enc(v[2])+P).substr(0,3);}
if(v[3]==-1&&_1b[3]!=-1){cv+=_1b[3];}else{cv+=(u.enc(v[3])+P).substr(0,3);}
vj.writeCookielet("ds2","sotr",cv);}}}).endType();

vjo.ctype("vjo.dsf.typeextensions.string.Comparison").endType();String.prototype.has=function(_1){return(this.indexOf(_1)!=-1);};String.prototype.hasArg=function(_2){var a=_2,rv=false;if(typeof(a)=="string"){rv=this.has(a);}else{var aL=a.length;for(var j=0;j<aL&&!rv;j++){rv=this.has(a[j]);}}
return rv;};String.prototype.hasAny=function(){var a=arguments,l=a.length,rv=false;for(var i=0;i<l&&!rv;i++){rv=this.hasArg(a[i]);}
return rv;};String.prototype.hasAll=function(){var a=arguments,l=a.length;for(var i=0;i<l;i++){if(!this.hasArg(a[i])){return false;}}
return true;};String.prototype.is=function(s){return(this==s);};String.prototype.isAny=function(){var a=arguments,l=a.length,rv=false,aL;for(var i=0;i<l&&!rv;i++){if(typeof(a[i])=="string"){rv=(this==a[i]);}else{aL=a[i].length;for(var j=0;j<aL&&!rv;j++){rv=(this==a[i][j]);}}}
return rv;};

vjo.itype("vjo.dsf.common.IJsHandler").protos({handle:function(_1){}}).endType();

vjo.ctype("vjo.darwin.tracking.enabler.TrackingModuleEnabler").needs("vjo.dsf.utils.URL").needs("vjo.dsf.typeextensions.string.Comparison").needs("vjo.dsf.cookie.VjCookieJar").needs("vjo.darwin.tracking.enabler.TrackingEnablerUtil").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1,_2,_3,_4){this.sCid=_1;this.sParms=_2;this.sCidParms=_3;this.sDelim=_4;this.oCJ=vjo.dsf.cookie.VjCookieJar;this.oU=vjo.darwin.tracking.enabler.TrackingEnablerUtil;},logModuleId:function(_5){var V="a";var P="zzzz";if(!_5.nativeEvent||_5.nativeEvent===null||_5.nativeEvent===undefined){return;}
var sc=false;if(typeof(_GlobalNavHeaderCookieTracking)!="undefined"&&_GlobalNavHeaderCookieTracking){sc=true;}
var _9=_5.nativeEvent.srcElement||_5.nativeEvent.target;if(!_9||_9===null||_9===undefined){return;}
_9=this.oU.seekParent(_9,3);if(!_9){return;}
var _a=this.sCidParms.split(this.sDelim);if(_a[0]&&_9&&_9.href&&!_9.href.has("javascript:")){if(sc){var v=[-1,-1,-1,-1];v=this.oU.splitParm(_a[0]);var _c=V;_c+=(this.oU.enc(v[0])+P).substr(0,4);_c+=this.oU.enc(v[1]);_c+=(this.oU.enc(v[2])+P).substr(0,3);_c+=(this.oU.enc(v[3])+P).substr(0,3);this.oCJ.writeCookielet("ds2","sotr",_c);}else{var _d=vjo.dsf.utils.URL.addArg(_9.href,this.sCid,_a[0]);if(_a[1]){_d=vjo.dsf.utils.URL.addArg(_d,this.sParms,_a[1]);}
_9.href=" "+_d;}}},getAnchor:function(_e){var e=_e;if(e&&e.tagName){if(!e.tagName.is("A")&&!e.tagName.is("INPUT")&&(e.tagName.is("INPUT")&&e.getAttribute("type")!="SUBMIT")){e=this.getAnchor(e.parentNode);}
return e;}},handle:function(_10){this.logModuleId(_10);}}).endType();

vjo.ctype("vjo.darwin.core.ebayheader.rover.FooterRover").needs("vjo.dsf.cookie.VjCookieJar").props({command:null,roverService:function(_1){if(document.location.protocol.has("https:")){return;}
this.command=_1;if(!_1){return;}
if(!this.isCookieValid()){return;}
vjo.dsf.EventDispatcher.addEventListener(window,"load",this.sendRequest,this);},sendRequest:function(){var _2=new vjo.dsf.assembly.VjClientAssemblerRequest(this.command,this.handleResponse,this,"cb",false);vjo.dsf.assembly.VjClientAssembler.load(_2);},isCookieValid:function(){var _3=vjo.dsf.cookie.VjCookieJar.readCookie("dp1","idm");if(!_3){return true;}else{return false;}},handleResponse:function(_4){if(_4&&_4.length>1){var _5=_4.length-1;for(var i=0;i<_5;i++){this.createImage(_4[i]);}
this.setCookieExpiration(_4[_5]);}},createImage:function(_7){if(_7&&_7.length>1){var _8=document.createElement("IMG");_8.width="1";_8.height="1";_8.src=_7;_8.alt="";document.body.appendChild(_8);}},setCookieExpiration:function(_9){if(typeof _9=="number"&&_9>0){vjo.dsf.cookie.VjCookieJar.writeCookielet("dp1","idm","1",_9/86400,"");}}}).endType();

vjo.ctype("vjo.darwin.core.dynamicmenu.ReplaceHandler").props({replace:function(_1,_2,_3){var dm=vjo.Registry.get(_1);if(null!=dm){dm.replaceJSONDataHandler(_2,_3);}}}).endType();

vjo.needs("vjo.dsf.typeextensions.string.Comparison");vjo.ctype("vjo.dsf.typeextensions.string.Trim").endType();String.prototype.trim=function(){var s=this;while(s.substring(0,1).isAny(" ","\n","\r")){s=s.substring(1,s.length);}
while(s.substring(s.length-1,s.length).isAny(" ","\n","\r")){s=s.substring(0,s.length-1);}
return s;};

vjo.ctype("vjo.darwin.core.globalheader.searchbox.SearchBox").needs(["vjo.dsf.client.Browser","vjo.dsf.typeextensions.string.Trim"]).props({Focus:function(_1){var _2=vjo.dsf.Element.get(_1),B=vjo.dsf.client.Browser.bIE;if(typeof(_2)!="undefined"&&_2){if(B.bIE&&B.iVer==6){setTimeout(function(){_2.focus();},0);}else{_2.focus();}}},IeOptionDisabler:function(_3){if(vjo.dsf.client.Browser.bIE){var sl=vjo.dsf.Element.get(_3),idx;if(sl){sl.onchange=function(){idx=this.selectedIndex=(this.options[this.selectedIndex].disabled)?idx:this.selectedIndex;};sl.onfocus=function(){idx=this.selectedIndex;};this.greydisabledoption(sl);}}},greydisabledoption:function(e){var i,op;for(i=0;i<e.options.length;i++){op=e.options[i];if(op.disabled){op.style.color="graytext";}}}}).endType();

vjo.ctype("vjo.darwin.tracking.impression.Manager").needs(["vjo.dsf.cookie.VjCookieJar","vjo.dsf.EventDispatcher"]).protos({constructs:function(_1){if(!_1){return;}
var R=vjo.Registry,id="_pim",t=R.get(id);if(!t){t=this;t.vj$.EventDispatcher.add("body","mousedown",t.onMouseDown,t);R.put(id,t);}
t.sID=_1;},onMouseDown:function(){this.vj$.VjCookieJar.writeCookielet("ebay","psi",this.sID);}}).endType();

vjo.ctype("vjo.darwin.tracking.rover.Rover").needs("vjo.dsf.cookie.VjCookieJar").props({roverTrack:function(){var _1=new Date().getTime();var _2=vjo.darwin.tracking.rover.Rover.getClientOffset(_1);var _3=vjo.dsf.cookie.VjCookieJar.readCookieObj("npii","tpim");if(_3==null||_3.value==""){return;}
var _4=parseInt(_3.maxage,16)*1000;if(_4>0){var _5=_4-_1+_2;var _6=15552000000;if((_5>_6||_5<0)&&typeof(RoverSyncDropped)=="undefined"&&typeof(RoverNsCapable)=="undefined"){vjo.darwin.tracking.rover.Rover.dropRoverSyncImage();}}},dropRoverSyncImage:function(){if(typeof(RoverDomainBaseUrl)!=="undefined"&&RoverDomainBaseUrl.length>0){var im=document.createElement("img");im.width="1";im.height="1";im.src=RoverDomainBaseUrl+"/roversync/?rtpim=1&mpt="+new Date().getTime();document.body.appendChild(im);}},getClientOffset:function(_8){var _9;var _a=vjo.dsf.cookie.VjCookieJar.readCookie("ebay","cos");if(_a!==null&&_a.length>0){_9=parseInt(_a,16)*1000;}else{if(typeof(svrGMT)!=="undefined"){_9=_8-svrGMT;var _b=Math.round(_9/1000);if(!isNaN(_b)){vjo.dsf.cookie.VjCookieJar.writeCookielet("ebay","cos",_b.toString(16));}}}
if(isNaN(_9)){_9=1800000;}
return _9;}}).endType();

vjo.ctype("vjo.darwin.core.utils.ElementUtils").needs("vjo.dsf.Element","E").needs("vjo.dsf.EventDispatcher").props({oLst:[],get:function(_1,_2){var _3=[];if(typeof(_1)=="object"){for(var i in _1){var _5=_1[i];_3[i]=this.get(_5,_2);}
return _3;}
var t=this,elem=t.oLst[_1];if(!elem||!elem.parentNode||_2){t.oLst[_1]=this.vj$.E.get(_1);}
return t.oLst[_1];}}).inits(function(){vjo.dsf.EventDispatcher.addEventListener(window,"unload",function(){vjo.darwin.core.utils.ElementUtils.oLst=null;});}).endType();

vjo.ctype("vjo.darwin.core.utils.WindowDimension").props({getBrowserDimension:function(){var s=self;var d=document;var de=d.documentElement;if(s.innerHeight){return[s.innerWidth,s.innerHeight];}else{if(de&&de.clientHeight){return[de.clientWidth,de.clientHeight];}}
return[d.body.clientWidth,d.body.clientHeight];},getScrollXY:function(){var _4=0,scrOfY=0,scrOfH=0,scrOfW=0,d=document.documentElement||document.body;if(typeof(window.pageYOffset)=="number"){return[window.pageXOffset,window.pageYOffset,document.height,document.width];}else{if(d){return[d.scrollLeft,d.scrollTop,d.scrollHeight,d.scrollWidth];}}
return[_4,scrOfY,scrOfH,scrOfW];},getOffsetPosition:function(_5){var e=_5,l=0,t=0,z=0,tz,h=e.offsetHeight,w=e.offsetWidth;while(e){l+=e.offsetLeft;t+=e.offsetTop;if(e.style){tz=parseInt(e.style.zIndex,10);z=!isNaN(tz)&&tz>z?tz:z;}
e=e.offsetParent;}
return[l,t,z,h,w];}}).endType();

vjo.ctype("vjo.darwin.core.globalheader.overlay.Overlay").needs("vjo.darwin.core.utils.ElementUtils","EU").needs("vjo.darwin.core.utils.WindowDimension","W").needs("vjo.dsf.EventDispatcher","ED").props({timer:null,currObj:[],contentObjRef:null,id:null,keepOpen:false,iOpen:false,init:function(_1,_2){var t=this;t.id=_1;var _4=function(){var _5=vjo.dsf.Element.get(_1);if(_5){document.body.appendChild(_5);var E=t.vj$.ED;E.addEventListener(_5,"mouseout",t.closeOverlay,t);E.addEventListener(_5,"mouseover",t.cancelOpen,t);}};if(!window["overlayinit"]){t.vj$.ED.add("body","load",_4,t);window["overlayinit"]=true;}},openOverlay:function(_7){var t=this,CHV=/chevron[0-9]+/,l=t.vj$,E=l.EU,W=l.W;if(_7[0]&&!CHV.test(_7[0])&&E.get(_7[0])){var a1=E.get(_7[0]),a2=E.get("BrowseCategories"),hb=E.get("headerWrapper");if(hb){hb.className=hb.className.replace(" gh-zidx","");}
a1.className="gh-ai";if(a2){a2.className=a2.className.replace(" gh-hbdr","");a2.className=a2.className.replace(" gh-hs","");}}
if(_7){t.keepOpen=_7[6];}
_7=_7||t.currObj;var tE=E.get(_7[0]),bD=W.getBrowserDimension(),ovrly=E.get(t.id),cO=(typeof(_7[1])=="object")?_7[1]:E.get(_7[1]);t.currObj=_7;if(!ovrly||!tE){return;}
var _b=ovrly.childNodes;var _c=(_b[0].innerHTML==undefined)?_b[1]:_b[0];clearTimeout(t.timer);var _d=(_c.offsetWidth>ovrly.offsetWidth);ovrly.className="gh-ovr "+_7[2];_c.className="gh-iovr ";t.trCss(true);var _e=(_d)?_c:ovrly,c=_c.childNodes;if(t.contentObjRef&&c.length>0){t.contentObjRef.appendChild(c[0]);}
_7[4]=(_7[4])?_7[4]:0;_7[5]=(_7[5])?_7[5]:0;var _f;var _10=tE.offsetWidth-2-_7[5];if(c[0]&&c[0].id==cO.id){}else{_c.innerHTML="";t.contentObjRef=cO.parentNode;_f=document.createElement("div");var _11=document.createElement("div");_11.appendChild(_f);_11.appendChild(cO);_c.appendChild(_11);_f.className="gh-ext";_f.style.width=_10+"px";}
var wid=_e.offsetWidth,ltz=W.getOffsetPosition(tE,bD);var _13=(ltz[0]+ltz[4])-wid;var _14=bD[0]-(ltz[0]+wid);var _15=(!_7[3]&&(_14>10||(_14>_13)));var tp=(ltz[1]+ltz[3]+_7[4])+"px",lt=(_15)?(ltz[0]+_7[5])+"px":(_13+_7[5])+"px";if(_f&&!_15){var fw=ovrly.offsetWidth;_f.style.marginLeft=(fw-_10-2)+"px";}
t.applyStyle(ovrly,lt,tp);t.iOpen=true;},applyStyle:function(obj,_19,top){if(obj){var s=obj.style;s.left=_19;s.top=top;}},trCss:function(_1c){var t=this,o=t.currObj?(t.vj$.EU.get(t.currObj[0])):null;if(o){var c=o.className?o.className:"",s="gh-hso";if(!_1c&&c.indexOf(s)>-1){return;}
o.className=(_1c)?c.replace(s,""):c+" "+s;}},cancelOpen:function(){var t=this;t.trCss();clearTimeout(t.timer);},closeOverlay:function(_20){var t=this;if(t.keepOpen){return;}
t.trCss(true);var f=function(){t.close();t.iOpen=false;};_20=(_20)?_20:250;t.timer=setTimeout(f,_20);},close:function(e){var t=this;var elm=(e)?e.nativeEvent.srcElement||e.nativeEvent.target:null;if(elm&&t.currObj[0]==elm.id){return;}
t.applyStyle(t.vj$.EU.get(t.id),"-1000px","-1000px");t.currObj=[];t.keepOpen=null;t.iOpen=false;}}).endType();
vjo.darwin.core.globalheader.overlay.Overlay.init("gbh_ovl", "http://p.ebaystatic.com/aw/pics/homepage/imgMenuBg.png");
vjo.ctype("vjo.darwin.core.globalheader.utils.HeaderMenu").needs("vjo.dsf.utils.JsLoader","JSL").needs("vjo.dsf.Element","E").protos({jsonObj:null,menuObj:[],constructs:function(_1){var t=this;t.m=_1;t.jsUrl=null;t.domain=null;},replaceJSONDataHandler:function(_3,_4){if(_3!=null){this.handler=_3;}
if(_4!=null){this.domain=_4;}},setHandlerSource:function(_5){if(_5){this.jsUrl=_5;}},clearHS:function(){this.jsUrl=null;},getHandlerSource:function(){return this.jsUrl;},getHandler:function(){return this.handler;},setHandler:function(h){this.m.handler=h;},loadJs:function(_7){var t=this,url=t.jsUrl;if(url&&!t.jsonObj){var _9=function(){t.getMenuHtml(_7);};t.vj$.JSL.load(url,_9,t);}else{t.getMenuHtml(_7);}},getMenuHtml:function(_a){var t=this;t.jsonObj=true;var _c;var _d=t.m.domain;var _e=t.menuObj[t.m.handler];var _f=document.getElementById(t.m.parentTriggerId);var _10=(_f)?-_f.offsetWidth:0;var arr=[t.m.triggerId,_e,t.m.cssClzName,t.m.isRtAlign,t.m.topMargin,_10,_a];var _12=vjo.darwin.core.globalheader.overlay.Overlay;if(_e){_12.openOverlay(arr);return;}
var _13,i,j,k,c,h,ipc,u,ff,ll,E=t.vj$.Element,lh=window.location.href,dPrvdr=window[t.m.handler],data=dPrvdr?dPrvdr():null,items=data?data.items:[],l=items.length,qaUrls=[".paradise.qa.ebay.com",".no-pool-name.qa.ebay.com",".qa.ebay.com"];if(l<=0){return;}
if(lh.has("ebay.com/")){for(i=0;i<l;i++){if(items[i].value.has("eBay Motors")){items[i].value="Cars, Boats, Vehicles & Parts";items[i].url="http://www.motors.ebay.com";items.sort(t.sortByValue);break;}}}
var _1e=t.m.noOfColumns||1;ipc=Math.ceil(l/_1e);h="<table border='0' cellpadding='0' cellspacing='0'>";for(i=0;i<ipc;i++){h+="<tr>";for(j=0;j<_1e;j++){h+="<td nowrap>";c=items[j*ipc+i];if(c){if(c.url){u=c.url;if(_d){for(k=0;k<qaUrls.length;k++){var _1f=qaUrls[k];if(c.url.indexOf(_1f)>=0){u=c.url.replace(_1f,_d);break;}}}
u=t.cobrandUrl(u);h+="<a href='"+u+"'>";h+=c.value;h+="</a>";}else{u=c.value;ff=u.indexOf("href=\"");if(ff==-1){h+=u;}else{ff+="href=\"".length;ll=u.lastIndexOf("\"");u=u.substr(ff,ll-ff);h+=c.value.substr(0,ff)+t.cobrandUrl(u)+c.value.substr(ll);}}}else{h+="&nbsp;";}
h+="</td>";}
h+="</tr>";}
h+="</table>";_13=_c?_c.replace("##1##",h):h;var _20=document.createElement("spanWrap"),sp=document.createElement("span");_20.style.display="none";sp.id=t.m.triggerId+"cat";sp.className="gh-smn";sp.innerHTML=_13;_20.appendChild(sp);document.body.appendChild(_20);arr[1]=sp;t.menuObj[t.m.handler]=sp;_12.openOverlay(arr);return _13;},sortByValue:function(_21,_22){if(_21.value.has("Everything")){return 1;}else{if(_22.value.has("Everything")){return-1;}else{return _21.value<_22.value?-1:(_21.value>_22.value?1:0);}}},cobrandUrl:function(_23){var lh=window.location.href;if(!lh.has("sandbox.")){return _23;}
var u="undefined",cc,cf;if(this.oCobrand==null&&typeof(ebay)!=u&&typeof(ebay.oDocument)!=u){cc=ebay.oDocument._getControl("cobrandCollection");if(cc){cf=cc._getControl("cobrandFunctions");this.oCobrand=cf;}}else{cf=this.oCobrand;}
var lc=(_23.substring(_23.length)!="/")?"/":"";if(cf&&typeof(cf.cobrandURL)!=u){return cf.cobrandURL(_23+lc);}else{if(typeof(vjo.darwin.core.cobrand)!=u&&typeof(vjo.darwin.core.cobrand.EbaySandbox)!=u){return vjo.darwin.core.cobrand.EbaySandbox.cobrandURL(_23);}}
return _23;}}).endType();

vjo.ctype("vjo.darwin.core.globalheader.utils.HeaderMenuObj").protos({constructs:function(_1,_2,_3,_4,_5,_6,_7){var t=this;t.noOfColumns=_5||1;t.handler=_6;t.triggerId=_1;t.cssClzName=_2;t.isRtAlign=_4;t.parentTriggerId=_3;t.topMargin=_7;}}).endType();

vjo.ctype("vjo.dsf.utils.Css").needs("vjo.dsf.Element").props({apply:function(_1,_2){var e=vjo.dsf.Element.get(_1),c;if(e&&_2){c=this.createStyle(_2);if(c){e.appendChild(c);}}
return c;},createStyle:function(_4){var c=document.createElement("style"),t;c.type="text/css";if(_4){if(c.styleSheet){c.styleSheet.cssText=_4;}else{t=document.createTextNode(_4);c.appendChild(t);}}
return c;}}).endType();

vjo.ctype("vjo.darwin.core.globalheader.utils.EventReg").needs("vjo.dsf.EventDispatcher","ED").needs("vjo.darwin.core.utils.ElementUtils","E").needs("vjo.darwin.core.utils.WindowDimension","W").needs("vjo.darwin.core.globalheader.overlay.Overlay","O").needs("vjo.darwin.core.globalheader.utils.HeaderMenu","HM").needs("vjo.darwin.core.globalheader.utils.HeaderMenuObj","HMO").needs("vjo.dsf.client.Browser","BR").needs("vjo.dsf.utils.Css","CS").props({fn4Array:[],fn4Aggregated:function(_1){var t=this,fnArr=t.fn4Array,len=fnArr.length;if(t.vj$.O.iOpen){while(len--){fnArr[len].apply(null,[_1]);}}},searchBarResize:function(){var t=this,l=t.vj$,fn=function(_4){var _5=l.E.get("headerSearch");if(!_5){return;}
var _6=_5.offsetWidth;var o=l.E.get("_nkw");var _8=864;var _9=400;var _a=759;if(!o||_6<_a){return;}
o.style.width=(_6<_8)?(_9-(_8-_6))+"px":_9+"px";};l.ED.addEventListener(window,"resize",fn,window);setTimeout(fn,100);},registerMouseEvent:function(_b,_c,_d,_e,_f,_10,_11,_12,_13){var t=this;var _15=function(){l=t.vj$,E=l.E,ED=l.ED,O=l.O;_d=_d||"mouseover";_e=_e||"mouseout";for(var _16 in _b){var _17=_b[_16][0]||_16;var _18=_16;var _19=_b[_16][1];var _1a=false;for(var i in _f){if(_f[i]==_16){_1a=true;break;}}
if(_12){var obj=new l.HM(new vjo.darwin.core.globalheader.utils.HeaderMenuObj(_18,_c,null,_1a,1,_19,_10));ED.add(_18,_d,t.open(obj));}else{ED.add(_18,_d,t.openOvl(_17,_19,_c,_1a,_10,_13));}
if(_e){ED.add(_18,_e,t.close(_11));}}};t.vj$.ED.add("body","load",_15,t);},openOvl:function(id,_1e,css,_20,_21,_22){var t=this;return function(){t.vj$.O.openOverlay([id,_1e,css,_20,_21,_22]);};},registerVerisign:function(id,_25,_26,_27){var t=this;var l=t.vj$;var _2a=function(){var _2b=l.E.get(id);var _2c=l.W.getOffsetPosition(_2b);var _2d=l.E.get(_26);var ovr=l.W.getOffsetPosition(_2d);var _2f=_2c[4];var _30=ovr[3];var arr=[id,_2d,_25,false,-_30,-_2f,true];l.O.openOverlay(arr);};var _32=function(){l.O.close();};var hdl=function(){l.ED.add(id,"click",_2a,t);l.ED.add(_27,"click",_32,t);};l.ED.add("body","load",hdl);},changeBtStyle:function(id){var t=this,ED=t.vj$.ED;ED.add("body","load",function(){var o=t.vj$.E.get(id);if(o){ED.add(id,"mousedown",function(){o.className="gh-btn gh-bc";},t);ED.add(id,"mouseup",function(){o.className="gh-btn";},t);}},t);},registerAndCreateHeaderButtons:function(_37,_38,_39,_3a,_3b,_3c,_3d,_3e,_3f,_40){var t=this,len=_3b?_3b.length:0,ED=t.vj$.ED,R=vjo.Registry;while(len--){var _42={triggerId:_3d[len],cssClzName:_3a,parentTriggerId:_3c[len],isRtAlign:false,noOfColumns:_38[len],handler:_3b[len],domain:_39,topMargin:_37},hm=new t.vj$.HM(_42);R.put(_3f[len],hm);ED.add("body","load",(function(i){return function(evt){t.changeHover(_3c[i],_3d[i],_3e,_3f[i],_40);};})(len));}},changeHover:function(_45,_46,_47,_48,_49){var t=this,E=t.vj$.E,ED=t.vj$.ED,a1=E.get(_45),a2=E.get(_46);var fn1=function(){if(a1&&!a1.className.match(_47)){a1.className+=" "+_47;}},fn2=function(){if(a1&&(!t.vj$.O.iOpen||(t.vj$.O.bound&&a1!=t.vj$.O.bound.baseElm))){a1.className=a1.className.replace(_47,"");}},fn3=function(){if(!t.vj$.O.iOpen){t.vj$.O.bound={baseElm:a1,link:a2};t.setBdr(a1,a2);if(a2){a2.className+=" "+_47;}
var _4c=vjo.Registry.get(_48);if(_4c){_4c.loadJs(true);}}else{t.vj$.O.close();var _4d=t.vj$.O.bound;if(_4d&&_4d.link&&a2!=_4d.link){if(_4d.link){_4d.link.className="gh-ai";}
t.setBdr(_4d.baseElm,_4d.link,true);fn3();}else{if(a2){a2.className="gh-ai";}
t.setBdr(a1,a2,true);}}
return false;},fn4=function(_4e){var elm=_4e.nativeEvent.srcElement||_4e.nativeEvent.target;if(elm&&(elm.id==_46||vjo.dsf.Element.containsElement(t.vj$.E.get(_46),elm))){return;}
t.vj$.O.close(_4e);if(a2){a2.className="gh-ai";}
fn2();t.setBdr(a1,a2,true);};if(_45!=""&&_46!=""){ED.add(_46,"mouseover",fn1);ED.add(_46,"mouseout",fn2);ED.add(_46,"click",fn3);if(t.fn4Array.length<=0){ED.add("body","click",t.fn4Aggregated,t);}
t.fn4Array[t.fn4Array.length]=fn4;}},setBdr:function(a1,a2,_52){var t=this,hObj=t.vj$.E.get("headerWrapper"),c1=" gh-hbdr",c1_a="gh-hbdr",c1_=" gh-hs",c2=" gh-hbdp",c3=" gh-zidx";if(a1){var c=a1.className||"";c=(_52)?c.replace(c1," "):c+c1;if(_52){c=c.replace(c1_a,"");}
c=(_52)?c.replace(c1_," "):c+c1_;c=(_52)?c.replace(c1_,""):c;a1.className=c;}
if(a2){var c=a2.className||"";a2.className=(_52)?c.replace(c2,""):c+c2;}
if(hObj){var c=hObj.className||"";hObj.className=(_52)?c.replace(c3,""):c+c3;}},registerClickEvent:function(_55,_56,_57,_58,_59){var t=this,l=t.vj$;var _5b=[_55,_56,_57,_58,_59];var fun=function(){l.C.loadJs(_5b);};l.ED.add(_56,"click",fun,this.vj$.C);},open:function(obj){var t=this;return function(){var _5f=t.vj$.O.bound;if(_5f&&_5f.link){if(_5f.link){_5f.link.className="gh-ai";}
t.setBdr(_5f.baseElm,_5f.link,true);}
obj.getMenuHtml();};},close:function(_60){var t=this;return function(){t.vj$.O.closeOverlay(_60);};},doctypeFix:function(){var t=this,d=document,b=t.vj$.BR;var _63=d.childNodes[0].nodeValue;var _64=(_63)?_63.toLowerCase():null;if(b.bIE&&b.iVer>7&&(!_63||_64.indexOf("doctype")<0||_64.indexOf(".dtd")<0)){var s=t.vj$.CS.createStyle(".gh-w {font-size: x-small}");if(s){d.getElementsByTagName("head")[0].appendChild(s);}
return true;}
return false;},regFooterEvent:function(_66,_67,_68){var t=this,o=t.vj$.E.get(_68),ED=t.vj$.ED;ED.add(_66,"click",function(){if(o){o.style.display="block";var h=o.offsetHeight;if(h>0){o.style.height=(h-22)+"px";o.style.marginTop=-(h+15)+"px";}}});var _6b=function(e){var el=e.nativeEvent.srcElement||e.nativeEvent.target;if((vjo.dsf.Element.containsElement(o,el)||el.id==_66)&&!vjo.dsf.Element.containsElement(vjo.dsf.Element.get(_67),el)){return;}
if(o){o.style.display="none";}};ED.add(_67,"click",_6b);ED.add("body","click",_6b);}}).endType();
(function(){var hasDocType = vjo.darwin.core.globalheader.utils.EventReg.doctypeFix(); var styles=[];styles['ie6']=".gh-go, .gh-sbox input.gh-btn {overflow:visible; width:0; padding:4px 19px}";styles['ie7']=".gh-go {padding:2px 6px}.gh-go {padding:0 3px; border:0 solid #ccc}.coreFooterLinks a {font-size:xx-small !important}";styles['ie8']=(hasDocType) ? styles['ie7'] : null;var b=vjo.dsf.client.Browser;if(b.bIE && styles['ie'+b.iVer]) {var s=vjo.dsf.utils.Css.createStyle(styles['ie'+b.iVer]);if(s) document.getElementsByTagName('head')[0].appendChild(s); }})();vjo.darwin.core.globalheader.utils.EventReg.registerVerisign("verisign", "gh-vs", "vrsgncont", "closeId");(function () {
var _r = vjo.Registry;
_r.put('ReskinFooterTrackingCompSpecGenerator_0',new vjo.darwin.tracking.enabler.TrackingModuleEnabler("_trksid", "_trkparms", "m571;", ";")); })();function FooterTrk(){ return {handle:function (event){ (function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
_d.add('glbfooter','click',function(event) { this.handle(event); },_r._ReskinFooterTrackingCompSpecGenerator_0);})();  }};};vjo.dsf.EventDispatcher.add('body','load', new FooterTrk());(function () {
var _r = vjo.Registry;
function $o0(){return new vjo.darwin.tracking.enabler.TrackingModuleEnabler("_trksid","_trkparms","m570;",";");};_r.put('ReskinHeaderTrackingCompSpecGenerator_0',$o0()); _r.put('ReskinHeaderTrackingCompSpecGenerator_1',$o0()); _r.put('ReskinHeaderTrackingCompSpecGenerator_2',$o0()); })();function ReskinHeaderTrk(){ return {handle:function (event){ (function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
function $0(){return function(event){return this.handle(event);};};_d.add('BrowseCategories-menu','click',$0(),_r._ReskinHeaderTrackingCompSpecGenerator_0);_d.add('gnheader','click',$0(),_r._ReskinHeaderTrackingCompSpecGenerator_1);_d.add('gbh_ovl','click',$0(),_r._ReskinHeaderTrackingCompSpecGenerator_2);_d.add('body','click',function(event){ vjo.darwin.tracking.enabler.TrackingEnabler.copySIDToCookie(event, "_trksid", "_sp", "_trkparms");  });})();  }};};vjo.dsf.EventDispatcher.add('body','load', new ReskinHeaderTrk());
// de_DE/e673i/GH-RA_ReskinSignInEbay_e673i11338063_1_de_DE
// b=11338063