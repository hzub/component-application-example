import RoutingConfiguration from './draw.routes';

import { DRAW_STATES } from './draw-states.constant';
import { DRAW_ACTIONS } from './draw-actions.constant';


import DrawService from './services/draw/draw.service.js';
import FontService from './services/font/font.service.js';
import ProductsService from './services/products/products.service.js';
import DrawTextService from './services/draw-text/draw-text.service.js';

import TextEditorDirective from './directives/text-editor/text-editor.directive.js';
import StackSelectorDirective from './directives/stack-selector/stack-selector.directive.js';
import StackSelectorService from './directives/stack-selector/stack-selector.service.js';

/**
 * Draw module
 *
 * events:
 * - draw:stateChanged
 * - draw:entityUpdated
 * - draw:viewportChanged
 */
export const DRAW = angular.module('designerApp.shared.draw', [])
  .constant('DRAW_STATES', DRAW_STATES)
  .constant('DRAW_ACTIONS', DRAW_ACTIONS)
  .config(RoutingConfiguration)
  .service('drawService', DrawService)
  .service('fontService', FontService)
  .service('productsService', ProductsService)
  .service('drawTextService', DrawTextService)
  .service('stackSelectorService', StackSelectorService)
  .directive('textEditor', TextEditorDirective)
  .directive('stackSelector', StackSelectorDirective)
  .name;
