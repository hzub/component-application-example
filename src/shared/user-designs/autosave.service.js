import { StatefulService } from 'shared/state';

export class AutosaveService extends StatefulService {
  static NAME = 'autosaveService';

  constructor(drawService, DRAW_ACTIONS) {
    'ngInject';
    super('autosave');
    Object.assign(this, {
      drawService,
      DRAW_ACTIONS
    });
    this.drawService.subscribe(this._handleActions.bind(this));
    this._state.setState({
      running: false,
    });

    this._lastSavedState = '';
  }

  start() {
    this._state.setState({
      running: true,
    });
  }

  stop() {
    this._state.setState({
      running: false,
    });
  }

  set(value) {
    this._state.setState({
      running: value,
    });
  }

  doAutosave() {
    angular.noop(); // TODO: handle autosave
  }

  _handleActions(action) {
    switch (action.type) {
      case this.DRAW_ACTIONS.CONTENTSCHANGED:
        this.doAutosave();
        break;
      default:
    }
  }
}
