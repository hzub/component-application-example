import angular from 'angular';

import externalDependencies from './main.dependencies';

import {
  ELEMENTS,
  DRAW,
  CORE
} from 'shared';

import {
  SHAPES_PANE,
  OBJECT_EDITOR_PANE
} from './components';


import defaultLayoutModule from './layouts/default/default.module';

angular.module('designerApp', [
  ...externalDependencies,

  CORE,
  DRAW,
  ELEMENTS,

  SHAPES_PANE,
  OBJECT_EDITOR_PANE,

  defaultLayoutModule,
]);
