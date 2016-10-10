import { PubSub } from 'shared/pub-sub';
import { State, PersistableState } from 'shared/state';

/**
 * See stateful-service.spec.js for usage details
 */
export class StatefulService extends PubSub {

  /** @type {State} */
  _state;

  constructor(statePath, persistable = false, customActionPrefix = null) {
    super();
    this._state = persistable
      ? new PersistableState(statePath, customActionPrefix)
      : new State(statePath, customActionPrefix);

    this._state.subscribe(a => this.publish(a));
  }
}
