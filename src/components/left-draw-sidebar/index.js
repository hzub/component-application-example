import { CORE, DRAW } from 'shared';

import { LeftDrawSidebarComponent } from './left-draw-sidebar.component';
export const LEFT_DRAW_SIDEBAR = angular.module('components.left-draw-sidebar', [
    CORE,
    DRAW
  ])
  .component(LeftDrawSidebarComponent.NAME, LeftDrawSidebarComponent.OPTIONS)
  .name;
