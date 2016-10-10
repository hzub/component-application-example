import _ from 'lodash';
import { PubSub } from 'shared/pub-sub';

const APP_STATE = {};
const REGISTERED_STATES = {};


export class State extends PubSub {

  /**
   * @param {string} statePath
   * @return {Array<State>}
   */
  static getPotentiallyAffectedStates(statePath) {
    return _.filter(REGISTERED_STATES, _createAffectedStatesFilter(statePath));
  }


  static updateGlobal(statePath, newState) {
    _.set(APP_STATE, statePath, _.isObject(newState) ? _.cloneDeep(newState) : newState);
    State.getPotentiallyAffectedStates(statePath).map(state => state.update());
  }


  static registerState(statePath, stateInstance) {
    REGISTERED_STATES[statePath] = stateInstance;
  }


  /**
   * @param {string} statePath in a form `foo.bar.baz'
   */
  constructor(statePath) {
    super();

    this.ACTIONS = {
      STATE_CHANGED: 'STATE_CHANGED'
    };

    this._statePath = statePath;

    State.registerState(this._statePath, this);
    this._initState();
  }

  /**
   * It update corresponding part of the global App State using.
   * All necessary states (inner and parent) will be updated and their subscribers will be notified.
   * @param {any} newState
   */
  setState(newState) {
    State.updateGlobal(this._statePath, newState);
  }


  /**
   * Return a copy of the local state
   * @return {*}
   */
  getState() {
    return _.cloneDeep(this._state);
  }


  /**
   * It will check, if the corresponding state in global app state has changed.
   */
  update() {
    if (!this._updateRequired()) return;

    this._updateFromGlobal();
    this._notify();
  }


  _updateRequired() {
    return !angular.equals(this._state, _.get(APP_STATE, this._statePath));
  }

  _updateFromGlobal() {
    // without cloning, it would break the changed check.
    this._state = _.cloneDeep(_.get(APP_STATE, this._statePath, null));
  }

  _notify() {
    this.publish({type: this.ACTIONS.STATE_CHANGED});
  }

  _initState() {
    this.setState(null);
  }
}


//  ------------------------------------


function _createAffectedStatesFilter(statePath) {
  return (state, path) => _.startsWith(path, statePath) || _.startsWith(statePath, path);
}
