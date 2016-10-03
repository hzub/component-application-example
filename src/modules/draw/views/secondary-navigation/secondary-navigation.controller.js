import $view from './secondary-navigation.partial.html';


class SecondaryNavigationController {

  static $inject = [
    'DRAW_STATES',
    'drawService'
  ];

  static $view = $view;

  constructor(DRAW_STATES, drawService) {
    Object.assign(this, {
      DRAW_STATES,
      drawService,
    });
  }

  addText() {
    this.drawService.setState(this.DRAW_STATES.ADDTEXT);
  }

  selectProduct() {
    this.drawService.selectEntity(null);
    this.drawService.setState(this.DRAW_STATES.SELECTPRODUCT);
  }

  addShape() {
    this.drawService.setState(this.DRAW_STATES.ADDSHAPE)
  }

  addTestBox() {
    this.drawService.addBox(100, 50);
  }

}


export default SecondaryNavigationController;
