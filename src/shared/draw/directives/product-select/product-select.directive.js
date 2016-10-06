import productSelectController from './product-select.controller';
import productSelectTemplate from './product-select.template.html';

class ProductSelectDirective {
  constructor() {
    this.restrict = 'EA';
    this.scope = {
    };
    this.templateUrl = productSelectTemplate;
    this.controller = productSelectController;
    this.controllerAs = 'vmProductSelect';
    this.bindToController = true;
  }

  link($scope, $element, $attrs) {
    const vm = $scope.vmProductSelect;
  }

  static get(...params) {
    return new ProductSelectDirective(...params);
  }
}

ProductSelectDirective.get.$inject = [];

export default ProductSelectDirective.get;
