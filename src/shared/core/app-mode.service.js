import _ from 'lodash';

import { StatefulService } from 'shared/state';

import { APP_MODES } from './app-modes.constant';

export class AppModeService extends StatefulService {
  constructor() {
    super('mode');
  }

  setSelectMode() {
    this._setMode(APP_MODES.SELECT);
  }

  setSelectProductMode() {
    this._setMode(APP_MODES.SELECTPRODUCT);
  }

  setAddShapeMode() {
    this._setMode(APP_MODES.ADDSHAPE);
  }

  setAddTextMode() {
    this._setMode(APP_MODES.ADDTEXT);
  }

  setPanMode() {
    this._setMode(APP_MODES.PAN);
  }

  setZoomMode() {
    this._setMode(APP_MODES.ZOOM);
  }


  setBackgroundEditMode() {
    this._setMode(APP_MODES.BACKGROUND_EDIT);
  }

  _setMode(mode) {
    this._state.setState({
      mode,
    });
  }

  /**
   * @return {APP_MODES}
   */
  getModes() {
    return _.cloneDeep(APP_MODES);
  }

  getMode() {
    return this._state.getState().mode;
  }
}
