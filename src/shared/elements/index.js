import GlobalLoaderService from './directives/global-loader/global-loader.service.js';
import knobDirective from './directives/knob/knob.directive';

/**
 * TODO: decide how to deal with the contents of this module in the context of "Components design".
 */
export const ELEMENTS = angular.module('designerApp.shared.elements', [])
  .directive('knob', knobDirective)
  .service('globalLoader', GlobalLoaderService)
  .name;

