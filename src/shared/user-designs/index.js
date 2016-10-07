import UserDesignsService from './user-designs.service.js';
import { DESIGNS_ACTIONS } from './user-designs.actions.constant.js';

import { CORE } from '../core';

export const USER_DESIGNS = angular.module('designerApp.shared.userDesigns', [
    CORE
  ])
  .service(UserDesignsService.NAME, UserDesignsService)
  .constant('DESIGNS_ACTIONS', DESIGNS_ACTIONS)
  .name;
