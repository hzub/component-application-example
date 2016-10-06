import { CORE, DRAW } from 'shared';
import { ProductSelectComponent } from './product-select.component';

export const PRODUCT_SELECT = angular.module('components.product-select', [
    CORE,
    DRAW
  ])
  .component(ProductSelectComponent.NAME, ProductSelectComponent.OPTIONS)
  .name;
