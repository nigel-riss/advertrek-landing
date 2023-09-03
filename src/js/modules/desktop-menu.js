export default class DesktopMenu {
  constructor() {
    if (window.innerWidth < 1000) return;

    this.menu = document.getElementById(`main-menu`);
    this.activeElement = this.menu.querySelector(`.main-menu__active`);
    if (!this.menu || !this.activeElement) return;

    this.tracker = document.createElement(`div`);
    this.tracker.classList.add(`main-menu__tracker`);
    this.menu.appendChild(this.tracker);

    this.addListenters();
  }

  addListenters() {
    this.menu.addEventListener(`mousemove`, (e) => {
      if (e.target.classList.contains(`main-menu__link`)) {
        this.tracker.style.left = `${e.target.offsetLeft}px`;
        this.tracker.style.width = `${e.target.offsetWidth}px`;
        this.activeElement.style.color = `var(--blue)`;
      } else {
        this.resetTracker();
      }
    });

    this.menu.addEventListener(`mouseleave`, (e) => {
      this.resetTracker();
    });

    document.addEventListener(`DOMContentLoaded`, () => this.resetTracker());
    window.addEventListener(`load`, () => this.resetTracker());

    let resizeTimeout;
    window.addEventListener(`resize`, () => {
      clearTimeout(resizeTimeout);
      this.resetTracker();
      resizeTimeout = window.setTimeout(() => this.resetTracker(), 275);
    });
  }

  resetTracker() {
    console.log(`resetTracker`);
    this.tracker.style.left = `${this.activeElement.offsetLeft}px`;
    this.tracker.style.width = `${this.activeElement.offsetWidth}px`;
    this.tracker.style.height = `${this.activeElement.offsetHeight}px`;
    this.activeElement.style.color = `var(--white)`;
  }
}
