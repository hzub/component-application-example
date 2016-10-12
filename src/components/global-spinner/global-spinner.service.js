import _ from 'lodash';

import { StatefulService } from 'shared/state';

export class GlobalSpinnerService extends StatefulService {
  static NAME = 'globalSpinnerService';

  constructor() {
    super('globalSpinner');
    this._promises = [];

    this._state.setState({
      spinnerShown: false,
    });
  }

  _check() {
    this._state.setState({
      spinnerShown: this._promises.length > 0,
    });
  }

  addWaiter(promise) {
    this._promises.push(promise);
    this._check();
    const resolver = () => {
      _.pull(this._promises, promise);
      this._check();
    };
    promise.then(resolver, resolver);
  }

  isSpinnerShown() {
    const state = this._state.getState();
    return (state && state.spinnerShown) || false;
  }
}
