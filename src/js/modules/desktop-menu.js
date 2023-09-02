export default class DesktopMenu {
  constructor() {
    this.menu = document.getElementById(`main-menu`);
    this.activeElement = this.menu.querySelector(`.main-menu__active`);

    this.tracker = document.createElement(`div`);
    this.tracker.classList.add(`main-menu__tracker`);
    this.menu.appendChild(this.tracker);

    this.addListenters();
    // window.setTimeout(() => this.resetTracker(), 1000);
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
    window.addEventListener(`resize`, () => this.resetTracker());
  }

  resetTracker() {
    this.tracker.style.left = `${this.activeElement.offsetLeft}px`;
    this.tracker.style.width = `${this.activeElement.offsetWidth}px`;
    this.tracker.style.height = `${this.activeElement.offsetHeight}px`;
    this.activeElement.style.color = `var(--white)`;
  }
}
