import _ from 'lodash';
import $ from 'jquery';

const PREVIEW_WIDTH = 150;

class DrawPreviewController {
  static $inject = ['$rootScope', '$element', 'drawService'];

  constructor($rootScope, $element, drawService) {
    Object.assign(this, {
      $rootScope, $element, drawService,
    });

   console.info($($element).find('.outer'));

    this.outerElement = $($element).find('.outer');
    this.innerElement = $($element).find('.inner');
  }

  render() {
    this.outerElement.css('width', this.containerWidth + 'px');
    this.outerElement.css('height', this.containerHeight + 'px');

    this.innerElement.css('width', this.targetWidth + 'px');
    this.innerElement.css('height', this.targetHeight + 'px');
    this.innerElement.css('left', this.targetX + 'px');
    this.innerElement.css('top', this.targetY + 'px');
  }

  init() {
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

      console.info(this.targetWidth, this.targetHeight, this.targetX, this.targetY);

      this.render();
    }, 100);

    this.$rootScope.$on('draw:viewportChanged', throttledUpdate);
  }
}

export default DrawPreviewController;