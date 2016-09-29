import RoutingConfiguration from './draw.routes';

import DrawService from './services/draw.service.js';
import ProductsService from './services/products.service.js';
import DrawTextService from './services/draw.text.service.js';

import ProductSelectDirective from './directives/product-select/product-select.directive.js';
import TextEditorDirective from './directives/text-editor/text-editor.directive.js';
import DrawAreaDirective from './directives/draw-area/draw-area.directive.js';

import LeftDrawSidebarDirective from
  './directives/left-draw-sidebar/left-draw-sidebar.directive.js';

const moduleName = 'designerApp.draw';

/**
 * Draw module
 *
 * events:
 * - draw:stateChanged
 * - draw:entityUpdated
 */
angular.module(moduleName, [])
  .config(RoutingConfiguration)
  .service('drawService', DrawService)
  .service('productsService', ProductsService)
  .service('drawTextService', DrawTextService)
  .directive('drawArea', DrawAreaDirective)
  .directive('textEditor', TextEditorDirective)
  .directive('productSelect', ProductSelectDirective)
  .directive('leftDrawSidebar', LeftDrawSidebarDirective)
;

export default moduleName;

