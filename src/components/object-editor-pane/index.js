import {
  CORE,
  DRAW,
  ELEMENTS
} from 'shared';

import {
  FlipControlComponent,
  KnobControlComponent,
  ColorControlComponent
} from './controls';

import { ObjectEditorPaneComponent } from './object-editor-pane.component';

export const OBJECT_EDITOR_PANE = angular.module('components.object-editor-pane', [
    CORE,
    DRAW,
    ELEMENTS
  ])
  .component(ColorControlComponent.NAME, ColorControlComponent.OPTIONS)
  .component(FlipControlComponent.NAME, FlipControlComponent.OPTIONS)
  .component(KnobControlComponent.NAME, KnobControlComponent.OPTIONS)
  .component(ObjectEditorPaneComponent.NAME, ObjectEditorPaneComponent.OPTIONS)
  .name;
