import {
  CORE,
  DRAW
} from 'shared';

import { CLIPART_SELECT } from '../clipart-select';


import { SHAPES_PANE_STATES } from './shapes-pane-states.constant';
import { AddShapeComponent } from './shapes-pane.component';

export const SHAPES_PANE = angular
  .module('components.shapes-pane', [
    CORE,
    DRAW,
    CLIPART_SELECT
  ])
  .constant('SHAPES_PANE_STATES', SHAPES_PANE_STATES)
  .component(AddShapeComponent.NAME, AddShapeComponent.OPTIONS)
  .name;
