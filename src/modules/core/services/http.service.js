class httpService {
  constructor($http, $q, $state, configService) {
    this.$http = $http;
    this.$q = $q;
    this.$state = $state;
    this.configService = configService;
  }

  extendRequest(configuration) {

    Object.assign(configuration, {
      headers: {
        'X-Designer-Domain-Token': 'e6rz67',
        'X-Designer-Token': 'cdacb03c-1562-47c7-bf1c-f7110d4914dc'
      },
    });

    /*if (token) {
      Object.assign(configuration, {
        headers: {
          'X-Authorization': token,
          'X-Force-Content-Type': 'application/json',
        },
      });
    }*/

    return configuration;
  }

  get(url, params) {
    let requestConfiguration = {
      method: 'GET',
      url: this.configService('backendPrefix') + url,
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
      url: this.configService('backendPrefix') + url,
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
      url: this.configService('backendPrefix') + url,
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
      url: this.configService('backendPrefix') + url,
      data: params,
    };

    requestConfiguration = this.extendRequest(requestConfiguration);

    return this.$http(requestConfiguration).then(
      (response) => response.data,
      (error) => this.$q.reject(error)
    );
  }
}

httpService.$inject = [
  '$http',
  '$q',
  '$state',
  'configService',
];

export default httpService;
