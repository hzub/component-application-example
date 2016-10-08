export class AddShapeComponent {
  static NAME = 'shapesPane';
  static OPTIONS = {
    controller: AddShapeComponent,
    template: require('./shapes-pane.template.html'),
    bindings: {}
  }

  static $inject = [
    'SHAPES_PANE_STATES',
    'drawService',
  ];

  /**
   * @param SHAPES_PANE_STATES
   * @param {DrawService} drawService
   */
  constructor(SHAPES_PANE_STATES, drawService) {
    this.STATES = SHAPES_PANE_STATES;
    this.drawService = drawService;
    this.state = this.STATES.IDLE;
  }

  showClipartSelector() {
    this.state = this.STATES.CLIPART_SELECT;
  }

  showImageSelector() {
    this.state = this.STATES.IMAGE_SELECT;
  }

  hideSelector() {
    this.state = this.STATES.IDLE;
  }

  onClipartSelect(clipart) {
    this.hideSelector();
    if (!clipart) return;

    this.drawService.addSVGByUrl(clipart.path);
  }

  onClipartSelectCancel() {
    this.hideSelector();
  }

  onImageSelect(clipart) {
    this.hideSelector();
    if (!clipart) return;

    this.drawService.addSVGByUrl(clipart.path);
  }

  onImageSelectCancel() {
    this.hideSelector();
  }
}
