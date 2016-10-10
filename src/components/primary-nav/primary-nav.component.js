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

  _handleAction() {
    this._buttons = this.navigationService.getPrimaryButtons();
    console.info("qweqwe", this._buttons);
  }

  fireButton(btn) {
    btn.action.call(btn);
  }

  $onInit() {
    console.info("HALO", this.navigationService);
  }
}
