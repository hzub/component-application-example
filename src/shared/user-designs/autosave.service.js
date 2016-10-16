import _ from 'lodash';
import { StatefulService } from 'shared/state';

export class AutosaveService extends StatefulService {
  static NAME = 'autosaveService';

  constructor(drawService, saveService, DRAW_ACTIONS) {
    'ngInject';
    super('autosave');
    Object.assign(this, {
      drawService,
      saveService,
      DRAW_ACTIONS,
    });
    this.drawService.subscribe(this._handleActions.bind(this));
    this._state.setState({
      running: false,
    });

    this._lastSavedState = '';
    this._throttledAutosave = _.throttle(this._doAutosave,
      1000, // TODO: de-mock autosave interval
    );
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

  _doAutosave() {
    this.saveService.saveCanvas();
  }

  _handleActions(action) {
    switch (action.type) {
      case this.DRAW_ACTIONS.CONTENTSCHANGED:
        this._throttledAutosave();
        break;
      default:
    }
  }
}
