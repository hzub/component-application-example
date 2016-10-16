import { SubscriberComponent } from 'shared';

export class PrimaryNavComponent extends SubscriberComponent {
  static NAME = 'primaryNav';
  static OPTIONS = {
    controller: PrimaryNavComponent,
    template: require('./primary-nav.template.html'),
    bindings: {},
  };

  constructor(navigationService) {
    'ngInject';
    super();
    Object.assign(this, {
      navigationService,
    });

    this._subscribeTo([this.navigationService]);
  }

  _handleAction(action) {
    switch (action.type) {
      case this.navigationService._state.ACTIONS.STATE_CHANGED:
        this.reloadButtons();
        break;
      default:
        break;
    }
  }

  reloadButtons() {
    this._buttons = this.navigationService.getPrimaryButtons();
  }
}
