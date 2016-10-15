import $view from './draw-editor.view.html';
import './draw-editor.styles.less';

const $inject = ['APP_MODES', 'AppModeService'];

class DrawEditorController {
  constructor(APP_MODES, AppModeService) {
    Object.assign(this, {
      APP_MODES,
      AppModeService,
    });

    AppModeService.subscribe(this._handleAction.bind(this));
  }

  _handleAction() {
    const state = this.AppModeService.getMode();
    this.showPreview = state === this.APP_MODES.PAN || state === this.APP_MODES.ZOOM;
  }
}

DrawEditorController.$inject = $inject;
DrawEditorController.$view = $view;

export default DrawEditorController;
