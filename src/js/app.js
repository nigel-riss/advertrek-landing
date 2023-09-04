import MobileMenu from './modules/mobile-menu.js';
import DesktopMenu from './modules/desktop-menu.js';
import Glide from '@glidejs/glide';



const _mobileMenu = new MobileMenu();
const _desktopMenu = new DesktopMenu();
// const _typeSlider = new Slider('#type-slider');

if (window.innerWidth <= 600) {
  // const swiper = new Swiper(`.swiper`, {
  //   spaceBetween: 30,
  //   pagination: {
  //     el: `.swiper-pagination`,
  //   },
  //   modules: [Navigation, Pagination],
  //   // modules: [Pagination],
  //   // createElements: true,
  // })

  const slider = new Glide(`.glide`, {
    type: `carousel`,
    perView: 1,
    animationTimingFunc: `ease-in-out`,
    focusAt: `center`,
    autoplay: 2000,
    // breakpoints: {
    //   600: {
    //     perView: 1,
    //   },
    //   1000: {
    //     perView: 2,
    //     gap: 10,
    //   }
    // },
    gap: 20,
  }).mount();
}
