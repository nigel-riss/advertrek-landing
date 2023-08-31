export default class Menu {
  constructor() {
    this.nav = document.getElementById(`main-nav`);
    this.menuButton = document.getElementById(`menu-button`);
    this.closeButton = document.getElementById(`close-button`);

    if (!this.nav || !this.menuButton || !this.closeButton) return;

    this.initListeners();
  }

  openMenu = () => {
    this.nav.classList.add(`open`);
    console.log('menu opened');
  }

  closeMenu = () => {
    this.nav.classList.remove(`open`);
    console.log(`menu closed`);
  } 

  initListeners() {
    this.menuButton.addEventListener(`click`, this.openMenu);
    this.closeButton.addEventListener(`click`, this.closeMenu);
  }
}
