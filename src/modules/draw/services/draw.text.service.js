const $inject = ['drawService'];

class DrawTextService {
  constructor(drawService) {
    Object.assign(this, {
      drawService,
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
