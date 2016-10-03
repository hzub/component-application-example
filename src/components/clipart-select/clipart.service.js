export class ClipartService {

  static $inject = [
    'httpService',
    'globalLoader',
  ];

  /**
   * @param {httpService} httpService
   * @param {GlobalLoaderService} globalLoader
   */
  constructor(httpService, globalLoader) {
    this._httpService = httpService;
    this._globalLoader = globalLoader;

    this._PATH = '/designer/clip-art';
    this._state = {};
  }

  loadAll() {
    if (this._promise) return this._promise;

    this._globalLoader.show();
    return this._promise = this._httpService.get(this._PATH)
      .then(data => this._handleResponse(data))
      .catch(error => this._handleError(error));
  }

  getState() {
    return _.cloneDeep(this._state);
  }

  getCategories() {
    return _.clone(this._state.categories);
  }

  getCategoryArts(slug) {
    const group = this._state.groups[slug];
    return group.getArts();
  }

  _handleResponse(cliparts) {
    const byGroup = _.groupBy(cliparts, art => _.get(art, ['categories', 0, 'slug']));

    const groups = _.mapValues(byGroup, (arts, slug) => new ArtsGroup(arts, slug))
    const categories = _.map(groups, (g, slug) => {
      return {
        label: g.label,
        slug
      };
    });

    this._setState({groups, categories});
    this._globalLoader.hide();
    this._clearPromise();
  }

  _handleError(error) {
    this._setState({});
    this._clearPromise();
    this._globalLoader.hide();
  }

  _clearPromise() {
    this._promise = null;
  }

  _setState(newState) {
    this._state = newState;
  }
}


class ArtsGroup {

  constructor(arts, slug) {
    this.slug = slug;
    this.arts = arts;
    this.category = _.get(arts, [0, 'categories', 0]);
    this.label = this.category.name;
  }

  getArts() {
    return _.clone(this.arts);
  }
}
