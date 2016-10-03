import fabricModule from 'fabric';
import _ from 'lodash';

const fabric = fabricModule.fabric;

class DrawService {
  static $inject = [
    'DRAW_STATES',
    'DRAW_ACTIONS',
    '$rootScope',
    'fontService'
  ];

  constructor(DRAW_STATES, DRAW_ACTIONS, $rootScope, fontService) {
    Object.assign(this, {
      DRAW_STATES,
      DRAW_ACTIONS,
      $rootScope,
      fontService,
    });

    this._canvas = null;
    this.state = DRAW_STATES.SELECT;

    this._selectedEntity = undefined;
    this._lastDeletedEntity = undefined;
    this.onSelectEntity.callbacks = [];
    this.idGenerator = 0;
  }

  getState() {
    return this.state;
  }

  relativePan(x, y) {
    // e.e.movementX, e.e.movementY;
    //
    //
    /*var vpt = canvas.viewportTransform.slice(0);
    vpt[4] = -point.x;
    vpt[5] = -point.y;
    return this.setViewportTransform(vpt);

    console.info(canvas.viewportTransform);
    canvas.relativePan(delta);*/

    // TODO: set proper constraints
    const constraintW = 600;
    const constraintH = 600;

    let zoom = 1.0;

    for (let i = 0; i < this._zoom - 1; i++) {
      zoom *= 1.1;
    }

    var vpt = this._canvas.viewportTransform.slice(0);
    vpt[4] = -(-x - this._canvas.viewportTransform[4]);
    if (vpt[4] > 0) {
      vpt[4] = 0;
    }

    if (vpt[4] < constraintW - constraintW * zoom) {
      vpt[4] = constraintW - constraintW * zoom;
    }

    vpt[5] = -(-y - this._canvas.viewportTransform[5]);
    if (vpt[5] > 0) {
      vpt[5] = 0;
    }

    if (vpt[5] < constraintH - constraintH * zoom) {
      vpt[5] = constraintH - constraintH * zoom;
    }

    return this._canvas.setViewportTransform(vpt);

  }

  setState(state) {
    this.state = state;
    this.$rootScope.$broadcast('draw:stateChanged', {
      state,
    });

    this.changeCursorForState();
  }

  changeCursorForState() {
    switch (this.state) {
    case this.DRAW_STATES.ADDTEXT:
      this._canvas.defaultCursor = 'crosshair';
      break;
    default:
      this._canvas.defaultCursor = 'default';
      break;
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

  addSVGByUrl(url) {
    // WIP...
    // TODO (alexnadr2110pro): implement this, be man!
    fabric.loadSVGFromURL(url, (...args) => {

      this._canvas.add(new fabric
        .PathGroup(...args)
        .set({left: 100, top: 100}));
    });
  }

  addBox(x, y) {
    const circle = new fabric.Circle({
      radius: 20,
      fill: 'green',
      left: x,
      top: y,
    });

    circle.id = this.getEntityId();

    this._canvas.add(circle);
  }

  zoomIn() {
    this._zoom++;
    this.redrawZoom();
  }

  zoomOut() {
    this._zoom--;

    if (this._zoom < 1) {
      this._zoom = 1;
    }

    this.redrawZoom();
  }

  redrawZoom() {
    let zoom = 1.0;
    for (let i = 0; i < this._zoom - 1; i++) {
      zoom *= 1.1;
    }
    this._canvas.setZoom(zoom);

    // TODO: set proper constraints
    const constraintW = 600;
    const constraintH = 600;

    var vpt = this._canvas.viewportTransform.slice(0);
    if (vpt[4] > 0) {
      vpt[4] = 0;
    }

    if (vpt[4] < constraintW - constraintW * zoom) {
      vpt[4] = constraintW - constraintW * zoom;
    }

    if (vpt[5] > 0) {
      vpt[5] = 0;
    }

    if (vpt[5] < constraintH - constraintH * zoom) {
      vpt[5] = constraintH - constraintH * zoom;
    }

    this._canvas.setViewportTransform(vpt);

    this._canvas.renderAll();
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
      left: pointer.x,
      top: pointer.y,
    });

    text.id = this.getEntityId();
    text.type = 'text';
    text.lockUniScaling = true;
    text.setControlsVisibility({mtr: false, ml: false, mb: false, mr: false, mt: false});

    const defaultFont = this.fontService.getDefaultFont();

    text.fontObject = defaultFont;

    this.fontService.loadFont(defaultFont).then(() => {
      text.setFontFamily(defaultFont.variants[0].fontface);
      this.render();
    });

    this._canvas.add(text);
    this._canvas.setActiveObject(text);
    this.selectEntity(text);

    this.setState(this.DRAW_STATES.SELECT);
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
      width: workareaWidth,
      top: 0,
      height: top,
      left: 0,
    }));

    const bottomBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth,
      top: bottom,
      height: workareaHeight - bottom,
      left: 0,
    }));

    const leftBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: left,
      top: top,
      height: bottom - top,
      left: 0,
    }));

    const rightBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth - right,
      top: top,
      height: bottom - top,
      left: right,
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

    const leftWorkAreaLine = new fabric.Line([
      left,
      0,
      left,
      workareaHeight
    ], workspaceLineDefinition);
    const rightWorkAreaLine = new fabric.Line([
      right,
      0,
      right,
      workareaHeight
    ], workspaceLineDefinition);
    const topWorkAreaLine = new fabric.Line([0, top, workareaWidth, top], workspaceLineDefinition);
    const bottomWorkAreaLine = new fabric.Line([
      0,
      bottom,
      workareaWidth,
      bottom
    ], workspaceLineDefinition);

    canvas.add(leftWorkAreaLine, rightWorkAreaLine, topWorkAreaLine, bottomWorkAreaLine);

    const leftPrintableAreaLine = new fabric.Line([
      left + printableOffsetX,
      0,
      left + printableOffsetX,
      workareaHeight
    ], printableAreaLineDefinition);
    const rightPrintableAreaLine = new fabric.Line([
      right - printableOffsetX,
      0,
      right - printableOffsetX,
      workareaHeight
    ], printableAreaLineDefinition);
    const topPrintableAreaLine = new fabric.Line([
      0,
      top + printableOffsetY,
      workareaWidth,
      top + printableOffsetY
    ], printableAreaLineDefinition);
    const bottomPrintableAreaLine = new fabric.Line([
      0,
      bottom - printableOffsetY,
      workareaWidth,
      bottom - printableOffsetY
    ], printableAreaLineDefinition);

    canvas.add(leftPrintableAreaLine,
      rightPrintableAreaLine,
      topPrintableAreaLine,
      bottomPrintableAreaLine);
  }

  setCanvas(canvas) {
    this._zoom = 1;
    this._canvas = canvas;
  }
}

export default DrawService;
