import fabricModule from 'fabric';
import _ from 'lodash';

import { StatefulService } from 'shared/state';

import utilZoom from './util.zoom.js';
import utilConstraints from './util.constraints.js';

const fabric = fabricModule.fabric;

class DrawService extends StatefulService {
  static $inject = [
    'DRAW_ACTIONS',
    '$rootScope',
    'fontService',
    'AppModeService',
  ];

  constructor(DRAW_ACTIONS, $rootScope, fontService, AppModeService) {
    super('draw');
    Object.assign(this, {
      DRAW_ACTIONS,
      $rootScope,
      fontService,
      AppModeService,
    });

    this._canvas = null;

    this._lastDeletedEntity = undefined;
    this.idGenerator = 0;
    this.lockedObjects = [];
    this.printableAreaLines = [];

    AppModeService.subscribe(cos => {
      //TODO!
      console.info("DRAWSERWIS ZMIANA", cos);
    })

    /*this.$rootScope.$on('draw:stateChanged', (e, params) => {
      switch (params.state) {
      case this.DRAW_MODES.ADDSHAPE:
      case this.DRAW_MODES.SELECTPRODUCT:
      case this.DRAW_MODES.PAN:
        this.deselectEntity();
        break;
      }
    });*/
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

  /*getState() {
    return this.state;
  }*/

  relativePan(x, y) {
    utilZoom.relativePan(this._canvas, this._zoom, x, y);

    //this.$rootScope.$broadcast('draw:viewportChanged');
    this.publish({ type: this.DRAW_ACTIONS.VIEWPORTCHANGED });
  }

  setState(state) {
    /*this.state = state;
    this.$rootScope.$broadcast('draw:stateChanged', {
      state,
    });*/

    //this.changeCursorForState();
  }

  changeCursorForState() {
    /*switch (this.getState()) {
    case this.DRAW_MODES.PAN:
      this._canvas.defaultCursor = 'pointer';
      break;
    case this.DRAW_MODES.ZOOM:
      this._canvas.defaultCursor = 'zoom-in';
      break;
    case this.DRAW_MODES.ADDTEXT:
      this._canvas.defaultCursor = 'crosshair';
      break;
    default:
      this._canvas.defaultCursor = 'default';
      break;
    }*/
  }

  getEntityId() {
    return ++this.idGenerator;
  }

  getSelectedEntity() {
    const state = this._state.getState();
    return (state && state.selectedEntity) || null;
  }

  getPreviousSelectedEntity() {
    const state = this._state.getState();
    return (state && state.previousSelectedEntity) || null;
  }

  selectEntity(entity) {
    const previousEntity = this.getPreviousSelectedEntity();

    if (this._lastDeletedEntity === entity) {
      return;
    }

    //this.onSelectEntity.callbacks.forEach(cb => cb(entity, previousEntity));
    this._state.setState({
      selectedEntity: entity,
      previousSelectedEntity: previousEntity,
    });
  }

  addImageByUrl(url) {
    fabric.Image.fromURL(url, (oImg) => {
      this.prepareNewEntity(oImg);
      this._canvas.add(oImg);
      this.selectEntity(oImg);
      //this.setState(this.DRAW_MODES.SELECT);
    });
  }

  addSVGByUrl(url) {
    fabric.loadSVGFromURL(url, (...args) => {

      const newClipartObject = new fabric
        .PathGroup(...args)
        .set({ left: 100, top: 100 });

      this.prepareNewEntity(newClipartObject);

      newClipartObject.type = 'path-group';

      this._canvas.add(newClipartObject);
      this.selectEntity(newClipartObject);
      //this.setState(this.DRAW_MODES.SELECT);
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

  zoomIn() {
    this._zoom++;
    this.redrawZoom();
    //this.$rootScope.$broadcast('draw:viewportChanged');
  }

  zoomOut() {
    this._zoom--;

    if (this._zoom < 1) {
      this._zoom = 1;
    }

    this.redrawZoom();
    //this.$rootScope.$broadcast('draw:viewportChanged');
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
    /*this.$rootScope.$broadcast('draw:entityUpdated', {
      entity,
    });*/
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
    entity.setControlsVisibility({ mtr: false, ml: false, mb: false, mr: false, mt: false });
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

    this.AppModeService.setSelectMode();
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
      line.set({ opacity: doShow ? 1 : 0 });
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
