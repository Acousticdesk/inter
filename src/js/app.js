// TODO: Use ES6 syntax
// TODO: Encapsulate logic to modules
module.exports = (function (mock) {
  'use strict';

  // var IMAGES = [
  //   "[[{"type":"banner","width":320,"height":480}]]",
  //   "[[{"type":"banner","width":320,"height":480}]]",
  //   "[[{"type":"banner","width":320,"height":480}]]"
  // ];
  // var TITLE = "[[{"type":"title"}]]";
  // var RATING = "[[{"type":"rating"}]]";
  var createDataFromMock = function (mock) {
    return mock;
  };
  var getData = function (mock) {
    if (mock) return createDataFromMock();
    
    return {
      images: [
        'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg',
        'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg',
        'http://wallpaperstock.net/banner-peak_wallpapers_27665_320x480.jpg'
      ],
      title: 'Hello world!',
      rating: 3
    };
  };
  
  var data = getData(mock);

  var helpers = {
    DOMCollectionApply: function (domCollection, cb) {
      Array.prototype.slice.call(domCollection).forEach(cb);
    }
  };

  var UI = {
    isPortraitOrientation: function () {
      return window.innerHeight > window.innerWidth;
    },
    killDefaultDragDrop: function () {
      document.ondragstart = function () {
        return false;
      };
    }
  };

  var Ad = {
    enums: {
      STAR_CHECKED_CLASS: 'info__star--checked'
    },
    adjustForOrientation: function () {
      this.el.querySelector('.mode--portrait').classList.toggle('hidden', !UI.isPortraitOrientation());
      this.el.querySelector('.mode--landscape').classList.toggle('hidden', UI.isPortraitOrientation());
    },
    // adjustSliderHeight: function () {
    //   this.slider.adjustTapeHeight();
    // },
    delegateEvents: function () {
      window.addEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function () {
      this.adjustForOrientation();
      // this.adjustSliderHeight();
      if (!UI.isPortraitOrientation()) {
        this.el.style.width = '100%';
      }
    },
    initBanner: function () {
      helpers.DOMCollectionApply(this.el.querySelectorAll('.info__img'), function (image) {
        image.src = data.images[0];
      });
    },
    applyTitle: function () {
      helpers.DOMCollectionApply(this.el.querySelectorAll('.info__text'), function (titleEl) {
        titleEl.textContent = data.title;
      });
    },
    applyRating: function () {
      helpers.DOMCollectionApply(this.el.querySelectorAll('[data-rating]'), function (starEl) {
        starEl.classList.remove(this.enums.STAR_CHECKED_CLASS);
        if ( window.parseInt(starEl.dataset.rating) <= data.rating ) {
          starEl.classList.add(this.enums.STAR_CHECKED_CLASS);
        }
      }.bind(this))
    },
    show: function () {
      this.el.style.opacity = 1;
    },
    create: function () {
      this.el = document.querySelector('.ad__container');
      this.slider = slider;
      this.slider.ad = this;
      this.onWindowResize = this.onWindowResize.bind(this);
      this.delegateEvents();
      this.adjustForOrientation();
      this.initBanner();
      this.applyTitle();
      this.applyRating();
      this.slider.create();
    }
  };

  var slider = {
    cache: {},
    currentSlideIndex: 0,
    imagesLoaded: 0,
    onBannerLoad: function (banner) {
      // this.adjustTapeHeight();
      this.imagesLoaded += 1;
      if (this.imagesLoaded === this.getSlideNodesCount()) {
        this.updateCardDeck();
        this.ad.show();
        window.setTimeout(function () {
          this.toggleAnimation(true);
        }.bind(this), 0);
        banner.removeEventListener('load', this.onBannerLoad);
      }
    },
    toggleAnimation: function (state) {
      this.tape.classList.toggle('tape--animated', state);
    },
    createSlides: function () {
      data.images.forEach(function (src, index) {
        var slideEl = this.createSlide(src);
        var img = slideEl.querySelector('img');
        this.tape.appendChild(slideEl);
        img.addEventListener('load', this.onBannerLoad.bind(this, img));
      }.bind(this));
    },
    createSlide: function (src) {
      var slideEl = document.createElement('div');
      var img = document.createElement('img');
      slideEl.classList.add('slider__slide');
      img.classList.add('ad__banner');
      img.src = src;
      slideEl.appendChild(img);
      return slideEl;
    },
    // adjustTapeHeight: function () {
    //   this.tape.style.height =
    //     this.tape.children[this.currentSlideIndex].clientHeight + 'px';
    // },
    cacheCoords: function (x) {
      this.cache.x = x;
    },
    shouldSlide: function (x) {
      var DIFF_TO_SLIDE = 30;
      var delta = x - this.cache.x;
      var xAbs = Math.abs(delta);
      return [xAbs > DIFF_TO_SLIDE, delta];
    },
    resetActiveClass: function () {
      this.el.querySelector('.slider__slide--active').classList.remove('slider__slide--active');
    },
    addActiveClass: function () {
      this.getSlideNodes()[this.currentSlideIndex].classList.add('slider__slide--active');
    },
    performSlide: function (delta) {
      this.updateSlideIndex(delta);
      // this.adjustTapeHeight();
      this.resetActiveClass();
      this.addActiveClass();
      this.updateCardDeck();
    },
    updateSlideIndex: function (delta) {
      if (delta < 0 && this.canSlide('forward')) {
        this.currentSlideIndex += 1;
      } else if (delta > 0 && this.canSlide('backward')) {
        this.currentSlideIndex -= 1;
      }
    },
    slide: function (x) {
      var shouldSlideRes = this.shouldSlide(x);
      var shouldSlide = shouldSlideRes[0];
      var delta = shouldSlideRes[1];
      if (shouldSlide) {
        this.performSlide(delta);
      }
    },
    getSlideNodes: function () {
      return Array.prototype.slice.call(this.tape.children);
    },
    getSlideNodesCount: function () {
      return this.getSlideNodes().length;
    },
    setSlidesCount: function () {
      this.slidesCount = this.getSlideNodesCount();
    },
    setTape: function () {
      this.tape = this.el.querySelector('.slider__tape');
    },
    updateCardDeck: function () {
      var slides = this.getSlideNodes();
      var offset = slides.reduce(function (v, s, i) {
        if (i < this.currentSlideIndex) {
          return v + s.clientWidth;
        } return v;
      }.bind(this), 0);
      this.tape.style.left = (this.el.clientWidth / 2 - slides[this.currentSlideIndex].clientWidth / 2) - offset + 'px';
    },
    bindContext: function () {
      this.onWindowResize = this.onWindowResize.bind(this);
      this.onTouchstart = this.onTouchstart.bind(this);
      this.onTouchend = this.onTouchend.bind(this);
    },
    create: function () {
      this.el = document.querySelector('.ad__slider');
      this.bindContext();
      this.setTape();
      this.createSlides();
      this.setSlidesCount();
      this.setInitialSlideIndex();
      this.addActiveClass();
      this.delegateEvents();
    },
    setInitialSlideIndex: function () {
      this.currentSlideIndex = Math.round(this.getSlideNodesCount() / 2) - 1;
    },
    // resetTapeOffset: function () {
    //   // this.tape.style.left = 0;
    // },
    canSlide: function (_case) {
      if (_case === 'backward') {
        return this.currentSlideIndex > 0;
      }
      return this.currentSlideIndex < this.slidesCount - 1;
    },
    onWindowResize: function () {
      this.toggleAnimation(false);
      this.updateCardDeck();
      window.setTimeout(function () {
        this.toggleAnimation(true);
      }.bind(this), 0);
    },
    delegateEvents: function () {
      this.el.addEventListener('touchstart', this.onTouchstart);
      this.el.addEventListener('mousedown', this.onTouchstart);
      this.el.addEventListener('touchend', this.onTouchend);
      this.el.addEventListener('mouseup', this.onTouchend);
      window.addEventListener('resize', this.onWindowResize);
    },
    onTouchstart: function (e) {
      var x = (e.changedTouches && e.changedTouches[0].clientX) || e.pageX;
      this.cacheCoords(x);
    },
    onTouchend: function (e) {
      var x = (e.changedTouches && e.changedTouches[0].clientX) || e.pageX;
      this.slide(x);
    }
  };
  
  UI.killDefaultDragDrop();
  Ad.create();
});