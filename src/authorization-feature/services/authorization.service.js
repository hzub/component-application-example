class authorizationService {
  constructor($q, $http, $state, ConfigService) {
    this.$q = $q;
    this.$http = $http;
    this.$state = $state;
    this.ConfigService = ConfigService;

    this.token = null;
    this.tenantId = null;

    this.tokenStorageKey = this.ConfigService.get('localStorageAuthKey');

    this.restoreToken();
  }

  raiseInvalidToken() {
    this.eraseToken();
    this.$state.go('auth.login', {
      noRedirect: true,
    });
  }

  restoreToken() {
    const storageToken = localStorage.getItem(this.tokenStorageKey);
    const jsonToken = storageToken && JSON.parse(storageToken);

    if (jsonToken) {
      this.token = jsonToken.token;
      this.tenantId = jsonToken.tenantId;
    }
  }

  saveToken(response) {
    if (typeof response !== 'object') {
      return;
    }
    const stringifiedResponse = JSON.stringify(response);
    localStorage.setItem(this.tokenStorageKey, stringifiedResponse);
    this.token = response.token;
    this.tenantId = response.tenantId;
  }

  getToken() {
    return this.token;
  }

  getTenantId() {
    return this.tenantId;
  }

  eraseToken() {
    this.token = null;
    this.tenantId = null;
    localStorage.removeItem(this.tokenStorageKey);
  }

  logout() {
    this.eraseToken();
    return this.$q.when();
  }

  login(_login, _password) {
    return this.$http({
      method: 'POST',
      url: `${this.ConfigService.get('backendPrefix')}/login`,
      data: {
        login: _login,
        password: _password,
      },
    }).then((response) => {
      const data = response.data;

      if (data.successful) {
        this.saveToken(data);
        return true;
      }
      return this.$q.reject();
    }).catch(() => this.$q.reject());
  }
}

export default [
  '$q',
  '$http',
  '$state',
  'ConfigService',
  authorizationService,
];
