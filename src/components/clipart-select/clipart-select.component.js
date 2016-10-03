import './clipart-select.less';


export class ClipartSelectComponent {
  static NAME = 'clipartSelect';
  static OPTIONS = {
    controller: ClipartSelectComponent,
    template: require('./clipart-select.template.html'),
    bindings: {
      onSelect: '&',
      onCancel: '&'
    }
  }

  static $inject = [
    'ClipartService'
  ];

  /**
   * @param {ClipartService} ClipartService
   */
  constructor(ClipartService) {
    this._ClipartService = ClipartService;
    this.ready = false;
    this.selectedCategory = null;
    this.cliparts = [];
  }

  $onInit() {
    this._ClipartService.loadAll().then(() => this._update());
  }

  onCategorySelect() {
    console.debug(this.selectedCategory);
    this._setClipartsGroup(this.selectedCategory.slug);
  }

  selectClipart(art) {
    this.onSelect({clipart: art});
  }

  goBack() {
    this.onCancel();
  }

  _update() {
    this.categories = this._ClipartService.getCategories();
    this.ready = true;
  }

  _setClipartsGroup(slug) {
    this.cliparts = this._ClipartService.getCategoryArts(slug);
  }
}
