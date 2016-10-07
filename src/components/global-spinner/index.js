import { GlobalSpinnerService } from './global-spinner.service';
import { GlobalSpinnerComponent } from './global-spinner.component';

import './global-spinner.less';

export const GLOBAL_SPINNER = angular.module('components.global-spinner', [])
  .service(GlobalSpinnerService.NAME, GlobalSpinnerService)
  .component(GlobalSpinnerComponent.NAME, GlobalSpinnerComponent.OPTIONS)
  .name;
