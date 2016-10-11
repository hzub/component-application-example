import {
  CORE,
  DRAW_UTILS
} from 'shared';

import { ClipartService } from './clipart.service';
import { ClipartSelectComponent } from './clipart-select.component';


export const CLIPART_SELECT = angular
  .module('components.clipart-select', [
    CORE,
    DRAW_UTILS
  ])
  .service('ClipartService', ClipartService)
  .component(ClipartSelectComponent.NAME, ClipartSelectComponent.OPTIONS)
  .name;
