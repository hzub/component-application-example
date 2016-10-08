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

    // FIXME: Yes. It is the hardcoded id. Used as `created_by` field when creating a new upload.
    // Remove this, when the backend issues are solved.
    // and refactor loadImages() method
    // Contact @geo for updates.
    this.DEFAULT_USER_ID = 39;

    this.IMAGES_URL = '/uploads'
    this.ACTIONS = {
      UPDATED: 'UPDATED'
    };

    this.images = [];
  }


  /**
   * Loads images uploaded by User by his email or id.
   *
   * Requires `email` or `created_by` to present.
   * (actually, its not, until the backend is fixed.)
   *
   * @param {string} [email]
   * @param {number} [created_by]
   */
  loadImages({email = null, created_by = this.DEFAULT_USER_ID}) {
    this.images = [];
    this._HttpService.get(this.IMAGES_URL, email ? {email} : {created_by})
      .then(data => this._setImages(data))
      .catch(err => this._handleError(err));
  }

  /**
   * Returns images array. Could be empty, if not loaded.
   * @return {{url:string}[]}
   */
  getImages() {
    return _.cloneDeep(this.images);
  }


  _setImages(data) {
    this.images = _.cloneDeep(data);
    this.publish({type: this.ACTIONS.UPDATED});
  }

  _handleError(err) {
    console.warn(err);
  }
}
