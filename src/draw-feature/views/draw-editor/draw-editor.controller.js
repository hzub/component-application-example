import $view from './draw-editor.view.html';
import './draw-editor.styles.less';

class DrawEditorController {
  constructor(
    $uibModal,
    $rootScope,
    drawService,
    navigationService,
    userDesignsService,
    saveService,
    SELECT_DESIGN_POPUP_OPTIONS
  ) {
    'ngInject';
    Object.assign(this, {
      $uibModal,
      $rootScope,
      drawService,
      navigationService,
      userDesignsService,
      saveService,
      SELECT_DESIGN_POPUP_OPTIONS,
    });

    this.showPreview = false;

    $rootScope.$on('draw:stateChanged', (e, params) => {
      const state = params.state;
      this.showPreview = state === 'PAN' || state === 'ZOOM';
    });

    this.navigationService.setPrimaryButtons(
      [{
        label: 'Load design',
        click: () => {
          this.$uibModal.open(this.SELECT_DESIGN_POPUP_OPTIONS).result.then(designObject => {
            this.userDesignsService.load(designObject);
          });
        }
      }]
    );
  }
}

DrawEditorController.$view = $view;

export default DrawEditorController;
