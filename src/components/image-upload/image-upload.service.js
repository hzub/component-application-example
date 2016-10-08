import _ from 'lodash';
import { PubSub } from 'shared';

export class ImageUploadService extends PubSub {

  static $inject = [
    'Upload',
    'HttpService'
  ];

  /**
   * @param {Upload} Upload
   * @param {HttpService} HttpService
   */
  constructor(Upload, HttpService) {
    super();

    this._Upload = Upload;
    this._HttpService = HttpService;

    this.ACTIONS = {
      PROGRESS: 'PROGRESS',
      UPLOADED: 'UPLOADED',
      FAILED: 'FAILED'
    };

    this._UPLOAD_URL = '/uploads';
  }


  /**
   * @param file
   * @param email
   */
  upload(file, email) {
    this._Upload.upload(this._buildParams(file, email))
      .progress(e => this._onProgress(e))
      .then(r => this._onSuccess(r))
      .catch(r => this._onError(r));
  }

  _onSuccess(resp) {
    this.publish({
      type: this.ACTIONS.UPLOADED,
      fileName: _.get(resp, ['config', 'data', 'file', 'name']),
      url: _.get(resp, ['data', 'url'])
    });
  }

  _onError(resp) {
    this.publish({
      type: this.ACTIONS.FAILED,
      resp
    });
  }

  _onProgress(evt) {
    const progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    this.publish({
      type: this.ACTIONS.PROGRESS,
      file: evt.config.data.file,
      progress: progressPercentage
    })
  }

  _buildParams(file, email) {
    const data = {
      "Content-Type": 'application/x-www-form-urlencoded',
      file
    };

    if (email) {
      _.assign(data, {email});
    } else {
      _.assign(data, {created_by: 39})
    }

    return {
      url: this._HttpService.transformUrl(this._UPLOAD_URL),
      headers: this._HttpService.getTokenHeaders(),
      data
    };
  }
}
