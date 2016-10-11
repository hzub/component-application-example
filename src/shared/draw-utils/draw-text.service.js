import { DRAW_ACTIONS } from './draw-actions.constant.js';

const $inject = ['drawService', 'fontService'];

class DrawTextService {
  constructor(drawService, fontService) {
    Object.assign(this, {
      drawService,
      fontService,
    });

    this.drawService.subscribe(this.actionBroker.bind(this));
  }

  actionBroker(action) {
    switch (action.type) {
      case DRAW_ACTIONS.DESIGNRENDERED:
        this.restoreTexts();
        break;
      default:
        break;
    }
  }

  restoreTexts() {
    const entityList = this.drawService.getObjects();

    entityList.forEach(object => {
      switch (object.type) {
        case 'text':
          this.restoreText(object);
          break;
        default:
      }
    });
  }

  restoreText(object) {
    this.fontService.findFontByFaceName(object.fontFamily).then(font => {
      if (font) {
        this.updateFont(object, font)
      } else {
        this.updateFont(object, this.fontService.getDefaultFont());
      }
    });
  }

  updateText(entity, newText) {
    entity.set('text', newText);
    this.drawService.render();
  }

  updateColor(entity, newColor) {
    entity.set('fill', newColor);
    this.drawService.render();
  }

  updateSize(entity, size) {
    entity.setFontSize(size);
    this.drawService.render();
  }

  updateAlignment(entity, mode) {
    entity.setTextAlign(mode);
    this.drawService.render();
  }

  updateBold(entity, bold) {
    entity.setFontWeight(bold ? 'bold' : 'normal');
    this.drawService.render();
  }

  updateItalic(entity, italic) {
    entity.setFontStyle(italic ? 'italic' : 'normal');
    this.drawService.render();
  }

  updateFont(entity, font) {
    entity.fontObject = font;

    this.fontService.loadFont(font).then(() => {
      entity.setFontFamily(font.variants[0].fontface);
      this.drawService.render();
    });
  }

  resizeUniform(entity) {
    entity.fontSize = parseInt((entity.fontSize * entity.scaleX).toFixed(0), 10);
    entity.scaleX = 1;
    entity.scaleY = 1;

    this.drawService.notifyEntityUpdate(entity);
    this.drawService.render();
  }

  getAlignment(entity) {
    return entity.getTextAlign();
  }

  getText(entity) {
    return entity.getText();
  }

  getColor(entity) {
    return entity.get('fill');
  }

  getSize(entity) {
    return entity.getFontSize();
  }

  getBold(entity) {
    return entity.getFontWeight() === 'bold';
  }

  getItalic(entity) {
    return entity.getFontStyle() === 'italic';
  }
}

DrawTextService.$inject = $inject;

export default DrawTextService;
