import fabricModule from 'fabric';
import $ from 'jquery';
import _ from 'lodash';

const fabric = fabricModule.fabric;
const CANVAS_ID = 'draw-area-canvas';

const $inject = ['$rootScope', '$element', 'drawService', 'drawTextService', 'productsService'];

class DrawAreaController {
  constructor($rootScope, $element, drawService, drawTextService, productsService) {
    Object.assign(this, {
      $rootScope,
      $element,
      drawService,
      drawTextService,
      productsService,
    });

    this.bindWindowEvents();
    this.orientationLibrary = [];
    this.selectedOrientation = undefined;

    this.productsService.onProductChange(product => {
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
    this.drawService.setupCanvasConstraints(canvas, orientation);

    this.bindEvents(canvas);

    return canvas;
  }

  cleanUpFabric() {
    /*this.canvas.clear();
    this.$element.empty();
    this.$element.append(document.createElement('CANVAS'));*/
  }

  bindEvents(canvas) {
    canvas.on('mouse:down', options => {
      this.$rootScope.$apply(() => {
        const drawState = this.drawService.getState();

        if (drawState === 'ADDTEXT') {
          this.drawService.addNewText(options);
        } else {
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
  }
}

DrawAreaController.$inject = $inject;

export default DrawAreaController;
