import {
  CORE,
  DRAW
} from 'shared';

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
