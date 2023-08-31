import Glide from '@glidejs/glide';

export default class Slider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    // this.slider.classList.add('glide');

    const slider = new Glide(this.slider, {
      type: 'carousel',
      perView: 1,
    });

    console.log(slider);
  }
}

