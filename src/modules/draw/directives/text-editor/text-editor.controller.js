import _ from 'lodash';

const $inject = ['$rootScope', '$element', 'fontService', 'drawService', 'drawTextService'];

const STATES = {
  DEFAULT: 'DEFAULT',
  FONT: 'FONT',
};

class TextEditorController {
  constructor($rootScope, $element, fontService, drawService, drawTextService) {
    Object.assign(this, {
      $rootScope,
      $element,
      fontService,
      drawService,
      drawTextService,
    });

    this.textValue = '';
    this.selectedEntity = null;
    this.colorValue = 'red';

    this.state = STATES.DEFAULT;

    this.drawService.onSelectEntity(this.entitySelected.bind(this));

    this.fontService.getFonts().then(fonts => {
      this.fonts = fonts;
    });

    this.$rootScope.$on('draw:entityUpdated', (e, params) => {
      if (this.selectedEntity && params.entity.id === this.selectedEntity.id) {
        this.selectedEntity = params.entity;
        this.restoreModel();
      }
    });
  }

  saveFont() {
    this.state = STATES.DEFAULT;
  }

  selectFont() {
    this.state = STATES.FONT;
  }

  changeFont(font) {
    if (this.selectedEntity) {
      this.fontValue = font;
      this.drawTextService.updateFont(this.selectedEntity, font);
    }
  }

  updateText() {
    if (this.selectedEntity) {
      this.drawTextService.updateText(this.selectedEntity, this.textValue);
    }
  }

  updateColor() {
    if (this.selectedEntity) {
      this.drawTextService.updateColor(this.selectedEntity, this.colorValue);
    }
  }

  updateSize() {
    if (this.selectedEntity) {
      this.drawTextService.updateSize(this.selectedEntity, this.sizeValue);
    }
  }

  updateAlignment(mode) {
    if (this.selectedEntity) {
      this.alignmentValue = mode;
      this.drawTextService.updateAlignment(this.selectedEntity, this.alignmentValue);
    }
  }

  toggleBold() {
    if (this.selectedEntity) {
      this.boldValue = !this.boldValue;
      this.drawTextService.updateBold(this.selectedEntity, this.boldValue);
    }
  }

  toggleItalic() {
    if (this.selectedEntity) {
      this.italicValue = !this.italicValue;
      this.drawTextService.updateItalic(this.selectedEntity, this.italicValue);
    }
  }

  centerVertically() {
    if (this.selectedEntity) {
      this.drawService.centerEntityVertically(this.selectedEntity);
    }
  }

  centerHorizontally() {
    if (this.selectedEntity) {
      this.drawService.centerEntityHorizontally(this.selectedEntity);
    }
  }

  focusInputBox() {
    setTimeout(() => {
      this.$element[0].querySelector('.js-main-input').focus();
    });
  }

  restoreModel() {
    this.textValue = this.drawTextService.getText(this.selectedEntity);
    this.colorValue = this.drawTextService.getColor(this.selectedEntity);
    this.sizeValue = this.drawTextService.getSize(this.selectedEntity);
    this.alignmentValue = this.drawTextService.getAlignment(this.selectedEntity);
    this.boldValue = this.drawTextService.getBold(this.selectedEntity);
    this.italicValue = this.drawTextService.getItalic(this.selectedEntity);
    this.fontValue = this.selectedEntity.fontObject;
    this.fontCategory = _.find(this.fonts, { id: this.fontValue.categories[0].id });
  }

  entitySelected(entity, previousEntity) {
    if (previousEntity && previousEntity === this.selectedEntity) {
      if (this.selectedEntity.type === 'text' && !this.selectedEntity.text) {
        this.drawService.deleteEntity(this.selectedEntity);
      }
    }

    if (entity && entity.type === 'text') {
      this.selectedEntity = entity;
      this.restoreModel();
      this.focusInputBox();
    } else {
      this.selectedEntity = null;
    }
  }

}

TextEditorController.$inject = $inject;

export default TextEditorController;
