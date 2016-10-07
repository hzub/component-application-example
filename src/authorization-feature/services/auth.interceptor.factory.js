class authInterceptorFactory {
  static get($q) {
    let encounteredInvalidToken = false;

    return {
      responseError: (response) => {
        if (response.status === -1 && !encounteredInvalidToken) {
          encounteredInvalidToken = true;
          return $q.reject('auth');
        }
        return response;
      },
    };
  }
}

authInterceptorFactory.get.$inject = ['$q'];

export default authInterceptorFactory.get;
