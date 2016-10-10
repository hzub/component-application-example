import { CORE, DRAW_UTILS } from 'shared';
import { IMAGE_UPLOAD } from 'components/image-upload';

import { ImageSelectComponent } from './image-select.component';
import { ImagesService } from './images.service';

export const IMAGE_SELECT = angular.module('components.image-select', [
    CORE,
    DRAW_UTILS,
    IMAGE_UPLOAD
  ])
  .service(ImagesService.NAME, ImagesService)
  .component(ImageSelectComponent.NAME, ImageSelectComponent.OPTIONS)
  .name;
