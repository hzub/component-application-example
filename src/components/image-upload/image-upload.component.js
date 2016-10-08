import './image-upload.less';

export class ImageUploadComponent {
  static NAME = 'imageUpload';
  static OPTIONS = {
    controller: ImageUploadComponent,
    template: require('./image-upload.template.html'),
    bindings: {
      onUpload: '&'
    }
  }

  static $inject = [
    '$timeout',
    'ImageUploadService'
  ];


  /**
   * @param {angular.ITimeoutService} $timeout
   * @param {ImageUploadService} ImageUploadService
   */
  constructor($timeout, ImageUploadService) {
    this._ImageUploadService = ImageUploadService;
    this._$timeout = $timeout;

    this.STATES = {
      IDLE: 'IDLE',
      UPLOADING: 'UPLOADING',
      ERROR: 'ERROR'
    };

    this.progressBarStyle = {
      width: 0
    };

    this.data = {
      file: null,
      email: null
    };

    this._unsub = [];
  }


  $onInit() {
    this.state = this.STATES.IDLE;
    this._unsub.push(this._ImageUploadService.subscribe(a => this._handleAction(a)))
  }

  $onDestroy() {
    this.state = this.STATES.IDLE;
    this._unsub.forEach(f => f());
  }

  removeFile() {
    this.data.file = null;
  }

  submit() {
    this._setUploading();
    this._ImageUploadService.upload(this.data);
  }

  _handleAction(action) {
    switch (action.type) {
    case this._ImageUploadService.ACTIONS.PROGRESS:
      if (this.data.file.name === action.file.name) this._setProgress(action.progress);
      break;
    case this._ImageUploadService.ACTIONS.UPLOADED:
      if (this.data.file.name === action.fileName) this._setUploaded(action);
      break;
    case this._ImageUploadService.ACTIONS.FAILED:
      this._setFailed(action);
      break;
    }
  }

  _setProgress(progress) {
    this.progressBarStyle.width = `${progress}%`;
  }

  _setUploading() {
    this._setProgress(0);
    this.state = this.STATES.UPLOADING;
  }

  _setUploaded(action) {
    const {fileName, url} = action;

    this._setProgress(100);

    this.data.file = null;
    this.state = this.STATES.IDLE;

    this.onUpload({uploadedImages: [{fileName, url}]});
  }

  _setFailed() {
    this.error = 'Failed upload';
    this.state = this.STATES.ERROR;
    this._$timeout(() => {
      this.error = null;
      this.state = this.STATES.IDLE;
      this.data.file = null;
    }, 3000);
  }
}
