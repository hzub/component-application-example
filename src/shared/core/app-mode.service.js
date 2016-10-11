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

  _setMode(mode) {
    this._state.setState({
      mode,
    });
  }

  getMode() {
    return this._state.getState().mode;
  }
}
