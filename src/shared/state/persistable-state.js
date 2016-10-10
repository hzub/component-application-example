import { State } from './state';

export class PersistableState extends State {

  buildLSKey() {
    return `STATE__${this._statePath}`;
  }

  _initState() {
    this.setState(this._loadFromLS());
  }

  _loadFromLS() {
    const json = window.localStorage.getItem(this.buildLSKey()) || null;
    return json === null
      ? null
      : JSON.parse(json)['state'];
  }


  _updateFromGlobal() {
    super._updateFromGlobal();
    this._saveToLS();
  }

  _saveToLS() {
    return window.localStorage.setItem(this.buildLSKey(), JSON.stringify({
      state: this.getState() || null
    }));
  }
}
