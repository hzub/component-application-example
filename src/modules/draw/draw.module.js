import RoutingConfiguration from './draw.routes';

import { DRAW_STATES } from './draw-states.constant';
import { DRAW_ACTIONS } from './draw-actions.constant';

import DrawService from './services/draw/draw.service.js';
import SaveService from './services/save/save.service.js';
import FontService from './services/font/font.service.js';
import ProductsService from './services/products/products.service.js';
import DrawTextService from './services/draw-text/draw-text.service.js';

import ProductSelectDirective from './directives/product-select/product-select.directive.js';
import TextEditorDirective from './directives/text-editor/text-editor.directive.js';
import DrawAreaDirective from './directives/draw-area/draw-area.directive.js';
import DrawPreviewDirective from './directives/draw-preview/draw-preview.directive.js';
import StackSelectorDirective from './directives/stack-selector/stack-selector.directive.js';
import StackSelectorService from './directives/stack-selector/stack-selector.service.js';

import LeftDrawSidebarDirective from
  './directives/left-draw-sidebar/left-draw-sidebar.directive.js';

const moduleName = 'designerApp.draw';

/**
 * Draw module
 *
 * events:
 * - draw:stateChanged
 * - draw:entityUpdated
 * - draw:viewportChanged
 */
angular.module(moduleName, [])
  .constant('DRAW_STATES', DRAW_STATES)
  .constant('DRAW_ACTIONS', DRAW_ACTIONS)
  .config(RoutingConfiguration)
  .service('drawService', DrawService)
  .service('saveService', SaveService)
  .service('fontService', FontService)
  .service('productsService', ProductsService)
  .service('drawTextService', DrawTextService)
  .service('stackSelectorService', StackSelectorService)
  .directive('drawArea', DrawAreaDirective)
  .directive('drawPreview', DrawPreviewDirective)
  .directive('textEditor', TextEditorDirective)
  .directive('productSelect', ProductSelectDirective)
  .directive('leftDrawSidebar', LeftDrawSidebarDirective)
  .directive('stackSelector', StackSelectorDirective)
;

export default moduleName;

