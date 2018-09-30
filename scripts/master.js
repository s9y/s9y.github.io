function JFeed(e){e&&this.parse(e)}function JFeedItem(){}function JAtom(e){this._parse(e)}function JRss(e){this._parse(e)}!function(g,v,y){"use strict";var e=function(e,t){!!v.getComputedStyle||(v.getComputedStyle=function(n){return this.el=n,this.getPropertyValue=function(e){var t=/(\-([a-z]){1})/g;return"float"===e&&(e="styleFloat"),t.test(e)&&(e=e.replace(t,function(){return arguments[2].toUpperCase()})),n.currentStyle[e]?n.currentStyle[e]:null},this});var o,r,n,i,a,s,l=function(t,n,i,o){if("addEventListener"in t)try{t.addEventListener(n,i,o)}catch(e){if("object"!=typeof i||!i.handleEvent)throw e;t.addEventListener(n,function(e){i.handleEvent.call(i,e)},o)}else"attachEvent"in t&&("object"==typeof i&&i.handleEvent?t.attachEvent("on"+n,function(){i.handleEvent.call(i)}):t.attachEvent("on"+n,i))},c=function(t,n,i,o){if("removeEventListener"in t)try{t.removeEventListener(n,i,o)}catch(e){if("object"!=typeof i||!i.handleEvent)throw e;t.removeEventListener(n,function(e){i.handleEvent.call(i,e)},o)}else"detachEvent"in t&&("object"==typeof i&&i.handleEvent?t.detachEvent("on"+n,function(){i.handleEvent.call(i)}):t.detachEvent("on"+n,i))},u=function(e,t){for(var n in t)e.setAttribute(n,t[n])},d=function(e,t){0!==e.className.indexOf(t)&&(e.className+=" "+t,e.className=e.className.replace(/(^\s*)|(\s*$)/g,""))},p=function(e,t){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ").replace(/(^\s*)|(\s*$)/g,"")},f=g.createElement("style"),m=g.documentElement,h=function(e,t){var n;for(n in this.options={animate:!0,transition:284,label:"Menu",insert:"before",customToggle:"",closeOnNavClick:!1,openPos:"relative",navClass:"nav-collapse",navActiveClass:"js-nav-active",jsClass:"js",init:function(){},open:function(){},close:function(){}},t)this.options[n]=t[n];if(d(m,this.options.jsClass),this.wrapperEl=e.replace("#",""),g.getElementById(this.wrapperEl))this.wrapper=g.getElementById(this.wrapperEl);else{if(!g.querySelector(this.wrapperEl))throw new Error("The nav element you are trying to select doesn't exist");this.wrapper=g.querySelector(this.wrapperEl)}this.wrapper.inner=function(e){if(e.children.length<1)throw new Error("The Nav container has no containing elements");for(var t=[],n=0;n<e.children.length;n++)1===e.children[n].nodeType&&t.push(e.children[n]);return t}(this.wrapper),r=this.options,o=this.wrapper,this._init(this)};return h.prototype={destroy:function(){this._removeStyles(),p(o,"closed"),p(o,"opened"),p(o,r.navClass),p(o,r.navClass+"-"+this.index),p(m,r.navActiveClass),o.removeAttribute("style"),o.removeAttribute("aria-hidden"),c(v,"resize",this,!1),c(v,"focus",this,!1),c(g.body,"touchmove",this,!1),c(n,"touchstart",this,!1),c(n,"touchend",this,!1),c(n,"mouseup",this,!1),c(n,"keyup",this,!1),c(n,"click",this,!1),r.customToggle?n.removeAttribute("aria-hidden"):n.parentNode.removeChild(n)},toggle:function(){!0===i&&(s?this.close():this.open())},open:function(){s||(p(o,"closed"),d(o,"opened"),d(m,r.navActiveClass),d(n,"active"),o.style.position=r.openPos,u(o,{"aria-hidden":"false"}),s=!0,r.open())},close:function(){s&&(d(o,"closed"),p(o,"opened"),p(m,r.navActiveClass),p(n,"active"),u(o,{"aria-hidden":"true"}),r.animate?(i=!1,setTimeout(function(){o.style.position="absolute",i=!0},r.transition+10)):o.style.position="absolute",s=!1,r.close())},resize:function(){"none"!==v.getComputedStyle(n,null).getPropertyValue("display")?(a=!0,u(n,{"aria-hidden":"false"}),o.className.match(/(^|\s)closed(\s|$)/)&&(u(o,{"aria-hidden":"true"}),o.style.position="absolute"),this._createStyles(),this._calcHeight()):(a=!1,u(n,{"aria-hidden":"true"}),u(o,{"aria-hidden":"false"}),o.style.position=r.openPos,this._removeStyles())},handleEvent:function(e){var t=e||v.event;switch(t.type){case"touchstart":this._onTouchStart(t);break;case"touchmove":this._onTouchMove(t);break;case"touchend":case"mouseup":this._onTouchEnd(t);break;case"click":this._preventDefault(t);break;case"keyup":this._onKeyUp(t);break;case"focus":case"resize":this.resize(t)}},_init:function(){this.index=y++,d(o,r.navClass),d(o,r.navClass+"-"+this.index),d(o,"closed"),s=!(i=!0),this._closeOnNavClick(),this._createToggle(),this._transitions(),this.resize();var e=this;setTimeout(function(){e.resize()},20),l(v,"resize",this,!1),l(v,"focus",this,!1),l(g.body,"touchmove",this,!1),l(n,"touchstart",this,!1),l(n,"touchend",this,!1),l(n,"mouseup",this,!1),l(n,"keyup",this,!1),l(n,"click",this,!1),r.init()},_createStyles:function(){f.parentNode||(f.type="text/css",g.getElementsByTagName("head")[0].appendChild(f))},_removeStyles:function(){f.parentNode&&f.parentNode.removeChild(f)},_createToggle:function(){if(r.customToggle){var e=r.customToggle.replace("#","");if(g.getElementById(e))n=g.getElementById(e);else{if(!g.querySelector(e))throw new Error("The custom nav toggle you are trying to select doesn't exist");n=g.querySelector(e)}}else{var t=g.createElement("a");t.innerHTML=r.label,u(t,{href:"#",class:"nav-toggle"}),"after"===r.insert?o.parentNode.insertBefore(t,o.nextSibling):o.parentNode.insertBefore(t,o),n=t}},_closeOnNavClick:function(){if(r.closeOnNavClick){var n=o.getElementsByTagName("a"),i=this;!function(e,t,n){for(var i=0;i<e.length;i++)t.call(n,i,e[i])}(n,function(e,t){l(n[e],"click",function(){a&&i.toggle()},!1)})}},_preventDefault:function(e){if(e.preventDefault)return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.preventDefault(),e.stopPropagation(),!1;e.returnValue=!1},_onTouchStart:function(e){Event.prototype.stopImmediatePropagation||this._preventDefault(e),this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY,this.touchHasMoved=!1,c(n,"mouseup",this,!1)},_onTouchMove:function(e){(10<Math.abs(e.touches[0].clientX-this.startX)||10<Math.abs(e.touches[0].clientY-this.startY))&&(this.touchHasMoved=!0)},_onTouchEnd:function(e){if(this._preventDefault(e),a&&!this.touchHasMoved){if("touchend"===e.type)return void this.toggle();var t=e||v.event;3!==t.which&&2!==t.button&&this.toggle()}},_onKeyUp:function(e){13===(e||v.event).keyCode&&this.toggle()},_transitions:function(){if(r.animate){var e=o.style,t="max-height "+r.transition+"ms";e.WebkitTransition=e.MozTransition=e.OTransition=e.transition=t}},_calcHeight:function(){for(var e=0,t=0;t<o.inner.length;t++)e+=o.inner[t].offsetHeight;var n="."+r.jsClass+" ."+r.navClass+"-"+this.index+".opened{max-height:"+e+"px !important} ."+r.jsClass+" ."+r.navClass+"-"+this.index+".opened.dropdown-active {max-height:9999px !important}";f.styleSheet?f.styleSheet.cssText=n:f.innerHTML=n,n=""}},new h(e,t)};"undefined"!=typeof module&&module.exports?module.exports=e:v.responsiveNav=e}(document,window,0),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(window.jQuery||window.Zepto)}(function(u){var d,i,p,o,f,t,l="Close",c="BeforeClose",m="MarkupParse",h="Open",g=".mfp",v="mfp-ready",n="mfp-removing",a="mfp-prevent-close",e=function(){},s=!!window.jQuery,y=u(window),C=function(e,t){d.ev.on("mfp"+e+g,t)},w=function(e,t,n,i){var o=document.createElement("div");return o.className="mfp-"+e,n&&(o.innerHTML=n),i?t&&t.appendChild(o):(o=u(o),t&&o.appendTo(t)),o},b=function(e,t){d.ev.triggerHandler("mfp"+e,t),d.st.callbacks&&(e=e.charAt(0).toLowerCase()+e.slice(1),d.st.callbacks[e]&&d.st.callbacks[e].apply(d,u.isArray(t)?t:[t]))},x=function(e){return e===t&&d.currTemplate.closeBtn||(d.currTemplate.closeBtn=u(d.st.closeMarkup.replace("%title%",d.st.tClose)),t=e),d.currTemplate.closeBtn},r=function(){u.magnificPopup.instance||((d=new e).init(),u.magnificPopup.instance=d)};e.prototype={constructor:e,init:function(){var e=navigator.appVersion;d.isLowIE=d.isIE8=document.all&&!document.addEventListener,d.isAndroid=/android/gi.test(e),d.isIOS=/iphone|ipad|ipod/gi.test(e),d.supportsTransition=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1}(),d.probablyMobile=d.isAndroid||d.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),p=u(document),d.popupsCache={}},open:function(e){var t;if(!1===e.isObj){d.items=e.items.toArray(),d.index=0;var n,i=e.items;for(t=0;t<i.length;t++)if((n=i[t]).parsed&&(n=n.el[0]),n===e.el[0]){d.index=t;break}}else d.items=u.isArray(e.items)?e.items:[e.items],d.index=e.index||0;if(!d.isOpen){d.types=[],f="",e.mainEl&&e.mainEl.length?d.ev=e.mainEl.eq(0):d.ev=p,e.key?(d.popupsCache[e.key]||(d.popupsCache[e.key]={}),d.currTemplate=d.popupsCache[e.key]):d.currTemplate={},d.st=u.extend(!0,{},u.magnificPopup.defaults,e),d.fixedContentPos="auto"===d.st.fixedContentPos?!d.probablyMobile:d.st.fixedContentPos,d.st.modal&&(d.st.closeOnContentClick=!1,d.st.closeOnBgClick=!1,d.st.showCloseBtn=!1,d.st.enableEscapeKey=!1),d.bgOverlay||(d.bgOverlay=w("bg").on("click"+g,function(){d.close()}),d.wrap=w("wrap").attr("tabindex",-1).on("click"+g,function(e){d._checkIfClose(e.target)&&d.close()}),d.container=w("container",d.wrap)),d.contentContainer=w("content"),d.st.preloader&&(d.preloader=w("preloader",d.container,d.st.tLoading));var o=u.magnificPopup.modules;for(t=0;t<o.length;t++){var r=o[t];r=r.charAt(0).toUpperCase()+r.slice(1),d["init"+r].call(d)}b("BeforeOpen"),d.st.showCloseBtn&&(d.st.closeBtnInside?(C(m,function(e,t,n,i){n.close_replaceWith=x(i.type)}),f+=" mfp-close-btn-in"):d.wrap.append(x())),d.st.alignTop&&(f+=" mfp-align-top"),d.fixedContentPos?d.wrap.css({overflow:d.st.overflowY,overflowX:"hidden",overflowY:d.st.overflowY}):d.wrap.css({top:y.scrollTop(),position:"absolute"}),(!1===d.st.fixedBgPos||"auto"===d.st.fixedBgPos&&!d.fixedContentPos)&&d.bgOverlay.css({height:p.height(),position:"absolute"}),d.st.enableEscapeKey&&p.on("keyup"+g,function(e){27===e.keyCode&&d.close()}),y.on("resize"+g,function(){d.updateSize()}),d.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&d.wrap.addClass(f);var a=d.wH=y.height(),s={};if(d.fixedContentPos&&d._hasScrollBar(a)){var l=d._getScrollbarSize();l&&(s.marginRight=l)}d.fixedContentPos&&(d.isIE7?u("body, html").css("overflow","hidden"):s.overflow="hidden");var c=d.st.mainClass;return d.isIE7&&(c+=" mfp-ie7"),c&&d._addClassToMFP(c),d.updateItemHTML(),b("BuildControls"),u("html").css(s),d.bgOverlay.add(d.wrap).prependTo(d.st.prependTo||u(document.body)),d._lastFocusedEl=document.activeElement,setTimeout(function(){d.content?(d._addClassToMFP(v),d._setFocus()):d.bgOverlay.addClass(v),p.on("focusin"+g,d._onFocusIn)},16),d.isOpen=!0,d.updateSize(a),b(h),e}d.updateItemHTML()},close:function(){d.isOpen&&(b(c),d.isOpen=!1,d.st.removalDelay&&!d.isLowIE&&d.supportsTransition?(d._addClassToMFP(n),setTimeout(function(){d._close()},d.st.removalDelay)):d._close())},_close:function(){b(l);var e=n+" "+v+" ";if(d.bgOverlay.detach(),d.wrap.detach(),d.container.empty(),d.st.mainClass&&(e+=d.st.mainClass+" "),d._removeClassFromMFP(e),d.fixedContentPos){var t={marginRight:""};d.isIE7?u("body, html").css("overflow",""):t.overflow="",u("html").css(t)}p.off("keyup.mfp focusin"+g),d.ev.off(g),d.wrap.attr("class","mfp-wrap").removeAttr("style"),d.bgOverlay.attr("class","mfp-bg"),d.container.attr("class","mfp-container"),!d.st.showCloseBtn||d.st.closeBtnInside&&!0!==d.currTemplate[d.currItem.type]||d.currTemplate.closeBtn&&d.currTemplate.closeBtn.detach(),d.st.autoFocusLast&&d._lastFocusedEl&&u(d._lastFocusedEl).focus(),d.currItem=null,d.content=null,d.currTemplate=null,d.prevHeight=0,b("AfterClose")},updateSize:function(e){if(d.isIOS){var t=document.documentElement.clientWidth/window.innerWidth,n=window.innerHeight*t;d.wrap.css("height",n),d.wH=n}else d.wH=e||y.height();d.fixedContentPos||d.wrap.css("height",d.wH),b("Resize")},updateItemHTML:function(){var e=d.items[d.index];d.contentContainer.detach(),d.content&&d.content.detach(),e.parsed||(e=d.parseEl(d.index));var t=e.type;if(b("BeforeChange",[d.currItem?d.currItem.type:"",t]),d.currItem=e,!d.currTemplate[t]){var n=!!d.st[t]&&d.st[t].markup;b("FirstMarkupParse",n),d.currTemplate[t]=!n||u(n)}o&&o!==e.type&&d.container.removeClass("mfp-"+o+"-holder");var i=d["get"+t.charAt(0).toUpperCase()+t.slice(1)](e,d.currTemplate[t]);d.appendContent(i,t),e.preloaded=!0,b("Change",e),o=e.type,d.container.prepend(d.contentContainer),b("AfterChange")},appendContent:function(e,t){(d.content=e)?d.st.showCloseBtn&&d.st.closeBtnInside&&!0===d.currTemplate[t]?d.content.find(".mfp-close").length||d.content.append(x()):d.content=e:d.content="",b("BeforeAppend"),d.container.addClass("mfp-"+t+"-holder"),d.contentContainer.append(d.content)},parseEl:function(e){var t,n=d.items[e];if((n=n.tagName?{el:u(n)}:(t=n.type,{data:n,src:n.src})).el){for(var i=d.types,o=0;o<i.length;o++)if(n.el.hasClass("mfp-"+i[o])){t=i[o];break}n.src=n.el.attr("data-mfp-src"),n.src||(n.src=n.el.attr("href"))}return n.type=t||d.st.type||"inline",n.index=e,n.parsed=!0,d.items[e]=n,b("ElementParse",n),d.items[e]},addGroup:function(t,n){var e=function(e){e.mfpEl=this,d._openClick(e,t,n)};n||(n={});var i="click.magnificPopup";n.mainEl=t,n.items?(n.isObj=!0,t.off(i).on(i,e)):(n.isObj=!1,n.delegate?t.off(i).on(i,n.delegate,e):(n.items=t).off(i).on(i,e))},_openClick:function(e,t,n){if((void 0!==n.midClick?n.midClick:u.magnificPopup.defaults.midClick)||!(2===e.which||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)){var i=void 0!==n.disableOn?n.disableOn:u.magnificPopup.defaults.disableOn;if(i)if(u.isFunction(i)){if(!i.call(d))return!0}else if(y.width()<i)return!0;e.type&&(e.preventDefault(),d.isOpen&&e.stopPropagation()),n.el=u(e.mfpEl),n.delegate&&(n.items=t.find(n.delegate)),d.open(n)}},updateStatus:function(e,t){if(d.preloader){i!==e&&d.container.removeClass("mfp-s-"+i),t||"loading"!==e||(t=d.st.tLoading);var n={status:e,text:t};b("UpdateStatus",n),e=n.status,t=n.text,d.preloader.html(t),d.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),d.container.addClass("mfp-s-"+e),i=e}},_checkIfClose:function(e){if(!u(e).hasClass(a)){var t=d.st.closeOnContentClick,n=d.st.closeOnBgClick;if(t&&n)return!0;if(!d.content||u(e).hasClass("mfp-close")||d.preloader&&e===d.preloader[0])return!0;if(e===d.content[0]||u.contains(d.content[0],e)){if(t)return!0}else if(n&&u.contains(document,e))return!0;return!1}},_addClassToMFP:function(e){d.bgOverlay.addClass(e),d.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),d.wrap.removeClass(e)},_hasScrollBar:function(e){return(d.isIE7?p.height():document.body.scrollHeight)>(e||y.height())},_setFocus:function(){(d.st.focus?d.content.find(d.st.focus).eq(0):d.wrap).focus()},_onFocusIn:function(e){if(e.target!==d.wrap[0]&&!u.contains(d.wrap[0],e.target))return d._setFocus(),!1},_parseMarkup:function(o,e,t){var r;t.data&&(e=u.extend(t.data,e)),b(m,[o,e,t]),u.each(e,function(e,t){if(void 0===t||!1===t)return!0;if(1<(r=e.split("_")).length){var n=o.find(g+"-"+r[0]);if(0<n.length){var i=r[1];"replaceWith"===i?n[0]!==t[0]&&n.replaceWith(t):"img"===i?n.is("img")?n.attr("src",t):n.replaceWith(u("<img>").attr("src",t).attr("class",n.attr("class"))):n.attr(r[1],t)}}else o.find(g+"-"+e).html(t)})},_getScrollbarSize:function(){if(void 0===d.scrollbarSize){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),d.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return d.scrollbarSize}},u.magnificPopup={instance:null,proto:e.prototype,modules:[],open:function(e,t){return r(),(e=e?u.extend(!0,{},e):{}).isObj=!0,e.index=t||0,this.instance.open(e)},close:function(){return u.magnificPopup.instance&&u.magnificPopup.instance.close()},registerModule:function(e,t){t.options&&(u.magnificPopup.defaults[e]=t.options),u.extend(this.proto,t.proto),this.modules.push(e)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},u.fn.magnificPopup=function(e){r();var t=u(this);if("string"==typeof e)if("open"===e){var n,i=s?t.data("magnificPopup"):t[0].magnificPopup,o=parseInt(arguments[1],10)||0;n=i.items?i.items[o]:(n=t,i.delegate&&(n=n.find(i.delegate)),n.eq(o)),d._openClick({mfpEl:n},t,i)}else d.isOpen&&d[e].apply(d,Array.prototype.slice.call(arguments,1));else e=u.extend(!0,{},e),s?t.data("magnificPopup",e):t[0].magnificPopup=e,d.addGroup(t,e);return t};var k,I,E,T="inline",_=function(){E&&(I.after(E.addClass(k)).detach(),E=null)};u.magnificPopup.registerModule(T,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){d.types.push(T),C(l+"."+T,function(){_()})},getInline:function(e,t){if(_(),e.src){var n=d.st.inline,i=u(e.src);if(i.length){var o=i[0].parentNode;o&&o.tagName&&(I||(k=n.hiddenClass,I=w(k),k="mfp-"+k),E=i.after(I).detach().removeClass(k)),d.updateStatus("ready")}else d.updateStatus("error",n.tNotFound),i=u("<div>");return e.inlineElement=i}return d.updateStatus("ready"),d._parseMarkup(t,{},e),t}}});var S,j="ajax",P=function(){S&&u(document.body).removeClass(S)},z=function(){P(),d.req&&d.req.abort()};u.magnificPopup.registerModule(j,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){d.types.push(j),S=d.st.ajax.cursor,C(l+"."+j,z),C("BeforeChange."+j,z)},getAjax:function(o){S&&u(document.body).addClass(S),d.updateStatus("loading");var e=u.extend({url:o.src,success:function(e,t,n){var i={data:e,xhr:n};b("ParseAjax",i),d.appendContent(u(i.data),j),o.finished=!0,P(),d._setFocus(),setTimeout(function(){d.wrap.addClass(v)},16),d.updateStatus("ready"),b("AjaxContentAdded")},error:function(){P(),o.finished=o.loadError=!0,d.updateStatus("error",d.st.ajax.tError.replace("%url%",o.src))}},d.st.ajax.settings);return d.req=u.ajax(e),""}}});var O;u.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var e=d.st.image,t=".image";d.types.push("image"),C(h+t,function(){"image"===d.currItem.type&&e.cursor&&u(document.body).addClass(e.cursor)}),C(l+t,function(){e.cursor&&u(document.body).removeClass(e.cursor),y.off("resize"+g)}),C("Resize"+t,d.resizeImage),d.isLowIE&&C("AfterChange",d.resizeImage)},resizeImage:function(){var e=d.currItem;if(e&&e.img&&d.st.image.verticalFit){var t=0;d.isLowIE&&(t=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",d.wH-t)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,O&&clearInterval(O),e.isCheckingImgSize=!1,b("ImageHasSize",e),e.imgHidden&&(d.content&&d.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(t){var n=0,i=t.img[0],o=function(e){O&&clearInterval(O),O=setInterval(function(){0<i.naturalWidth?d._onImageHasSize(t):(200<n&&clearInterval(O),3===++n?o(10):40===n?o(50):100===n&&o(500))},e)};o(1)},getImage:function(e,t){var n=0,i=function(){e&&(e.img[0].complete?(e.img.off(".mfploader"),e===d.currItem&&(d._onImageHasSize(e),d.updateStatus("ready")),e.hasSize=!0,e.loaded=!0,b("ImageLoadComplete")):++n<200?setTimeout(i,100):o())},o=function(){e&&(e.img.off(".mfploader"),e===d.currItem&&(d._onImageHasSize(e),d.updateStatus("error",r.tError.replace("%url%",e.src))),e.hasSize=!0,e.loaded=!0,e.loadError=!0)},r=d.st.image,a=t.find(".mfp-img");if(a.length){var s=document.createElement("img");s.className="mfp-img",e.el&&e.el.find("img").length&&(s.alt=e.el.find("img").attr("alt")),e.img=u(s).on("load.mfploader",i).on("error.mfploader",o),s.src=e.src,a.is("img")&&(e.img=e.img.clone()),0<(s=e.img[0]).naturalWidth?e.hasSize=!0:s.width||(e.hasSize=!1)}return d._parseMarkup(t,{title:function(e){if(e.data&&void 0!==e.data.title)return e.data.title;var t=d.st.image.titleSrc;if(t){if(u.isFunction(t))return t.call(d,e);if(e.el)return e.el.attr(t)||""}return""}(e),img_replaceWith:e.img},e),d.resizeImage(),e.hasSize?(O&&clearInterval(O),e.loadError?(t.addClass("mfp-loading"),d.updateStatus("error",r.tError.replace("%url%",e.src))):(t.removeClass("mfp-loading"),d.updateStatus("ready"))):(d.updateStatus("loading"),e.loading=!0,e.hasSize||(e.imgHidden=!0,t.addClass("mfp-loading"),d.findImageSize(e))),t}}});var M;u.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,r=d.st.zoom,t=".zoom";if(r.enabled&&d.supportsTransition){var n,i,o=r.duration,a=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),n="all "+r.duration/1e3+"s "+r.easing,i={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},o="transition";return i["-webkit-"+o]=i["-moz-"+o]=i["-o-"+o]=i[o]=n,t.css(i),t},s=function(){d.content.css("visibility","visible")};C("BuildControls"+t,function(){if(d._allowZoom()){if(clearTimeout(n),d.content.css("visibility","hidden"),!(e=d._getItemToZoom()))return void s();(i=a(e)).css(d._getOffset()),d.wrap.append(i),n=setTimeout(function(){i.css(d._getOffset(!0)),n=setTimeout(function(){s(),setTimeout(function(){i.remove(),e=i=null,b("ZoomAnimationEnded")},16)},o)},16)}}),C(c+t,function(){if(d._allowZoom()){if(clearTimeout(n),d.st.removalDelay=o,!e){if(!(e=d._getItemToZoom()))return;i=a(e)}i.css(d._getOffset(!0)),d.wrap.append(i),d.content.css("visibility","hidden"),setTimeout(function(){i.css(d._getOffset())},16)}}),C(l+t,function(){d._allowZoom()&&(s(),i&&i.remove(),e=null)})}},_allowZoom:function(){return"image"===d.currItem.type},_getItemToZoom:function(){return!!d.currItem.hasSize&&d.currItem.img},_getOffset:function(e){var t,n=(t=e?d.currItem.img:d.st.zoom.opener(d.currItem.el||d.currItem)).offset(),i=parseInt(t.css("padding-top"),10),o=parseInt(t.css("padding-bottom"),10);n.top-=u(window).scrollTop()-i;var r={width:t.width(),height:(s?t.innerHeight():t[0].offsetHeight)-o-i};return void 0===M&&(M=void 0!==document.createElement("p").style.MozTransform),M?r["-moz-transform"]=r.transform="translate("+n.left+"px,"+n.top+"px)":(r.left=n.left,r.top=n.top),r}}});var B="iframe",Q=function(e){if(d.currTemplate[B]){var t=d.currTemplate[B].find("iframe");t.length&&(e||(t[0].src="//about:blank"),d.isIE8&&t.css("display",e?"block":"none"))}};u.magnificPopup.registerModule(B,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){d.types.push(B),C("BeforeChange",function(e,t,n){t!==n&&(t===B?Q():n===B&&Q(!0))}),C(l+"."+B,function(){Q()})},getIframe:function(e,t){var n=e.src,i=d.st.iframe;u.each(i.patterns,function(){if(-1<n.indexOf(this.index))return this.id&&(n="string"==typeof this.id?n.substr(n.lastIndexOf(this.id)+this.id.length,n.length):this.id.call(this,n)),n=this.src.replace("%id%",n),!1});var o={};return i.srcAction&&(o[i.srcAction]=n),d._parseMarkup(t,o,e),d.updateStatus("ready"),t}}});var A=function(e){var t=d.items.length;return t-1<e?e-t:e<0?t+e:e},F=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};u.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var r=d.st.gallery,e=".mfp-gallery";if(d.direction=!0,!r||!r.enabled)return!1;f+=" mfp-gallery",C(h+e,function(){r.navigateByImgClick&&d.wrap.on("click"+e,".mfp-img",function(){if(1<d.items.length)return d.next(),!1}),p.on("keydown"+e,function(e){37===e.keyCode?d.prev():39===e.keyCode&&d.next()})}),C("UpdateStatus"+e,function(e,t){t.text&&(t.text=F(t.text,d.currItem.index,d.items.length))}),C(m+e,function(e,t,n,i){var o=d.items.length;n.counter=1<o?F(r.tCounter,i.index,o):""}),C("BuildControls"+e,function(){if(1<d.items.length&&r.arrows&&!d.arrowLeft){var e=r.arrowMarkup,t=d.arrowLeft=u(e.replace(/%title%/gi,r.tPrev).replace(/%dir%/gi,"left")).addClass(a),n=d.arrowRight=u(e.replace(/%title%/gi,r.tNext).replace(/%dir%/gi,"right")).addClass(a);t.click(function(){d.prev()}),n.click(function(){d.next()}),d.container.append(t.add(n))}}),C("Change"+e,function(){d._preloadTimeout&&clearTimeout(d._preloadTimeout),d._preloadTimeout=setTimeout(function(){d.preloadNearbyImages(),d._preloadTimeout=null},16)}),C(l+e,function(){p.off(e),d.wrap.off("click"+e),d.arrowRight=d.arrowLeft=null})},next:function(){d.direction=!0,d.index=A(d.index+1),d.updateItemHTML()},prev:function(){d.direction=!1,d.index=A(d.index-1),d.updateItemHTML()},goTo:function(e){d.direction=e>=d.index,d.index=e,d.updateItemHTML()},preloadNearbyImages:function(){var e,t=d.st.gallery.preload,n=Math.min(t[0],d.items.length),i=Math.min(t[1],d.items.length);for(e=1;e<=(d.direction?i:n);e++)d._preloadItem(d.index+e);for(e=1;e<=(d.direction?n:i);e++)d._preloadItem(d.index-e)},_preloadItem:function(e){if(e=A(e),!d.items[e].preloaded){var t=d.items[e];t.parsed||(t=d.parseEl(e)),b("LazyLoad",t),"image"===t.type&&(t.img=u('<img class="mfp-img" />').on("load.mfploader",function(){t.hasSize=!0}).on("error.mfploader",function(){t.hasSize=!0,t.loadError=!0,b("LazyLoadError",t)}).attr("src",t.src)),t.preloaded=!0}}}});var N="retina";u.magnificPopup.registerModule(N,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(1<window.devicePixelRatio){var n=d.st.retina,i=n.ratio;1<(i=isNaN(i)?i():i)&&(C("ImageHasSize."+N,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/i,width:"100%"})}),C("ElementParse."+N,function(e,t){t.src=n.replaceSrc(t,i)}))}}}}),r()}),jQuery.getFeed=function(i){if((i=jQuery.extend({url:null,data:null,cache:!0,success:null,failure:null,error:null,global:!0},i)).url)return jQuery.isFunction(i.failure)&&"null"===jQuery.type(i.error)?i.error=function(e,t,n){i.failure(t,n)}:jQuery.type(i.failure)===jQuery.type(i.error)==="null"&&(i.error=function(e,t,n){window.console&&console.log("getFeed failed to load feed",e,t,n)}),$.ajax({type:"GET",url:i.url,data:i.data,cache:i.cache,dataType:"xml",success:function(e){var t=new JFeed(e);jQuery.isFunction(i.success)&&i.success(t)},error:i.error,global:i.global})},JFeed.prototype={type:"",version:"",title:"",link:"",description:"",parse:function(e){if(1==jQuery("channel",e).length){this.type="rss";var t=new JRss(e)}else if(1==jQuery("feed",e).length){this.type="atom";t=new JAtom(e)}t&&jQuery.extend(this,t)}},JFeedItem.prototype={title:"",link:"",description:"",updated:"",id:""},JAtom.prototype={_parse:function(e){var t=jQuery("feed",e).eq(0);this.version="1.0",this.title=jQuery(t).find("title:first").text(),this.link=jQuery(t).find("link:first").attr("href"),this.description=jQuery(t).find("subtitle:first").text(),this.language=jQuery(t).attr("xml:lang"),this.updated=jQuery(t).find("updated:first").text(),this.items=new Array;var n=this;jQuery("entry",e).each(function(){var e=new JFeedItem;e.title=jQuery(this).find("title").eq(0).text(),e.link=jQuery(this).find("link").eq(0).attr("href"),e.description=jQuery(this).find("content").eq(0).text(),""==e.description&&(e.description=jQuery(this).find("encoded").text()),e.updated=jQuery(this).find("updated").eq(0).text(),e.id=jQuery(this).find("id").eq(0).text(),n.items.push(e)})}},JRss.prototype={_parse:function(e){0==jQuery("rss",e).length?this.version="1.0":this.version=jQuery("rss",e).eq(0).attr("version");var t=jQuery("channel",e).eq(0);this.title=jQuery(t).find("title:first").text(),this.link=jQuery(t).find("link:first").text(),this.description=jQuery(t).find("description:first").text(),this.language=jQuery(t).find("language:first").text(),this.updated=jQuery(t).find("lastBuildDate:first").text(),this.items=new Array;var n=this;jQuery("item",e).each(function(){var e=new JFeedItem;e.title=jQuery(this).find("title").eq(0).text(),e.link=jQuery(this).find("link").eq(0).text(),e.description=jQuery(this).find("description").eq(0).text(),""==e.description&&(e.description=jQuery(this).find("encoded").text()),e.updated=jQuery(this).find("pubDate").eq(0).text(),e.id=jQuery(this).find("guid").eq(0).text(),n.items.push(e)})}},$(function(){responsiveNav(".nav-collapse",{customToggle:"#open-nav",closeOnNavClick:!0});$("#to-top, #markdown-toc a").click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var e=$(this.hash);if((e=e.length&&e||$("[name="+this.hash.slice(1)+"]")).length){var t=e.offset().top;return $("html,body").animate({scrollTop:t},300),!1}}}),$(".image-gallery").magnificPopup({delegate:"a",gallery:{enabled:!0,tCounter:'<span class="mfp-counter">%curr%/%total%</span>'},type:"image"}),$('#content a[href$=".jpg"], #content a[href$=".png"]').magnificPopup({gallery:{enabled:!0,tCounter:'<span class="mfp-counter">%curr%/%total%</span>'},type:"image"}),$('*[data-rss*="http"]').each(function(){$.getFeed({url:$(this).attr("data-rss"),feedparent:$(this),success:function(e){this.feedparent.find("ol").empty();for(var t=0;t<4;t++)if(e.items[t]){var n=$.trim(e.items[t].description).substring(0,250).split(" ").slice(0,-1).join(" ")+"...";this.feedparent.find("ol").append('<li><h3><a href="'+e.items[t].link+'">'+e.items[t].title+"</a></h3><p>"+n+"</p></li>")}}})})});
//# sourceMappingURL=master.js.map