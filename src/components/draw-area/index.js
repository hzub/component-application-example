import {
  CORE,
  DRAW_UTILS
} from 'shared';

import { DrawAreaComponent } from './draw-area.component';

export const DRAW_AREA = angular.module('components.draw-area', [
    CORE,
    DRAW_UTILS
  ])
  .component(DrawAreaComponent.NAME, DrawAreaComponent.OPTIONS)
  .name;
