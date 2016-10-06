import {
  CORE,
  DRAW
} from 'shared';

import { TextEditorComponent } from './text-editor.component';

export const TEXT_EDITOR = angular.module('components.text-editor', [
    CORE,
    DRAW
  ])
  .component(TextEditorComponent.NAME, TextEditorComponent.OPTIONS)
  .name;
