import './knob-control.less';

/**
 * TODO: Find/implement the better "knob" plugin and update this component accordingly
 */
export class KnobControlComponent {
  static NAME = 'knobControl';
  static OPTIONS = {
    controller: KnobControlComponent,
    template: require('./knob-control.template.html'),
    bindings: {
      angle: '<',
      entity: '=',
      render: '&'
    }
  }
  static $inject = [];

  constructor() {
    this.data = 0;
    this.options = {
      width: 90,
      height: 90,
      min: -1,
      max: 360,
      fgColor: "#428BCA",
      displayPrevious: false,
      readOnly: false,
      cursor: 10,
      thickness: ".3",
      change: (v) => {
        this.entity.setAngle(v);
        this.render();
      },
      release: (v) => {
        this.entity.setAngle(v);
        this.render();
      }
    };
  }

  $onInit() {
    if (this.angle) this.data = this.angle;
  }

  $onChanges() {
    this.data = this.angle;
  }
}
