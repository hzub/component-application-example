import './image-select.less';

export class ImageSelectComponent {
  static NAME = 'imageSelect';
  static OPTIONS = {
    controller: ImageSelectComponent,
    template: require('./image-select.template.html'),
    bindings: {
      onCancel: '&'
    }
  }

  static $inject = [
    'ImagesService',
    'drawService'
  ];

  /**
   *
   * @param {ImagesService} ImagesService
   * @param {DrawService} drawService
   */
  constructor(ImagesService, drawService) {
    this._ImagesService = ImagesService;
    this._DrawService = drawService;

    this._unsubs = [];
    this.imagesList = [];
  }

  $onInit() {
    this._unsubs.push(this._ImagesService.subscribe(e => this._handleAction(e)));
    this._ImagesService.loadImages();
  }

  $onDestroy() {
    this._unsubs.forEach(f => f());
  }

  _handleAction(action) {
    switch (action.type) {
    case this._ImagesService.ACTIONS.UPDATED:
      this._setImagesList();
      break;
    }
  }

  onImagesUpload(uploadedImages) {
    this._addImagesToList(uploadedImages);
  }

  onSelect(img) {
    this._DrawService.addImageByUrl(img.url);
  }

  _setImagesList() {
    this.imagesList = this._ImagesService.getImages();
  }

  _addImagesToList(uploadedImages) {
    this.imagesList.unshift(...uploadedImages);
  }
}
