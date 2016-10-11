export class SubscriberComponent {

  constructor() {
    this._unsub = [];
  }

  $onDestroy() {
    this._unsub.forEach(f => f());
    this._unsub = [];
  }

  /**
   * @abstract
   * You need to implement it on your own!
   *
   * @param {object} action
   */
  _handleAction(action) {
    throw new Error('Not Implemented');
  }


  /**
   * @param {PubSub[]} publishers
   */
  _subscribeTo(publishers) {
    publishers.map(p => this._unsub.push(p.subscribe(action => this._handleAction(action))));
  }

}
