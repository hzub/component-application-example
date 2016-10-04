import './object-editor.less';

export class ObjectEditorComponent {
  static NAME = 'objectEditor';
  static OPTIONS = {
    controller: ObjectEditorComponent,
    template: require('./object-editor.template.html'),
    bindings: {}
  }

  static $inject = [];

  constructor() {
  }
}
