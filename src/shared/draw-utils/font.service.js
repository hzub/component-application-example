import _ from 'lodash';
import FontFaceObserver from 'fontfaceobserver';

const $inject = ['$q', 'HttpService', 'angularLoad', 'globalSpinnerService'];

const DEFAULT_FONT = 'Archivo Black';

class ProductsService {
  constructor($q, HttpService, angularLoad, globalSpinnerService) {
    Object.assign(this, {
      $q,
      HttpService,
      angularLoad,
      globalSpinnerService,
    });

    this.fonts = undefined;
    this.defaultFont = undefined;
    this.fontsPromise = this._getFonts();
  }

  getFonts() {
    return this.fontsPromise;
  }

  _getFonts() {
    return this.HttpService.get('/designer/fonts').then(fonts => {
      this.saveFonts(fonts);
      return this.fonts;
    });
  }

  addFontToCategory(font, category) {
    const foundCategory = _.find(this.fonts, { id: category.id });

    if (foundCategory) {
      foundCategory.fonts.push(font);
    } else {
      const newCategory = _.assign({}, category);
      newCategory.fonts = [font];
      this.fonts.push(newCategory);
    }
  }

  getDefaultFont() {
    return this.defaultFont;
  }

  saveFonts(fonts) {
    this.fonts = [];

    _.each(fonts, font => {
      if (font.name === DEFAULT_FONT) {
        this.defaultFont = font;
        this.loadFont(font);
      }

      _.each(font.categories, category => {
        this.addFontToCategory(font, category);
      });
    });
  }

  loadFont(font) {
    const promises = [];
    this.globalSpinnerService.show();
    _.each(font.variants, variant => {
      this.angularLoad.loadCSS(variant.stylesheet);
      const observer = new FontFaceObserver(variant.fontface).load();
      promises.push(observer);
      observer.then(() => {
        this.globalSpinnerService.hide();
      });
    });
    return this.$q.all(promises);
  }

}

ProductsService.$inject = $inject;

export default ProductsService;
