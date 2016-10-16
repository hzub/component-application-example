import { NAVIGATION } from 'shared';

import { PrimaryNavComponent } from './primary-nav.component';

export const PRIMARY_NAV = angular.module('components.primary-nav', [NAVIGATION])
  .component(PrimaryNavComponent.NAME, PrimaryNavComponent.OPTIONS)
  .name;
