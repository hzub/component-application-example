import { CORE, DRAW_UTILS, USER_DESIGNS } from 'shared';
import { SelectDesignPopupComponent } from './select-design-popup.component';

export const SELECT_DESIGN_POPUP = angular.module('components.select-design-popup', [
    CORE,
    DRAW_UTILS,
    USER_DESIGNS,
  ])
  .component(SelectDesignPopupComponent.NAME, SelectDesignPopupComponent.OPTIONS)
  .constant('SELECT_DESIGN_POPUP_OPTIONS', SelectDesignPopupComponent.POPUP_OPTIONS)
  .name;
