import { UserDesignsService } from './user-designs.service';
import { AutosaveService } from './autosave.service';
import { SaveService } from './save.service';
import { DESIGNS_ACTIONS } from './user-designs.actions.constant';

import { CORE } from '../core';

export const USER_DESIGNS = angular.module('designerApp.shared.userDesigns', [
    CORE,
  ])
  .service(UserDesignsService.NAME, UserDesignsService)
  .service(AutosaveService.NAME, AutosaveService)
  .service(SaveService.NAME, SaveService)
  .constant('DESIGNS_ACTIONS', DESIGNS_ACTIONS)
  .run([AutosaveService.NAME, (autosaveService) => {
    autosaveService.start();
  }])
  .name;
