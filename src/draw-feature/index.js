import {
  CORE,
  DRAW_UTILS,
  ELEMENTS,
  USER_DESIGNS,
} from 'shared';

import {
  DRAW_AREA,
  DRAW_PREVIEW,
  LEFT_DRAW_SIDEBAR,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,
  PRODUCT_SELECT,
  TEXT_EDITOR,
  SELECT_DESIGN_POPUP,
} from 'components';

import StackSelectorDirective from './directives/stack-selector/stack-selector.directive';
import { StackSelectorService } from './directives/stack-selector/stack-selector.service';
import { RoutingConfiguration } from './draw.routes';

export const DRAW_FEATURE = angular
  .module('draw-feature', [
    CORE,
    DRAW_UTILS,
    ELEMENTS,
    USER_DESIGNS,

    DRAW_AREA,
    DRAW_PREVIEW,
    LEFT_DRAW_SIDEBAR,

    SHAPES_PANE,
    OBJECT_EDITOR_PANE,
    PRODUCT_SELECT,
    TEXT_EDITOR,
    SELECT_DESIGN_POPUP,
  ])
  .config(RoutingConfiguration)
  .service('stackSelectorService', StackSelectorService)
  .directive('stackSelector', StackSelectorDirective)
  .name;
