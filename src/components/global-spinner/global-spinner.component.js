import { SubscriberComponent } from 'shared/pub-sub';

import './global-spinner.less';

export class GlobalSpinnerComponent extends SubscriberComponent {
  static NAME = 'globalSpinner';

  static OPTIONS = {
    controller: GlobalSpinnerComponent,
    template: require('./global-spinner.template.html'),
    bindings: {},
  };

  constructor(globalSpinnerService) {
    'ngInject';
    super();
    Object.assign(this, {
      globalSpinnerService
    });

    this._subscribeTo([this.globalSpinnerService]);
  }

  _handleAction() {
    this.isShown = this.globalSpinnerService.isSpinnerShown();
  }

}
