import {
  CORE,
  DRAW_UTILS
} from 'shared';

import { TextEditorComponent } from './text-editor.component';

export const TEXT_EDITOR = angular.module('components.text-editor', [
    CORE,
    DRAW_UTILS
  ])
  .component(TextEditorComponent.NAME, TextEditorComponent.OPTIONS)
  .name;
