import fabricModule from 'fabric';

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
    return utilZoom.relativePan(this._canvas, this._zoom, x, y);
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
    utilZoom.redrawZoom(this._canvas, this._zoom);

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


  drawCanvasConstraints(canvas, orientation) {
    utilConstraints.drawCanvasConstraints(canvas, orientation);
  }

  setCanvas(canvas) {
    this._zoom = 1;
    this._canvas = canvas;
  }
}

export default DrawService;
