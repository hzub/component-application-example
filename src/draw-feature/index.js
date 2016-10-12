import {
  CORE,
  DRAW_UTILS,
  ELEMENTS,
  USER_DESIGNS,
  NAVIGATION,
} from 'shared';

import {
  DRAW_AREA,
  GLOBAL_SPINNER,
  DRAW_PREVIEW,
  LEFT_DRAW_SIDEBAR,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,
  PRODUCT_SELECT,
  TEXT_EDITOR,
  SELECT_DESIGN_POPUP,
  ORIENTATION_SELECT,
  ZOOM_CONTROL,
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
    NAVIGATION,

    DRAW_AREA,
    GLOBAL_SPINNER,
    DRAW_PREVIEW,
    LEFT_DRAW_SIDEBAR,

    SHAPES_PANE,
    OBJECT_EDITOR_PANE,
    PRODUCT_SELECT,
    TEXT_EDITOR,
    SELECT_DESIGN_POPUP,

    ORIENTATION_SELECT,
    ZOOM_CONTROL,
  ])
  .config(RoutingConfiguration)
  .service('stackSelectorService', StackSelectorService)
  .directive('stackSelector', StackSelectorDirective)
  .name;
