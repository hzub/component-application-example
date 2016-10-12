import { PubSub } from 'shared/pub-sub';
import { State, PersistableState } from 'shared/state';

/**
 * See stateful-service.spec.js for usage details
 */
export class StatefulService extends PubSub {

  /** @type {State} */
  _state;

  constructor(statePath, persistable = false, actionsPrefix = null) {
    super();
    this._state = persistable
      ? new PersistableState(statePath, actionsPrefix)
      : new State(statePath, actionsPrefix);

    this.ACTIONS = _.assign(this.ACTIONS || {}, this._state.ACTIONS);

    this._state.subscribe(a => this.publish(a));
  }
}
