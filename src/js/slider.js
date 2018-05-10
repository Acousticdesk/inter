export default {
  cache: {},
  currentSlideIndex: 0,
  imagesLoaded: 0,
  onBannerLoad (banner) {
    // this.adjustTapeHeight();
    this.imagesLoaded += 1;
    if (this.imagesLoaded === this.getSlideNodesCount()) {
      this.updateCardDeck();
      this.ad.show();
      window.setTimeout(() => this.toggleAnimation(true), 0);
      banner.removeEventListener('load', this.onBannerLoad);
    }
  },
  toggleAnimation (state) {
    this.tape.classList.toggle('tape--animated', state);
  },
  createSlides () {
    this.data.images.forEach((src, index) => {
      var slideEl = this.createSlide(src);
      var img = slideEl.querySelector('img');
      this.tape.appendChild(slideEl);
      img.addEventListener('load', this.onBannerLoad.bind(this, img));
    });
  },
  createSlide (src) {
    var slideEl = document.createElement('div');
    var img = document.createElement('img');
    slideEl.classList.add('slider__slide');
    img.classList.add('dio-intint__banner');
    img.src = src;
    slideEl.appendChild(img);
    return slideEl;
  },
  // adjustTapeHeight () {
  //   this.tape.style.height =
  //     this.tape.children[this.currentSlideIndex].clientHeight + 'px';
  // },
  cacheCoords (x) {
    this.cache.x = x;
  },
  shouldSlide (x) {
    var DIFF_TO_SLIDE = 30;
    var delta = x - this.cache.x;
    var xAbs = Math.abs(delta);
    return [xAbs > DIFF_TO_SLIDE, delta];
  },
  resetActiveClass () {
    this.el.querySelector('.slider__slide--active').classList.remove('slider__slide--active');
  },
  addActiveClass () {
    this.getSlideNodes()[this.currentSlideIndex].classList.add('slider__slide--active');
  },
  performSlide (delta) {
    this.updateSlideIndex(delta);
    // this.adjustTapeHeight();
    this.resetActiveClass();
    this.addActiveClass();
    this.updateCardDeck();
  },
  updateSlideIndex (delta) {
    if (delta < 0 && this.canSlide('forward')) {
      this.currentSlideIndex += 1;
    } else if (delta > 0 && this.canSlide('backward')) {
      this.currentSlideIndex -= 1;
    }
  },
  slide (x) {
    var shouldSlideRes = this.shouldSlide(x);
    var shouldSlide = shouldSlideRes[0];
    var delta = shouldSlideRes[1];
    if (shouldSlide) {
      this.performSlide(delta);
    }
  },
  getSlideNodes () {
    return Array.prototype.slice.call(this.tape.children);
  },
  getSlideNodesCount () {
    return this.getSlideNodes().length;
  },
  setSlidesCount () {
    this.slidesCount = this.getSlideNodesCount();
  },
  setTape () {
    this.tape = this.el.querySelector('.slider__tape');
  },
  updateCardDeck () {
    var slides = this.getSlideNodes();
    var offset = slides.reduce((v, s, i) => {
      if (i < this.currentSlideIndex) {
        return v + s.clientWidth;
      } return v;
    }, 0);
    this.tape.style.left = (this.el.clientWidth / 2 - slides[this.currentSlideIndex].clientWidth / 2) - offset + 'px';
  },
  bindContext () {
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onTouchstart = this.onTouchstart.bind(this);
    this.onTouchend = this.onTouchend.bind(this);
  },
  create (data) {
    this.data = data;
    this.el = document.querySelector('.dio-intint__slider');
    this.bindContext();
    this.setTape();
    this.createSlides();
    this.setSlidesCount();
    this.setInitialSlideIndex();
    this.addActiveClass();
    this.delegateEvents();
  },
  setInitialSlideIndex () {
    this.currentSlideIndex = Math.round(this.getSlideNodesCount() / 2) - 1;
  },
  // resetTapeOffset () {
  //   // this.tape.style.left = 0;
  // },
  canSlide (_case) {
    if (_case === 'backward') {
      return this.currentSlideIndex > 0;
    }
    return this.currentSlideIndex < this.slidesCount - 1;
  },
  onWindowResize () {
    this.toggleAnimation(false);
    this.updateCardDeck();
    window.setTimeout(() => this.toggleAnimation(true), 0);
  },
  delegateEvents () {
    this.el.addEventListener('touchstart', this.onTouchstart);
    this.el.addEventListener('mousedown', this.onTouchstart);
    this.el.addEventListener('touchend', this.onTouchend);
    this.el.addEventListener('mouseup', this.onTouchend);
    window.addEventListener('resize', this.onWindowResize);
  },
  onTouchstart (e) {
    var x = (e.changedTouches && e.changedTouches[0].clientX) || e.pageX;
    this.cacheCoords(x);
  },
  onTouchend (e) {
    var x = (e.changedTouches && e.changedTouches[0].clientX) || e.pageX;
    this.slide(x);
  }
}