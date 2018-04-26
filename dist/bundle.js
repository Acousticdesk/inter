(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DIOInt"] = factory();
	else
		root["DIOInt"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n  'use strict';\n\n  // var IMAGES = [\n  //   \"[[{\"type\":\"banner\",\"width\":320,\"height\":480}]]\",\n  //   \"[[{\"type\":\"banner\",\"width\":320,\"height\":480}]]\",\n  //   \"[[{\"type\":\"banner\",\"width\":320,\"height\":480}]]\"\n  // ];\n  // var TITLE = \"[[{\"type\":\"title\"}]]\";\n  // var RATING = \"[[{\"type\":\"rating\"}]]\";\n  var IMAGES = [\n    'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg',\n    'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg',\n    'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg'\n\n  ];\n  var TITLE = 'Hello world!';\n  var RATING = 3;\n\n  var helpers = {\n    DOMCollectionApply: function (domCollection, cb) {\n      Array.prototype.slice.call(domCollection).forEach(cb);\n    }\n  };\n\n  var UI = {\n    isPortraitOrientation: function () {\n      return window.innerHeight > window.innerWidth;\n    },\n    killDefaultDragDrop: function () {\n      document.ondragstart = function () {\n        return false;\n      };\n    }\n  };\n\n  var Ad = {\n    enums: {\n      STAR_CHECKED_CLASS: 'info__star--checked'\n    },\n    adjustForOrientation: function () {\n      this.el.querySelector('.mode--portrait').classList.toggle('hidden', !UI.isPortraitOrientation());\n      this.el.querySelector('.mode--landscape').classList.toggle('hidden', UI.isPortraitOrientation());\n    },\n    // adjustSliderHeight: function () {\n    //   this.slider.adjustTapeHeight();\n    // },\n    delegateEvents: function () {\n      window.addEventListener('resize', this.onWindowResize);\n    },\n    onWindowResize: function () {\n      this.adjustForOrientation();\n      // this.adjustSliderHeight();\n      if (!UI.isPortraitOrientation()) {\n        this.el.style.width = '100%';\n      }\n    },\n    initBanner: function () {\n      helpers.DOMCollectionApply(this.el.querySelectorAll('.info__img'), function (image) {\n        image.src = IMAGES[0];\n      });\n    },\n    applyTitle: function () {\n      helpers.DOMCollectionApply(this.el.querySelectorAll('.info__text'), function (titleEl) {\n        titleEl.textContent = TITLE;\n      });\n    },\n    applyRating: function () {\n      helpers.DOMCollectionApply(this.el.querySelectorAll('[data-rating]'), function (starEl) {\n        starEl.classList.remove(this.enums.STAR_CHECKED_CLASS);\n        if ( window.parseInt(starEl.dataset.rating) <= RATING ) {\n          starEl.classList.add(this.enums.STAR_CHECKED_CLASS);\n        }\n      }.bind(this))\n    },\n    show: function () {\n      this.el.style.opacity = 1;\n    },\n    create: function () {\n      this.el = document.querySelector('.ad__container');\n      this.slider = slider;\n      this.slider.ad = this;\n      this.onWindowResize = this.onWindowResize.bind(this);\n      this.delegateEvents();\n      this.adjustForOrientation();\n      this.initBanner();\n      this.applyTitle();\n      this.applyRating();\n      this.slider.create();\n    }\n  };\n\n  var slider = {\n    cache: {},\n    currentSlideIndex: 0,\n    imagesLoaded: 0,\n    onBannerLoad: function (banner) {\n      // this.adjustTapeHeight();\n      this.imagesLoaded += 1;\n      if (this.imagesLoaded === this.getSlideNodesCount()) {\n        this.updateCardDeck();\n        this.ad.show();\n        window.setTimeout(function () {\n          this.toggleAnimation(true);\n        }.bind(this), 0);\n        banner.removeEventListener('load', this.onBannerLoad);\n      }\n    },\n    toggleAnimation: function (state) {\n      this.tape.classList.toggle('tape--animated', state);\n    },\n    createSlides: function () {\n      IMAGES.forEach(function (src, index) {\n        var slideEl = this.createSlide(src);\n        var img = slideEl.querySelector('img');\n        this.tape.appendChild(slideEl);\n        img.addEventListener('load', this.onBannerLoad.bind(this, img));\n      }.bind(this));\n    },\n    createSlide: function (src) {\n      var slideEl = document.createElement('div');\n      var img = document.createElement('img');\n      slideEl.classList.add('slider__slide');\n      img.classList.add('ad__banner');\n      img.src = src;\n      slideEl.appendChild(img);\n      return slideEl;\n    },\n    // adjustTapeHeight: function () {\n    //   this.tape.style.height =\n    //     this.tape.children[this.currentSlideIndex].clientHeight + 'px';\n    // },\n    cacheCoords: function (x) {\n      this.cache.x = x;\n    },\n    shouldSlide: function (x) {\n      var DIFF_TO_SLIDE = 30;\n      var delta = x - this.cache.x;\n      var xAbs = Math.abs(delta);\n      return [xAbs > DIFF_TO_SLIDE, delta];\n    },\n    resetActiveClass: function () {\n      this.el.querySelector('.slider__slide--active').classList.remove('slider__slide--active');\n    },\n    addActiveClass: function () {\n      this.getSlideNodes()[this.currentSlideIndex].classList.add('slider__slide--active');\n    },\n    performSlide: function (delta) {\n      this.updateSlideIndex(delta);\n      // this.adjustTapeHeight();\n      this.resetActiveClass();\n      this.addActiveClass();\n      this.updateCardDeck();\n    },\n    updateSlideIndex: function (delta) {\n      if (delta < 0 && this.canSlide('forward')) {\n        this.currentSlideIndex += 1;\n      } else if (delta > 0 && this.canSlide('backward')) {\n        this.currentSlideIndex -= 1;\n      }\n    },\n    slide: function (x) {\n      var shouldSlideRes = this.shouldSlide(x);\n      var shouldSlide = shouldSlideRes[0];\n      var delta = shouldSlideRes[1];\n      if (shouldSlide) {\n        this.performSlide(delta);\n      }\n    },\n    getSlideNodes: function () {\n      return Array.prototype.slice.call(this.tape.children);\n    },\n    getSlideNodesCount: function () {\n      return this.getSlideNodes().length;\n    },\n    setSlidesCount: function () {\n      this.slidesCount = this.getSlideNodesCount();\n    },\n    setTape: function () {\n      this.tape = this.el.querySelector('.slider__tape');\n    },\n    updateCardDeck: function () {\n      var slides = this.getSlideNodes();\n      var offset = slides.reduce(function (v, s, i) {\n        if (i < this.currentSlideIndex) {\n          return v + s.clientWidth;\n        } return v;\n      }.bind(this), 0);\n      this.tape.style.left = (this.el.clientWidth / 2 - slides[this.currentSlideIndex].clientWidth / 2) - offset + 'px';\n    },\n    bindContext: function () {\n      this.onWindowResize = this.onWindowResize.bind(this);\n      this.onTouchstart = this.onTouchstart.bind(this);\n      this.onTouchend = this.onTouchend.bind(this);\n    },\n    create: function () {\n      this.el = document.querySelector('.ad__slider');\n      this.bindContext();\n      this.setTape();\n      this.createSlides();\n      this.setSlidesCount();\n      this.setInitialSlideIndex();\n      this.addActiveClass();\n      this.delegateEvents();\n    },\n    setInitialSlideIndex: function () {\n      this.currentSlideIndex = Math.round(this.getSlideNodesCount() / 2) - 1;\n    },\n    // resetTapeOffset: function () {\n    //   // this.tape.style.left = 0;\n    // },\n    canSlide: function (_case) {\n      if (_case === 'backward') {\n        return this.currentSlideIndex > 0;\n      }\n      return this.currentSlideIndex < this.slidesCount - 1;\n    },\n    onWindowResize: function () {\n      this.toggleAnimation(false);\n      this.updateCardDeck();\n      window.setTimeout(function () {\n        this.toggleAnimation(true);\n      }.bind(this), 0);\n    },\n    delegateEvents: function () {\n      this.el.addEventListener('touchstart', this.onTouchstart);\n      this.el.addEventListener('mousedown', this.onTouchstart);\n      this.el.addEventListener('touchend', this.onTouchend);\n      this.el.addEventListener('mouseup', this.onTouchend);\n      window.addEventListener('resize', this.onWindowResize);\n    },\n    onTouchstart: function (e) {\n      var x = (e.changedTouches && e.changedTouches[0].clientX) || e.pageX;\n      this.cacheCoords(x);\n    },\n    onTouchend: function (e) {\n      var x = (e.changedTouches && e.changedTouches[0].clientX) || e.pageX;\n      this.slide(x);\n    }\n  };\n\n  UI.killDefaultDragDrop();\n\n  Ad.create();\n});\n\n//# sourceURL=webpack://DIOInt/./src/js/app.js?");

/***/ })

/******/ });
});