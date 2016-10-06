import _ from 'lodash';
import $ from 'jquery';

import './draw-preview.less';

const PREVIEW_WIDTH = 150;

export class DrawPreviewComponent {
  static NAME = 'drawPreview';
  static OPTIONS = {
    controller: DrawPreviewComponent,
    template: require('./draw-preview.template.html'),
    bindings: {}
  }

  static $inject = [
    '$rootScope',
    '$element',
    'drawService'
  ];

  constructor($rootScope, $element, drawService) {
    Object.assign(this, {
      $rootScope,
      $element,
      drawService,
    });

    this.outerElement = $($element).find('.outer');
    this.innerElement = $($element).find('.inner');

    this.clickOffset = undefined;

    this.hookEvents();
  }

  render() {
    this.outerElement.css('width', this.containerWidth + 'px');
    this.outerElement.css('height', this.containerHeight + 'px');

    this.innerElement.css('width', this.targetWidth + 'px');
    this.innerElement.css('height', this.targetHeight + 'px');
    this.innerElement.css('left', this.targetX + 'px');
    this.innerElement.css('top', this.targetY + 'px');
  }

  hookEvents() {
    this.innerElement.on('mousedown', e => {
      this.clickOffset = [e.clientX, e.clientY];
    });

    /*
    * TODO: Unsubscribe on $destroy
    * */
    $(window).on('mouseup', () => {
      this.clickOffset = undefined;
    });

    $(window).on('mousemove', e => {
      if (this.clickOffset) {
        const vpt = this.drawService.getViewportTransformMatrix();
        const size = this.drawService.getDimensions();

        const deltaX = e.clientX - this.clickOffset[0];
        const deltaY = e.clientY - this.clickOffset[1];

        this.clickOffset = [e.clientX, e.clientY];

        const zoom = vpt[0];

        const scaleRatio = PREVIEW_WIDTH / size[0];

        this.drawService.relativePan(-deltaX * zoom / scaleRatio, -deltaY * zoom / scaleRatio);
      }
    });
  }

  $onInit() {
    const throttledUpdate = _.throttle(() => {
      const vpt = this.drawService.getViewportTransformMatrix();
      const size = this.drawService.getDimensions();

      const sizeRatio = size[0] / size[1];

      const zoom = vpt[0];
      const sourceWidth = size[0] / zoom;
      const sourceHeight = size[1] / zoom;

      const sourceX = vpt[4] / zoom;
      const sourceY = vpt[5] / zoom;

      const scaleRatio = PREVIEW_WIDTH / size[0];

      this.targetWidth = sourceWidth * scaleRatio;
      this.targetHeight = sourceHeight * scaleRatio;
      this.targetX = -sourceX * scaleRatio;
      this.targetY = -sourceY * scaleRatio;

      this.containerWidth = PREVIEW_WIDTH;
      this.containerHeight = PREVIEW_WIDTH / sizeRatio;

      this.render();
    }, 50);

    this.$rootScope.$on('draw:viewportChanged', throttledUpdate);
  }
}
