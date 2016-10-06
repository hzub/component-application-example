import { DrawPreviewComponent } from './draw-preview.component';

export const DRAW_PREVIEW = angular.module('components.draw-preview', [])
  .component(DrawPreviewComponent.NAME, DrawPreviewComponent.OPTIONS)
  .name;
