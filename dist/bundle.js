!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.DIOInt=t():e.DIOInt=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=7)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={isPortraitOrientation:function(){return window.innerHeight>window.innerWidth},killDefaultDragDrop:function(){document.ondragstart=function(){return!1}}}},,,function(e,t,i){},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={cache:{},currentSlideIndex:0,imagesLoaded:0,onBannerLoad:function(e){var t=this;this.imagesLoaded+=1,this.imagesLoaded===this.getSlideNodesCount()&&(this.updateCardDeck(),this.ad.show(),window.setTimeout(function(){return t.toggleAnimation(!0)},0),e.removeEventListener("load",this.onBannerLoad))},toggleAnimation:function(e){this.tape.classList.toggle("tape--animated",e)},createSlides:function(){var e=this;this.data.images.forEach(function(t,i){var n=e.createSlide(t),s=n.querySelector("img");e.tape.appendChild(n),s.addEventListener("load",e.onBannerLoad.bind(e,s))})},createSlide:function(e){var t=document.createElement("div"),i=document.createElement("img");return t.classList.add("slider__slide"),i.classList.add("dio-intint__banner"),i.src=e,t.appendChild(i),t},cacheCoords:function(e){this.cache.x=e},shouldSlide:function(e){var t=e-this.cache.x;return[Math.abs(t)>30,t]},resetActiveClass:function(){this.el.querySelector(".slider__slide--active").classList.remove("slider__slide--active")},addActiveClass:function(){this.getSlideNodes()[this.currentSlideIndex].classList.add("slider__slide--active")},performSlide:function(e){this.updateSlideIndex(e),this.resetActiveClass(),this.addActiveClass(),this.updateCardDeck()},updateSlideIndex:function(e){e<0&&this.canSlide("forward")?this.currentSlideIndex+=1:e>0&&this.canSlide("backward")&&(this.currentSlideIndex-=1)},slide:function(e){var t=this.shouldSlide(e),i=t[0],n=t[1];i&&this.performSlide(n)},getSlideNodes:function(){return Array.prototype.slice.call(this.tape.children)},getSlideNodesCount:function(){return this.getSlideNodes().length},setSlidesCount:function(){this.slidesCount=this.getSlideNodesCount()},setTape:function(){this.tape=this.el.querySelector(".slider__tape")},updateCardDeck:function(){var e=this,t=this.getSlideNodes(),i=t.reduce(function(t,i,n){return n<e.currentSlideIndex?t+i.clientWidth:t},0);this.tape.style.left=this.el.clientWidth/2-t[this.currentSlideIndex].clientWidth/2-i+"px"},bindContext:function(){this.onWindowResize=this.onWindowResize.bind(this),this.onTouchstart=this.onTouchstart.bind(this),this.onTouchend=this.onTouchend.bind(this)},create:function(e){this.data=e,this.el=document.querySelector(".dio-intint__slider"),this.bindContext(),this.setTape(),this.createSlides(),this.setSlidesCount(),this.setInitialSlideIndex(),this.addActiveClass(),this.delegateEvents()},setInitialSlideIndex:function(){this.currentSlideIndex=Math.round(this.getSlideNodesCount()/2)-1},canSlide:function(e){return"backward"===e?this.currentSlideIndex>0:this.currentSlideIndex<this.slidesCount-1},onWindowResize:function(){var e=this;this.toggleAnimation(!1),this.updateCardDeck(),window.setTimeout(function(){return e.toggleAnimation(!0)},0)},delegateEvents:function(){this.el.addEventListener("touchstart",this.onTouchstart),this.el.addEventListener("mousedown",this.onTouchstart),this.el.addEventListener("touchend",this.onTouchend),this.el.addEventListener("mouseup",this.onTouchend),window.addEventListener("resize",this.onWindowResize)},onTouchstart:function(e){var t=e.changedTouches&&e.changedTouches[0].clientX||e.pageX;this.cacheCoords(t)},onTouchend:function(e){var t=e.changedTouches&&e.changedTouches[0].clientX||e.pageX;this.slide(t)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={DOMCollectionApply:function(e,t){[].concat(function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}(e)).forEach(t)},getNWords:function(e,t){return e.split(" ").slice(0,t||20).join(" ")+"..."}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(i(5)),s=r(i(0)),o=r(i(4));function r(e){return e&&e.__esModule?e:{default:e}}t.default={enums:{STAR_CHECKED_CLASS:"is-checked"},adjustForOrientation:function(){this.el.querySelector(".mode--portrait").classList.toggle("hidden",!s.default.isPortraitOrientation()),this.el.querySelector(".mode--landscape").classList.toggle("hidden",s.default.isPortraitOrientation())},delegateEvents:function(){window.addEventListener("resize",this.onWindowResize)},onWindowResize:function(){this.adjustForOrientation(),s.default.isPortraitOrientation()||(this.el.style.width="100%")},initBanner:function(){var e=this;n.default.DOMCollectionApply(this.el.querySelectorAll(".info__img"),function(t){return t.src=e.data.thumbnail})},applyTitle:function(){var e=this;n.default.DOMCollectionApply(this.el.querySelectorAll(".info__text"),function(t){return t.textContent=n.default.getNWords(e.data.title)})},applyRating:function(){var e=this;n.default.DOMCollectionApply(this.el.querySelectorAll("[data-rating]"),function(t,i){t.classList.remove(e.enums.STAR_CHECKED_CLASS),window.parseInt(t.dataset.rating)<=e.data.rating&&t.classList.add(e.enums.STAR_CHECKED_CLASS)})},show:function(){this.el.style.opacity=1},create:function(e){this.data=e,this.el=document.querySelector(".dio-intint__container"),this.slider=o.default,this.slider.ad=this,this.onWindowResize=this.onWindowResize.bind(this),this.delegateEvents(),this.adjustForOrientation(),this.initBanner(),this.applyTitle(),this.applyRating(),this.slider.create(e)}}},function(e,t,i){"use strict";var n=o(i(0)),s=o(i(6));function o(e){return e&&e.__esModule?e:{default:e}}i(3);e.exports=function(e){n.default.killDefaultDragDrop(),s.default.create(e)}}])});