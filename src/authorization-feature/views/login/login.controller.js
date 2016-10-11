import $template from './login.view.html';

const $inject = ['$state', '$stateParams', 'HttpService', 'authorizationService', 'ConfigService'];

class loginController {
  constructor($state, $stateParams, HttpService, authorizationService, ConfigService) {
    this.$auth = authorizationService;
    this.HttpService = HttpService;
    this.$state = $state;
    this.ConfigService = ConfigService;

    // TODO: remove mocked data
    this.login = 'foo';
    this.password = 'foo123';
    this.loginResponse = null;

    if (authorizationService.getToken()) {
      this.$state.go(this.ConfigService.get('defaultState'));
    }
  }
  doLogin() {
    this.$auth.login(
      this.login,
      this.password
    ).then(() => {
      this.$state.go(this.ConfigService.get('defaultState'));
    }).catch(() => {
      this.loginResponse = 'Bad credentials!';
    });
  }
}

loginController.$inject = $inject;
loginController.$view = $template;

export default loginController;
