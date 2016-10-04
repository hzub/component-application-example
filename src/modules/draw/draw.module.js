import RoutingConfiguration from './draw.routes';


import { DRAW_STATES } from './draw-states.constant';
import { DRAW_ACTIONS } from './draw-actions.constant';

import DrawService from './services/draw.service.js';
import FontService from './services/font.service.js';
import ProductsService from './services/products.service.js';
import DrawTextService from './services/draw.text.service.js';

import ProductSelectDirective from './directives/product-select/product-select.directive.js';
import TextEditorDirective from './directives/text-editor/text-editor.directive.js';
import DrawAreaDirective from './directives/draw-area/draw-area.directive.js';
import DrawPreviewDirective from './directives/draw-preview/draw-preview.directive.js';

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
  .service('fontService', FontService)
  .service('productsService', ProductsService)
  .service('drawTextService', DrawTextService)
  .directive('drawArea', DrawAreaDirective)
  .directive('drawPreview', DrawPreviewDirective)
  .directive('textEditor', TextEditorDirective)
  .directive('productSelect', ProductSelectDirective)
  .directive('leftDrawSidebar', LeftDrawSidebarDirective);

export default moduleName;

