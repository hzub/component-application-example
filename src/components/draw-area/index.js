import {
  CORE,
  DRAW
} from 'shared';

import { DrawAreaComponent } from './draw-area.component';

export const DRAW_AREA = angular.module('components.draw-area', [
    CORE,
    DRAW
  ])
  .component(DrawAreaComponent.NAME, DrawAreaComponent.OPTIONS)
  .name;
