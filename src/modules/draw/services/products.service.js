// TODO: remove mock
import mockBannerFrontUrl from '../../../assets/bannerbg_front.png';
import mockBannerBackUrl from '../../../assets/bannerbg_back.png';

const $inject = ['httpService'];

class ProductsService {
  constructor(httpService) {
    Object.assign(this, {
      httpService,
    });

    this.selectedProduct = undefined;
    this.selectedOrientation = undefined;

    // TODO: remove mock
    this.selectOrientation(this.getAvailableOrientations()[0]);
  }

  getProduct() {
    return this.httpService.get('/designer/products/1').then(products => {
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
    return [{
      "name": "Front",
      "width": 460,
      "height": 320,
      "printable_width": 405,
      "printable_height": 270,
      "printable_offset_x": 23,
      "printable_offset_y": 28,
      "workarea_width": 600,
      "workarea_height": 600,
      "background_url": mockBannerFrontUrl,
    }, {
      "name": "Back",
      "width": 430,
      "height": 300,
      "printable_width": 390,
      "printable_height": 260,
      "printable_offset_x": 10,
      "printable_offset_y": 10,
      "workarea_width": 600,
      "workarea_height": 600,
      "background_url": mockBannerBackUrl,
    }];
  }
}

ProductsService.$inject = $inject;

export default ProductsService;
