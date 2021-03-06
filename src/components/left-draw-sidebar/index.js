import { CORE, DRAW_UTILS } from 'shared';

import { LeftDrawSidebarComponent } from './left-draw-sidebar.component';
export const LEFT_DRAW_SIDEBAR = angular.module('components.left-draw-sidebar', [
    CORE,
    DRAW_UTILS
  ])
  .component(LeftDrawSidebarComponent.NAME, LeftDrawSidebarComponent.OPTIONS)
  .name;
