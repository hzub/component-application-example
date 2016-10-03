import CORE from '../../modules/core/core.module';
import DRAW from '../../modules/draw/draw.module';

import { ClipartService } from './clipart.service';
import { ClipartSelectComponent } from './clipart-select.component';


export const CLIPART_SELECT = angular
  .module('components.clipart-select', [
    CORE,
    DRAW
  ])
  .service('ClipartService', ClipartService)
  .component(ClipartSelectComponent.NAME, ClipartSelectComponent.OPTIONS)
  .name;