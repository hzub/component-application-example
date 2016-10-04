import CORE from '../../modules/core/core.module';
import DRAW from '../../modules/draw/draw.module';


import { FlipControlComponent } from './flip-control.component';
import { ObjectEditorPaneComponent } from './object-editor-pane.component';


export const OBJECT_EDITOR_PANE = angular.module('components.object-editor-pane', [
    CORE,
    DRAW
  ])
  .component(FlipControlComponent.NAME, FlipControlComponent.OPTIONS)
  .component(ObjectEditorPaneComponent.NAME, ObjectEditorPaneComponent.OPTIONS)
  .name;
