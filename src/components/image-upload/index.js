import ngFileUpload from 'ng-file-upload';
import { CORE } from 'shared';

import { ImageUploadComponent } from './image-upload.component';
import { ImageUploadService } from './image-upload.service';


export const IMAGE_UPLOAD = angular.module('components.image-upload', [
    ngFileUpload,
    CORE
  ])
  .service('ImageUploadService', ImageUploadService)
  .component(ImageUploadComponent.NAME, ImageUploadComponent.OPTIONS)
  .name;
