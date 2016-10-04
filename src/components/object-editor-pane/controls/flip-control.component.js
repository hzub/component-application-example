export class FlipControlComponent {
  static NAME = 'flipControl';
  static OPTIONS = {
    controller: FlipControlComponent,
    template: require('./flip-control.template.html'),
    bindings: {
      entity: '='
    }
  }

  static $inject = ['drawService'];

  constructor(drawService) {
    this._drawService = drawService;
  }

  flipHorizontally() {
    this.entity && this._drawService.flipHorizontally(this.entity);
  }

  flipVertically() {
    this.entity && this._drawService.flipVertically(this.entity);
  }
}
