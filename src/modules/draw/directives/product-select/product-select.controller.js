const $inject = ['productsService'];

class ProductSelectController {
  constructor(productsService) {
    Object.assign(this, {
      productsService,
    });

    this.products = [];
    this.init();
  }

  init() {
    this.productsService.getProduct().then(productResponse => {
      this.products = productResponse.products;
    });
  }

  changeProduct() {
    this.productsService.changeProduct();
  }
}

ProductSelectController.$inject = $inject;

export default ProductSelectController;

