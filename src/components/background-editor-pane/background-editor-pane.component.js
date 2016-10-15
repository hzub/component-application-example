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
  }

  updateColor(color) {
    this._drawService.setBackgroundColor(color.value);
  }
}
