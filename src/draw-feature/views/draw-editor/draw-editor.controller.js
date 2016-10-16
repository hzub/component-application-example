import $view from './draw-editor.view.html';
import './draw-editor.styles.less';

class DrawEditorController {
  constructor(
    $uibModal,
    APP_MODES,
    AppModeService,
    navigationService,
    userDesignsService,
    SELECT_DESIGN_POPUP_OPTIONS
  ) {
    'ngInject';
    Object.assign(this, {
      $uibModal,
      APP_MODES,
      AppModeService,
      navigationService,
      userDesignsService,
      SELECT_DESIGN_POPUP_OPTIONS,
    });

    this.navigationService.setPrimaryButtons([{
        label: 'Load design',
        click: () => {
          this.$uibModal.open(this.SELECT_DESIGN_POPUP_OPTIONS).result.then(designObject => {
            this.userDesignsService.load(designObject);
          });
        }
      }]);

    this.AppModeService.subscribe(this._handleAction.bind(this));
  }

  _handleAction() {
    const state = this.AppModeService.getMode();
    this.showPreview = state === this.APP_MODES.PAN || state === this.APP_MODES.ZOOM;
  }
}

DrawEditorController.$view = $view;

export default DrawEditorController;
