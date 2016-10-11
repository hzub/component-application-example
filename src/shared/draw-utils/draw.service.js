import fabricModule from 'fabric';
import _ from 'lodash';


import utilZoom from './util.zoom.js';
import utilConstraints from './util.constraints.js';

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
    this.lockedObjects = [];
    this.printableAreaLines = [];

    this.$rootScope.$on('draw:stateChanged', (e, params) => {
      switch (params.state) {
      case this.DRAW_STATES.ADDSHAPE:
      case this.DRAW_STATES.SELECTPRODUCT:
      case this.DRAW_STATES.PAN:
        this.deselectEntity();
        break;
      }
    });
  }

  lockEntity(entity) {
    if (!entity) {
      return;
    }

    this._canvas.deactivateAll();

    entity.lockMovementX = true;
    entity.lockMovementY = true;
    entity.lockScalingX = true;
    entity.lockRotation = true;
    this.lockedObjects.push(entity);
  }

  deselectEntity() {
    this._canvas.deactivateAll();
    this._canvas.renderAll();
  }

  unlockEntities() {
    while (this.lockedObjects.length) {
      const entity = this.lockedObjects.pop();
      entity.lockMovementX = false;
      entity.lockMovementY = false;
      entity.lockScalingX = false;
      entity.lockRotation = false;

    }
  }

  getState() {
    return this.state;
  }

  relativePan(x, y) {
    utilZoom.relativePan(this._canvas, this._zoom, x, y);

    this.$rootScope.$broadcast('draw:viewportChanged');
  }

  setState(state) {
    this.state = state;
    this.$rootScope.$broadcast('draw:stateChanged', {
      state,
    });

    this.changeCursorForState();
  }

  changeCursorForState() {
    switch (this.getState()) {
    case this.DRAW_STATES.PAN:
      this._canvas.defaultCursor = 'pointer';
      break;
    case this.DRAW_STATES.ZOOM:
      this._canvas.defaultCursor = 'zoom-in';
      break;
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
    return () => _.pull(this.onSelectEntity.callbacks, cb);
  }

  selectEntity(entity) {
    const previousEntity = this._selectedEntity;

    this._selectedEntity = entity;

    if (this._lastDeletedEntity === entity) {
      return;
    }

    this.onSelectEntity.callbacks.forEach(cb => cb(entity, previousEntity));
  }

  addImageByUrl(url) {
    fabric.Image.fromURL(url, (oImg) => {
      this.prepareNewEntity(oImg);
      this._canvas.add(oImg);
      this.selectEntity(oImg);
      this.setState(this.DRAW_STATES.SELECT);
    });
  }

  addSVGByUrl(url) {
    fabric.loadSVGFromURL(url, (...args) => {

      const newClipartObject = new fabric
        .PathGroup(...args)
        .set({left: 100, top: 100});

      this.prepareNewEntity(newClipartObject);

      newClipartObject.type = 'path-group';

      this._canvas.add(newClipartObject);
      this.selectEntity(newClipartObject);
      this.setState(this.DRAW_STATES.SELECT);
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

  flipHorizontally(entity) {
    if (entity) {
      entity.set('flipX', !entity.getFlipX());
      this.render();
    }
  }

  flipVertically(entity) {
    if (entity) {
      entity.set('flipY', !entity.getFlipY());
      this.render();
    }
  }

  getZoom() {
    return this._zoom;
  }

  zoomIn() {
    this._zoom++;
    this.redrawZoom();
    this.$rootScope.$broadcast('draw:viewportChanged');
  }

  zoomOut() {
    this._zoom--;

    if (this._zoom < 1) {
      this._zoom = 1;
    }

    this.redrawZoom();
    this.$rootScope.$broadcast('draw:viewportChanged');
  }

  relativeZoomIn(origin) {
    this.zoomIn();
    const delta = utilZoom.zoomFactor - 1.0;
    this.relativePan(-origin[0] * delta, -origin[1] * delta);
  }

  relativeZoomOut(origin) {
    const delta = utilZoom.zoomFactor - 1.0;
    this.relativePan(origin[0] * delta, origin[1] * delta);
    this.zoomOut();
  }

  redrawZoom() {
    utilZoom.redrawZoom(this._canvas, this._zoom);

    this._canvas.renderAll();
  }

  setStackPosition(command) {
    var object = this._canvas.getActiveObject();
    if (object == null) {
      return;
    }
    switch (command) {
    case 'bringToFront':
      object.bringToFront();
      break;
    case 'sendBackwards':
      object.sendBackwards();
      break;
    case 'bringForward':
      object.bringForward();
      break;
    case 'sendToBack':
      object.sendToBack();
      break;
    }
    this.render();
    this.deselectEntity();
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

  getViewportTransformMatrix() {
    return this._canvas.viewportTransform.slice(0);
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

  prepareNewEntity(entity) {
    entity.id = this.getEntityId();
    entity.lockUniScaling = true;
    entity.setControlsVisibility({mtr: false, ml: false, mb: false, mr: false, mt: false});
  }

  addNewText(event) {
    const pointer = this._canvas.getPointer(event.e);

    const text = new fabric.Text('', {
      left: pointer.x,
      top: pointer.y,
    });

    text.type = 'text';

    const defaultFont = this.fontService.getDefaultFont();

    text.fontObject = defaultFont;

    this.prepareNewEntity(text);

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

  getDimensions() {
    return [this._canvas.width, this._canvas.height];
  }

  showPrintAreaLines(doShow) {
    if (!this.printableAreaLines) {
      return;
    }

    this.printableAreaLines.forEach(line => {
      line.set({opacity: doShow ? 1 : 0});
    });

    this.render();
  }

  drawCanvasConstraints(canvas, orientation) {
    const lines = utilConstraints.drawCanvasConstraints(canvas, orientation);
    this.printableAreaLines.push(...lines);
  }

  setCanvas(canvas) {
    this._zoom = 1;
    this._canvas = canvas;
  }
}

export default DrawService;
