import './select-design.less';

export class SelectDesignPopupComponent {
  static NAME = 'selectDesignPopup';

  static OPTIONS = {
    controller: SelectDesignPopupComponent,
    template: require('./select-design-popup.template.html'),
    bindings: {
      close: '&',
      dismiss: '&',
    },
  };

  static POPUP_OPTIONS = {
    component: SelectDesignPopupComponent.NAME,
  };

  constructor(userDesignsService) {
    'ngInject';
    Object.assign(this, {
      userDesignsService,
    });
  }

  $onInit() {
    this._loading = true;
    this.getDesigns();
  }

  getDesigns() {
    this.userDesignsService.getDesigns().then(designList => {
      this._loading = false;
      this.designList = designList;
    });
  }

  changeProduct() {}

  select(design) {
    this.close({
      $value: design,
    });
  }
}
