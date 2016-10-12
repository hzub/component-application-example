import { OrientationSelectComponent } from './orientation-select.component';
export const ORIENTATION_SELECT = angular.module('components.orientation-select', [])
  .component(OrientationSelectComponent.NAME, OrientationSelectComponent.OPTIONS)
  .name;
