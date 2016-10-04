const _listeners = Symbol('listeners');

export class PubSub {

  constructor() {
    this[_listeners] = [];
  }

  subscribe(listener) {
    this[_listeners].push(listener);
    return () => _.pull(this[_listeners], listener);
  }

  publish(message) {
    this[_listeners].forEach(listener => listener(message, this));
  }


  removeAllListeners() {
    this[_listeners] = [];
  }

  destroy() {
    this.removeAllListeners();
    this.publish            = _.noop();
    this.subscribe          = _.noop();
    this.removeAllListeners = _.noop();
  }
}
