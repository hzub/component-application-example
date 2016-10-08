import _ from 'lodash';
import { PubSub } from 'shared/pub-sub';

export class ImagesService extends PubSub {

  static NAME = 'ImagesService';

  static $inject = [
    'HttpService'
  ];


  /**
   * @param {HttpService} HttpService
   */
  constructor(HttpService) {
    super();

    this._HttpService = HttpService;

    this.DEFAULT_USER_ID = 39;
    this.IMAGES_URL = '/uploads'
    this.ACTIONS = {
      UPDATED: 'UPDATED'
    };

    this.images = [];
  }


  loadImages(userId) {
    this._HttpService.get(this.IMAGES_URL, {created_by: userId || this.DEFAULT_USER_ID})
      .then(data => this._setImages(data))
      .catch(err => this._handleError(err));
  }

  getImages() {
    return _.cloneDeep(this.images);
  }

  createUserImage() {
    this._HttpService.post(this.IMAGES_URL)
  }

  _setImages(data) {
    this.images = _.cloneDeep(data);
    this.publish({type: this.ACTIONS.UPDATED});
  }

  _handleError(err) {
    console.warn(err);
  }
}
