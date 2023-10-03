/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectAccount = this.element.querySelector('.accounts-select');

    if (selectAccount) {
      Account.list({}, (err, response) => {
        if (response.success === true) {
          const optionHTML = response.data.map(item =>
            `<option value="${item.id}">${item.name}</option>`
          ).join('');
          
          selectAccount.innerHTML = optionHTML;
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success === true) {
        this.element.reset();
        const idModal = this.element.closest('.modal').getAttribute('data-modal-id');
        const modal = App.getModal(idModal);
        if (modal) modal.close();
      }
      App.update();
    });
  }
}