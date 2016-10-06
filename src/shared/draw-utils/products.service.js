// TODO: remove mock
import mockBannerFrontUrl from 'assets/white-bg.png';
import mockBannerBackUrl from 'assets/white-bg.png';

const $inject = ['HttpService'];

class ProductsService {
  constructor(HttpService) {
    Object.assign(this, {
      HttpService,
    });

    this.selectedProduct = undefined;
    this.selectedOrientation = undefined;

    // TODO: remove mock
    this.selectOrientation(this.getAvailableOrientations()[0]);
  }

  getProduct() {
    return this.HttpService.get('/designer/products/1').then(products => {
      // TODO: remove mock
      this.selectedProducts = products;
      return products;
    });
  }

  changeProduct() {
    if (this.onProductChange.callbacks) {
      this.onProductChange.callbacks.forEach(cb => cb.call(this, this.selectedProduct));
    }
  }

  onProductChange(cb) {
    if (!this.onProductChange.callbacks) {
      this.onProductChange.callbacks = [cb];
    } else {
      this.onProductChange.callbacks.push(cb);
    }
  }

  selectOrientation(orientation) {
    this.selectedOrientation = orientation;

    if (this.onOrientationChange.callbacks) {
      this.onOrientationChange.callbacks.forEach(cb => cb.call(this, orientation));
    }
  }

  onOrientationChange(cb) {
    if (!this.onOrientationChange.callbacks) {
      this.onOrientationChange.callbacks = [cb];
    } else {
      this.onOrientationChange.callbacks.push(cb);
    }
  }

  getSelectedOrientation() {
    return this.selectedOrientation;
  }

  getAvailableOrientations() {
    // TODO: remove mock
    return [
      {
        name: 'Front',
        width: 600,
        height: 500,
        printable_width: 550,
        printable_height: 450,
        printable_offset_x: 25,
        printable_offset_y: 25,
        background_url: mockBannerFrontUrl,
      }, {
        name: 'Back',
        width: 500,
        height: 400,
        printable_width: 450,
        printable_height: 350,
        printable_offset_x: 25,
        printable_offset_y: 25,
        background_url: mockBannerBackUrl,
      }
    ];
  }
}

ProductsService.$inject = $inject;

export default ProductsService;
