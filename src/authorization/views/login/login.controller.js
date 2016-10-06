import $template from './login.view.html';

const $inject = ['$state', '$stateParams', 'httpService', 'authorizationService', 'configService'];

class loginController {
  constructor($state, $stateParams, httpService, authorizationService, configService) {
    this.$auth = authorizationService;
    this.httpService = httpService;
    this.$state = $state;
    this.configService = configService;

    // TODO: remove mocked data
    this.login = 'foo';
    this.password = 'foo123';
    this.loginResponse = null;

    if (authorizationService.getToken()) {
      this.$state.go(this.configService('defaultState'));
    }
  }
  doLogin() {
    this.$auth.login(
      this.login,
      this.password
    ).then(() => {
      this.$state.go(this.configService('defaultState'));
    }).catch(() => {
      this.loginResponse = 'Bad credentials!';
    });
  }
}

loginController.$inject = $inject;
loginController.$view = $template;

export default loginController;
