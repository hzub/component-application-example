import './background-editor-pane.less';

export class BackgroundEditorPaneComponent {
  static NAME = 'backgroundEditorPane';
  static OPTIONS = {
    controller: BackgroundEditorPaneComponent,
    template: require('./background-editor-pane.template.html'),
    bindings: {}
  }

  static $inject = [
    'drawService'
  ];


  /**
   * @param {DrawService} drawService
   */
  constructor(drawService) {
    this._drawService = drawService;
    this._DEFAULT_COLOR = '#ffffff';

    this.color = null;
  }

  updateColor(color) {
    this._drawService.setBackgroundColor(color);
  }

  $onInit() {
    const color = this._drawService.getBackgroundColor();
    this.color = angular.isObject(color)
      ? this._DEFAULT_COLOR
      : color;
  }
}
