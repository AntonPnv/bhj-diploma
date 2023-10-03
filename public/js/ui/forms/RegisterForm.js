/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log(data);
    User.register(data, (err, response) => {
      if (response.success === true) {
        this.element.reset();
        App.setState('user-logged');
        const registerModal = App.getModal('register');
        registerModal.close();
      }
    });
  }
}