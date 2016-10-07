import { CORE, DRAW_UTILS } from 'shared';
import { ProductSelectComponent } from './product-select.component';

export const PRODUCT_SELECT = angular.module('components.product-select', [
    CORE,
    DRAW_UTILS
  ])
  .component(ProductSelectComponent.NAME, ProductSelectComponent.OPTIONS)
  .name;
