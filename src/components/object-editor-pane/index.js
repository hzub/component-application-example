import CORE from '../../modules/core/core.module';
import DRAW from '../../modules/draw/draw.module';
import ELEMENTS from '../../modules/elements/elements.module';

import {
  FlipControlComponent,
  KnobControlComponent
} from './controls';

import { ObjectEditorPaneComponent } from './object-editor-pane.component';


export const OBJECT_EDITOR_PANE = angular.module('components.object-editor-pane', [
    CORE,
    DRAW,
    ELEMENTS
  ])
  .component(FlipControlComponent.NAME, FlipControlComponent.OPTIONS)
  .component(KnobControlComponent.NAME, KnobControlComponent.OPTIONS)
  .component(ObjectEditorPaneComponent.NAME, ObjectEditorPaneComponent.OPTIONS)
  .name;
