import _ from 'lodash';
import './color-control.less';

export class ColorControlComponent {
  static NAME = 'colorControl';
  static OPTIONS = {
    controller: ColorControlComponent,
    template: require('./color-control.template.html'),
    bindings: {
      entity: '<',
      render: '&'
    }
  }

  static $inject = [];

  constructor() {
    this.COLOR_REGEXP = /#\d{0,6}|rgb\(.+|\D+/;
    this.COLOR_TYPES = {
      STROKE: 'stroke',
      FILL: 'fill'
    };

    this.colors = {
      [this.COLOR_TYPES.FILL]: [],
      [this.COLOR_TYPES.STROKE]: []
    };
  }

  $onInit() {
    this._setColors();
  }


  $onChanges() {
    this._setColors();
  }

  $onDestroy() {
    this.colors = [];
  }

  updateColor(color) {
    console.log('updateColor', {color});

    // this is svg
    if (this._isSVG()) {
      color.indexes
        .map(i => this.entity.paths[i])
        .forEach(path => this._setPathColor(path, color));
    }

    this.render();
  }

  _setColors() {
    this._resetColors();
    if (!this.entity) return;

    if (this._isSVG()) {
      this.entity.paths.map((path, index) => this._addPathColors(path, index))
    }
  }

  _addPathColors(path, index) {
    const fill = this._createFillColor(path, index);
    const stroke = this._createStrokeColor(path, index);

    if (fill) this._addColor(fill, index);
    if (stroke) this._addColor(stroke, index);
  }

  _addColor(color, index) {
    const colors = this.colors[color.type];
    const existingColor = _.find(colors, c => c.value === color.value);


    if (existingColor) {
      existingColor.indexes.push(index);
    } else {
      colors.push(color);
    }
  }

  _isSVG() {
    return this.entity.paths && this.entity.paths.length;
  }

  _createFillColor(path, index) {
    return path.fill && path.fill.match(this.COLOR_REGEXP)
      ? this._createColorObject(path.fill, index, this.COLOR_TYPES.FILL)
      : null;
  }

  _createStrokeColor(path, index) {
    return path.stroke && path.stroke.match(this.COLOR_REGEXP)
      ? this._createColorObject(path.stroke, index, this.COLOR_TYPES.STROKE)
      : null;
  }

  _createColorObject(value, index, type) {
    return {value, type, indexes: [index]};
  }

  _resetColors() {
    _.map(this.colors, groupColors => groupColors.length = 0)
  }

  _setPathColor(path, color) {
    switch (color.type) {
    case this.COLOR_TYPES.STROKE:
      path.setStroke(color.value);
      break;
    case this.COLOR_TYPES.FILL:
      path.setFill(color.value);
      break;
    default:
      break;
    }
  }
}
