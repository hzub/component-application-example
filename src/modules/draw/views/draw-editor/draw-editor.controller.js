import $view from './draw-editor.view.html';

const $inject = ['drawService'];

class DrawEditorController {
  constructor(drawService) {
    Object.assign(this, {
      drawService,
    });

    drawService.onSelectEntity(() => {
       // console.info("ENT SELECTED", entity);
    });
  }

  addNewText() {
    this.drawService.setState('ADDTEXT');
  }

  addTestBox() {
    this.drawService.addBox(100, 50);
  }
}

DrawEditorController.$inject = $inject;
DrawEditorController.$view = $view;

export default DrawEditorController;
