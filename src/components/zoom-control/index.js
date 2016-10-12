import { DRAW_UTILS } from 'shared';
import { ZoomControlComponent } from './zoom-control.component';

export const ZOOM_CONTROL = angular.module('components.zoom-control', [
    DRAW_UTILS
  ])
  .component(ZoomControlComponent.NAME, ZoomControlComponent.OPTIONS)
  .name;
