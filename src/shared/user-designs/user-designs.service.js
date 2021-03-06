import { PubSub }  from '../pub-sub';
import { DESIGNS_ACTIONS } from './user-designs.actions.constant';

export class UserDesignsService extends PubSub {
  static NAME = 'userDesignsService';

  constructor($q, HttpService, drawService) {
    'ngInject';
    super();
    Object.assign(this, {
      $q,
      HttpService,
      drawService,
    });

    this._designsCache = undefined;

  }

  getDesigns() {
    if (this._designsCache) {
      return this.$q.when(this._designsCache);
    }

    return this.HttpService.get('/designer/designs').then(res => {
      this._designsCache = res;
      return res;
    });
  }

  load(design) {
    this.publish({
      type: DESIGNS_ACTIONS.DESIGNLOADED,
      data: design,
    });
  }
}
