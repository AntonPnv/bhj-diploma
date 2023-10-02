/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-mini');
    document.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
      e.preventDefault();
      sidebarToggle.classList.toggle('sidebar-open');
      sidebarToggle.classList.toggle('sidebar-collapse');``
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerMenu = document.querySelector('.menu-item_register');
    const loginMenu = document.querySelector('.menu-item_login');
    const logoutMenu = document.querySelector('.menu-item_logout');

    registerMenu.addEventListener('click', () => {
      const modalRegister = App.getModal('register');
      if (modalRegister) {
        modalRegister.open();
      }
    });

    loginMenu.addEventListener('click', () => {
      const modalLogin =App.getModal('login');
      if (modalLogin) {
        modalLogin.open();
      }
    });

    logoutMenu.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response.success = true) {
          App.setState('init');
        }
      });
    });
  }
}