export class ProductSelectComponent {
  static NAME = 'productSelect';
  static OPTIONS = {
    controller: ProductSelectComponent,
    template: require('./product-select.template.html'),
    bindings: {}
  }

  static $inject = ['productsService'];

  constructor(productsService) {
    Object.assign(this, {
      productsService,
    });

    this.products = [];
  }

  $onInit() {
    this.productsService.getProduct().then(productResponse => {
      this.products = productResponse.products;
    });
  }

  changeProduct() {
    this.productsService.changeProduct();
  }
}
