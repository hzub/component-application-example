import fabricModule from 'fabric';
import $ from 'jquery';
import _ from 'lodash';

const fabric = fabricModule.fabric;

const $inject = [
  '$rootScope',
  '$element',
  'DRAW_STATES',
  'drawService',
  'drawTextService',
  'productsService',
];

class DrawAreaController {
  constructor(
    $rootScope,
    $element,
    DRAW_STATES,
    drawService,
    drawTextService,
    productsService
  ) {
    Object.assign(this, {
      $rootScope,
      $element,
      DRAW_STATES,
      drawService,
      drawTextService,
      productsService,
    });

    this.bindWindowEvents();
    this.orientationLibrary = [];
    this.selectedOrientation = undefined;
    this.panning = false;

    this.productsService.onProductChange(() => {
      this.orientationLibrary = [];
      this.init();
    });
  }

  init() {
    this.$element.empty();
    const orientations = this.productsService.getAvailableOrientations();

    orientations.forEach(orientation => {
      const canvasElement = document.createElement('CANVAS');
      canvasElement.id = `canvas-${orientation.name}`;
      this.$element.append(canvasElement);
      const canvas = this.initializeFabric(canvasElement, orientation);

      this.orientationLibrary.push({
        name: orientation.name,
        container: $(canvasElement).parent(),
        canvas,
      });
    });

    const selectedOrientation = this.productsService.getSelectedOrientation();

    this.loadOrientation(selectedOrientation);

    this.productsService.onOrientationChange(orientation => {
      this.drawService.selectEntity(null);
      this.drawService.setState('SELECT');

      this.loadOrientation(orientation);
    });
  }

  loadOrientation(orientationToLoad) {
    _.each(this.orientationLibrary, orientation => {
      if (orientation.name === orientationToLoad.name) {
        orientation.container.show();
        this.drawService.setCanvas(orientation.canvas);
      } else {
        orientation.container.hide();
      }
    });
  }

  initializeFabric(canvasElement, orientation) {
    canvasElement.setAttribute('width', orientation.workarea_width);
    canvasElement.setAttribute('height', orientation.workarea_height);

    const canvas = new fabric.Canvas(canvasElement.id);
    this.drawService.drawCanvasConstraints(canvas, orientation);

    this.bindCanvasEvents(canvas);

    return canvas;
  }

  isInDrawArea(element) {

    let currentElement = element;
    while (currentElement) {
      if (currentElement.tagName === 'DRAW-AREA') {
        return true;
      }
      currentElement = currentElement.parentElement;
    }

    return false;
  }

  bindCanvasEvents(canvas) {
    canvas.on('mouse:move', e => {
      if (this.panning && e && e.e) {
        this.drawService.relativePan(e.e.movementX, e.e.movementY);
      }
    });

    canvas.on('mouse:up', () => {
      if (this.panning) {
        this.panning = false;
        this.drawService.unlockEntities();
      }
    });

    canvas.on('mouse:down', options => {
      this.$rootScope.$apply(() => {
        const drawState = this.drawService.getState();

        if (drawState === 'PAN') {
          this.panning = true;
          this.drawService.lockEntity(options.target);
        } else if (drawState === 'ADDTEXT') {
          this.drawService.lockEntity(options.target);
          this.drawService.addNewText(options);
        } else {
          this.drawService.unlockEntities();

          this.drawService.setState(this.DRAW_STATES.SELECT);

          this.drawService.selectEntity(options.target);
        }
      });
    });

    canvas.on('object:modified', event => {
      this.$rootScope.$apply(() => {
        if (event.target && event.target.type === 'text') {
          this.drawTextService.resizeUniform(event.target);
        }
      });
    });
  }

  bindWindowEvents() {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 46) { // delete
        this.$rootScope.$apply(() => {
          this.drawService.deleteSelectedEntity();
        });
      }
    });

    window.addEventListener('mousewheel', (e) => {
      if (this.isInDrawArea(e.target)) {
        if (e.deltaY < 0) {
          this.drawService.zoomIn();
          this.drawService.relativePan(-e.offsetX * 0.1, -e.offsetY * 0.1);
        } else {
          this.drawService.relativePan(e.offsetX * 0.1, e.offsetY * 0.1);
          this.drawService.zoomOut();
        }
      }
    });
  }
}

DrawAreaController.$inject = $inject;

export default DrawAreaController;
