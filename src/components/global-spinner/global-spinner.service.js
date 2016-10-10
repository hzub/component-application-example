import { PubSub } from 'shared';

export class GlobalSpinnerService extends PubSub {
  static NAME = 'globalSpinnerService';

  show() {
    this.publish(true);
  }

  hide() {
    this.publish(false);
  }
}