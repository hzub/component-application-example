export class HttpService {
  static $inject = [
    '$http',
    '$q',
    '$state',
    'ConfigService',
  ];

  constructor($http, $q, $state, ConfigService) {
    this.$http = $http;
    this.$q = $q;
    this.$state = $state;
    this.ConfigService = ConfigService;

    this.TOKEN_HEADERS = {
      'X-Designer-Domain-Token': 'e6rz67',
      'X-Designer-Token': 'cdacb03c-1562-47c7-bf1c-f7110d4914dc'
    };
  }

  /**
   * Returns X-Designer-*?-Token headers object
   *
   * @return {Object<string, string>} request headers object
   */
  getTokenHeaders() {
    return _.clone(this.TOKEN_HEADERS);
  }

  extendRequest(configuration) {
    return _.assign({}, configuration, {
      headers: this.getTokenHeaders()
    });

    /*if (token) {
      Object.assign(configuration, {
        headers: {
          'X-Authorization': token,
          'X-Force-Content-Type': 'application/json',
        },
      });
    }*/
  }

  transformUrl(url) {
    if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
      return this.ConfigService.get('backendPrefix') + url;
    }

    return url;
  }

  get(url, params) {
    let requestConfiguration = {
      method: 'GET',
      url: this.transformUrl(url),
      params,
    };

    requestConfiguration = this.extendRequest(requestConfiguration);
    return this.$http(requestConfiguration).then(
      (response) => response.data,
      (error) => this.$q.reject(error)
    );
  }

  post(url, params) {
    let requestConfiguration = {
      method: 'POST',
      url: this.transformUrl(url),
      data: params,
    };

    requestConfiguration = this.extendRequest(requestConfiguration);

    return this.$http(requestConfiguration).then(
      (response) => response.data,
      (error) => this.$q.reject(error)
    );
  }

  put(url, params) {
    let requestConfiguration = {
      method: 'PUT',
      url: this.transformUrl(url),
      data: params,
    };

    requestConfiguration = this.extendRequest(requestConfiguration);

    return this.$http(requestConfiguration).then(
      (response) => response.data,
      (error) => this.$q.reject(error)
    );
  }

  delete(url, params) {
    let requestConfiguration = {
      method: 'DELETE',
      url: this.transformUrl(url),
      data: params,
    };

    requestConfiguration = this.extendRequest(requestConfiguration);

    return this.$http(requestConfiguration).then(
      (response) => response.data,
      (error) => this.$q.reject(error)
    );
  }
}

export default HttpService;
