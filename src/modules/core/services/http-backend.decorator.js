const $inject = ['$delegate'];

function httpBackendDecorator($delegate) {
  function newHttpBackend(...params) {
    const headers = params[4];
    const contentType = (headers != null ? headers['X-Force-Content-Type'] : null);
    if (contentType != null && headers['Content-Type'] == null) {
      headers['Content-Type'] = contentType;
    }
    return $delegate.call(null, ...params);
  }

  Object.keys($delegate).forEach(key => {
    newHttpBackend[key] = $delegate[key];
  });

  return newHttpBackend;
}

httpBackendDecorator.$inject = $inject;

export default httpBackendDecorator;
