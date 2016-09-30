import fabricModule from 'fabric';
import _ from 'lodash';

const fabric = fabricModule.fabric;

const $inject = ['$rootScope', 'fontService'];

class DrawService {
  constructor($rootScope, fontService) {
    Object.assign(this, {
      $rootScope, fontService,
    });

    this._canvas = null;
    this.state = 'SELECT';

    this._selectedEntity = undefined;
    this._lastDeletedEntity = undefined;
    this.onSelectEntity.callbacks = [];
    this.idGenerator = 0;

  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.$rootScope.$broadcast('draw:stateChanged', {
      state,
    });

    this.changeCursorForState();
  }

  changeCursorForState() {
    if (this.state === 'ADDTEXT') {
      this._canvas.defaultCursor = 'crosshair';
    } else {
      this._canvas.defaultCursor = 'default';
    }
  }

  getEntityId() {
    return ++this.idGenerator;
  }

  getSelectedEntity() {
    return this._selectedEntity;
  }

  onSelectEntity(cb) {
    this.onSelectEntity.callbacks.push(cb);
  }

  selectEntity(entity) {
    const previousEntity = this._selectedEntity;

    this._selectedEntity = entity;

    if (this._lastDeletedEntity === entity) {
      return;
    }

    this.onSelectEntity.callbacks.forEach(cb => {
      cb.call(this, entity, previousEntity);
    });
  }

  addBox(x, y) {
    const circle = new fabric.Circle({
      radius: 20, fill: 'green', left: x, top: y,
    });

    circle.id = this.getEntityId();

    this._canvas.add(circle);
  }

  deleteSelectedEntity() {
    const selectedEntity = this.getSelectedEntity();

    if (selectedEntity) {
      this.deleteEntity(selectedEntity);
      this.selectEntity(null);
      this.render();
    }
  }

  deleteEntity(entity) {
    this._lastDeletedEntity = entity;
    if (entity) {
      this._canvas.remove(entity);
    }
  }

  notifyEntityUpdate(entity) {
    this.$rootScope.$broadcast('draw:entityUpdated', {
      entity,
    });
  }

  centerEntityVertically(entity) {
    entity.centerV();
    entity.setCoords();
    this.render();
  }

  centerEntityHorizontally(entity) {
    entity.centerH();
    entity.setCoords();
    this.render();
  }

  addNewText(event) {
    const pointer = this._canvas.getPointer(event.e);

    const text = new fabric.Text('', {
      left: pointer.x, top: pointer.y,
    });

    text.id = this.getEntityId();
    text.type = 'text';
    text.lockUniScaling = true;
    text.setControlsVisibility({ mtr: false, ml: false, mb: false, mr: false, mt: false });

    const defaultFont = this.fontService.getDefaultFont();

    text.fontObject = defaultFont;

    this.fontService.loadFont(defaultFont).then(() => {
      text.setFontFamily(defaultFont.variants[0].fontface);
      this.render();
    });

    this._canvas.add(text);
    this._canvas.setActiveObject(text);
    this.selectEntity(text);

    this.setState('SELECT');
  }

  render() {
    this._canvas.renderAll();
  }

  setupCanvasConstraints(canvas, orientation) {
    canvas.selection = false;

    const width = orientation.width;
    const height = orientation.height;

    const workareaWidth = orientation.workarea_width;
    const workareaHeight = orientation.workarea_height;

    const printableWidth = orientation.printable_width;
    const printableHeight = orientation.printable_height;

    const printableOffsetX = orientation.printable_offset_x;
    const printableOffsetY = orientation.printable_offset_y;

    const left = (workareaWidth / 2) - (width / 2);
    const right = (workareaWidth / 2) + (width / 2);

    const top = (workareaHeight / 2) - (height / 2);
    const bottom = (workareaHeight / 2) + (height / 2);

    const overlayDefinition = {
      fill: 'rgba(0, 0, 0, 0.15)',
      selectable: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'default',
    };

    const topBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth, top: 0, height: top, left:0,
    }));

    const bottomBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth, top: bottom, height: workareaHeight - bottom, left: 0,
    }));

    const leftBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: left, top: top, height: bottom-top, left:0,
    }));

    const rightBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth - right, top: top, height: bottom-top, left:right,
    }));

    canvas.setBackgroundImage(orientation.background_url, canvas.renderAll.bind(canvas));
    canvas.add(topBox, bottomBox, leftBox, rightBox);

    const workspaceLineDefinition = {
      stroke: 'red',
      strokeDashArray: [5, 7],
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
    };

    const printableAreaLineDefinition = {
      stroke: 'blue',
      strokeDashArray: [5, 7],
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
    };

    const leftWorkAreaLine = new fabric.Line([ left, 0, left, workareaHeight ], workspaceLineDefinition);
    const rightWorkAreaLine = new fabric.Line([ right, 0, right, workareaHeight ], workspaceLineDefinition);
    const topWorkAreaLine = new fabric.Line([ 0, top, workareaWidth, top ], workspaceLineDefinition);
    const bottomWorkAreaLine = new fabric.Line([ 0, bottom, workareaWidth, bottom ], workspaceLineDefinition);

    canvas.add(leftWorkAreaLine, rightWorkAreaLine, topWorkAreaLine, bottomWorkAreaLine);

    const leftPrintableAreaLine = new fabric.Line([ left + printableOffsetX, 0, left + printableOffsetX, workareaHeight ], printableAreaLineDefinition);
    const rightPrintableAreaLine = new fabric.Line([ right - printableOffsetX, 0, right - printableOffsetX, workareaHeight ], printableAreaLineDefinition);
    const topPrintableAreaLine = new fabric.Line([ 0, top + printableOffsetY, workareaWidth, top + printableOffsetY ], printableAreaLineDefinition);
    const bottomPrintableAreaLine = new fabric.Line([ 0, bottom - printableOffsetY, workareaWidth, bottom - printableOffsetY ], printableAreaLineDefinition);

    canvas.add(leftPrintableAreaLine, rightPrintableAreaLine, topPrintableAreaLine, bottomPrintableAreaLine);
  }

  setCanvas(canvas) {
    this._canvas = canvas;
  }
}

DrawService.$inject = $inject;

export default DrawService;
