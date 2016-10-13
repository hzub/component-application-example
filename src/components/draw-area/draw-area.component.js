import { extendFabric } from './fabric.extensions';

export class DrawAreaComponent {
  static NAME = 'drawArea';
  static OPTIONS = {
    controller: DrawAreaComponent,
    template: require('./draw-area.template.html'),
    bindings: {}
  }

  static $inject = [
    '$rootScope',
    '$element',
    'drawService',
    'drawTextService',
    'productsService',
    'stackSelectorService',
    'AppModeService',
    'APP_MODES'
  ];

  constructor($rootScope,
    $element,
    drawService,
    drawTextService,
    productsService,
    stackSelectorService,
    AppModeService,
    APP_MODES) {

    Object.assign(this, {
      $rootScope,
      $element,
      drawService,
      drawTextService,
      productsService,
      stackSelectorService,
      AppModeService,
      APP_MODES,
    });

    extendFabric(this);

    this.orientationLibrary = [];
    this.selectedOrientation = undefined;
    this.panning = false;
    this.zooming = false;
    this.zoomOrigin = null;

    this.productsService.onProductChange(() => {
      this.orientationLibrary = [];
      this.init();
    });
  }

  $onInit() {
    this.init();
    this.bindWindowEvents();
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
      this.AppModeService.setSelectMode();

      this.loadOrientation(orientation);
    });

    this.AppModeService.setSelectMode();
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
    canvasElement.setAttribute('width', orientation.width);
    canvasElement.setAttribute('height', orientation.height);

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

      if (this.zooming && e && e.e) {
        if (e.e.movementX > 1) {
          this.drawService.relativeZoomIn(this.zoomOrigin);
        }

        if (e.e.movementX < -1) {
          this.drawService.relativeZoomOut(this.zoomOrigin);
        }
      }
    });

    canvas.on('mouse:up', () => {
      if (this.panning) {
        this.panning = false;
        this.drawService.unlockEntities();
      }

      if (this.zooming) {
        this.zooming = false;
        this.drawService.unlockEntities();
      }
    });

    canvas.on('mouse:down', options => {
      this.$rootScope.$apply(() => {
        const appMode = this.AppModeService.getMode();

        switch (appMode) {
          case this.APP_MODES.PAN:
            this.panning = true;
            this.drawService.lockEntity(options.target);
            break;
          case this.APP_MODES.ZOOM:
            this.zooming = true;
            this.zoomOrigin = [options.e.offsetX, options.e.offsetY];
            this.drawService.lockEntity(options.target);
            break;
          case this.APP_MODES.ADDTEXT:
            this.drawService.lockEntity(options.target);
            this.drawService.addNewText(options);
            break;
          default:
            this.drawService.unlockEntities();
            this.AppModeService.setSelectMode();
            this.drawService.selectEntity(options.target);
            break;
        }
      });
    });

    canvas.on('object:moving', () => {
      const hide = this.stackSelectorService.hide();
      if (hide) { // no costly autoapply, we're check it inside
        this.$rootScope.$apply();
      }
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

    window.addEventListener('mousedown', e => {
      if (this.isInDrawArea(e.target)) {
        this.stackSelectorService.hide();
      }
    }, true);

    this.$element.on('mouseenter', () => {
      this.drawService.showPrintAreaLines(true);
    });

    this.$element.on('mouseleave', () => {
      this.drawService.showPrintAreaLines(false);
    });

    window.addEventListener('mousewheel', (e) => {
      if (
        this.AppModeService.getMode() === this.APP_MODES.PAN &&
        this.isInDrawArea(e.target)
      ) {
        if (e.deltaY < 0) {
          this.drawService.relativeZoomIn([e.offsetX, e.offsetY]);
        } else {
          this.drawService.relativeZoomOut([e.offsetX, e.offsetY]);
        }
      }
    });
  }
}
