import knobDirective from './knob/knob.directive';

/**
 * TODO: decide how to deal with the contents of this module in the context of "Components design".
 */
export const ELEMENTS = angular.module('designerApp.shared.elements', [])
  .directive('knob', knobDirective)
  .name;

