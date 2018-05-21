import helpers from './helpers';
import UI from './ui';
import slider from './slider';

export default {
  enums: {
    STAR_CHECKED_CLASS: 'is-checked'
  },
  adjustForOrientation () {
    this.el.querySelector('.mode--portrait').classList.toggle('hidden', !UI.isPortraitOrientation());
    this.el.querySelector('.mode--landscape').classList.toggle('hidden', UI.isPortraitOrientation());
  },
  // adjustSliderHeight () {
  //   this.slider.adjustTapeHeight();
  // },
  delegateEvents () {
    window.addEventListener('resize', this.onWindowResize);
  },
  onWindowResize () {
    this.adjustForOrientation();
    // this.adjustSliderHeight();
    if (!UI.isPortraitOrientation()) {
      this.el.style.width = '100%';
    }
  },
  initBanner () {
    helpers.DOMCollectionApply(this.el.querySelectorAll('.info__img'), (image) => image.src = this.data.thumbnail);
  },
  applyTitle () {
    helpers.DOMCollectionApply(this.el.querySelectorAll('.info__text'), (titleEl) =>
      titleEl.textContent = helpers.getNWords(this.data.title));
  },
  applyRating () {
    helpers.DOMCollectionApply(this.el.querySelectorAll('[data-rating]'), (starEl, index) => {
      starEl.classList.remove(this.enums.STAR_CHECKED_CLASS);
      if ( window.parseInt(starEl.dataset.rating) <= this.data.rating ) {
        starEl.classList.add(this.enums.STAR_CHECKED_CLASS);
      }
    });
  },
  show () {
    this.el.style.opacity = 1;
  },
  create (data) {
    this.data = data;
    this.el = document.querySelector('.dio-intint__container');
    this.slider = slider;
    this.slider.ad = this;
    this.onWindowResize = this.onWindowResize.bind(this);
    this.delegateEvents();
    this.adjustForOrientation();
    this.initBanner();
    this.applyTitle();
    this.applyRating();
    this.slider.create(data);
  }
}
