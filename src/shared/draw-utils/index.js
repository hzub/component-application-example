import { DRAW_STATES } from './draw-states.constant';
import { DRAW_ACTIONS } from './draw-actions.constant';

import DrawService from './draw.service.js';
import FontService from './font.service.js';
import ProductsService from './products.service.js';
import DrawTextService from './draw-text.service.js';

/**
 * Draw module
 *
 * events:
 * - draw:stateChanged
 * - draw:entityUpdated
 * - draw:viewportChanged
 */
export const DRAW_UTILS = angular.module('designerApp.shared.draw', [])
  .constant('DRAW_STATES', DRAW_STATES)
  .constant('DRAW_ACTIONS', DRAW_ACTIONS)
  .service('drawService', DrawService)
  .service('fontService', FontService)
  .service('productsService', ProductsService)
  .service('drawTextService', DrawTextService)
  .name;
