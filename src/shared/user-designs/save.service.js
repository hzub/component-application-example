import _ from 'lodash';
import { StatefulService } from 'shared/state';

const serializationMarkField = '$removeForSerialization';

export class SaveService extends StatefulService {
  static NAME = 'saveService';

  constructor(drawService, DRAW_ACTIONS) {
    'ngInject';
    super('save', true);
    Object.assign(this, {
      drawService,
      DRAW_ACTIONS,
    });
  }

  static markForSerialization(entity) {
    entity.toObject = ((oldFn) => () => {
      const serializedEntity = oldFn.call(entity);
      serializedEntity[serializationMarkField] = true;
      return serializedEntity;
    })(entity.toObject);
  }

  _serializeCanvas() {
    const canvasJSON = this.drawService.serializeCanvas();
    canvasJSON.objects = _.filter(canvasJSON.objects, entity => !entity[serializationMarkField]);
    return canvasJSON;
  }

  saveCanvas() {
    this._state.setState({
      savedCanvas: this._serializeCanvas(),
    });
  }

  restoreCanvas() {
    return this._state.getState().savedCanvas;
  }

}
