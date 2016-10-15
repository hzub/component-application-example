import { BackgroundEditorPaneComponent } from './background-editor-pane.component';

export const BACKGROUND_EDITOR_PANE = angular.module('components.background-editor-pane', [])
  .component(BackgroundEditorPaneComponent.NAME, BackgroundEditorPaneComponent.OPTIONS)
  .name;
