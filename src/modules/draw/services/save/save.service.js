import _ from 'lodash';

const $inject = ['httpService', 'drawService', 'fontService', 'drawTextService'];

class SaveService {
  constructor(httpService, drawService, fontService, drawTextService) {
    Object.assign(this, {
      httpService,
      drawService,
      fontService,
      drawTextService,
    });
  }

  restoreText(object) {
    const font = this.fontService.findFontByFaceName(object.fontFamily);
    this.drawTextService.updateFont(object, font);
  }

  load() {
    const json = localStorage.getItem('sejwwd');
    const canvasObject = JSON.parse(json);

    this.drawService.getCanvas().loadFromJSON(canvasObject);

    const entityList = this.drawService.getCanvas().getObjects();

    entityList.forEach(entity => {

      this.drawService.prepareNewEntity(entity);

      switch (entity.type) {
        case 'text':
          this.restoreText(entity);
          break;
        default:
      }
    });

  }

  save() {
    const canvasObject = this.drawService.getCanvas().toJSON();
    canvasObject.objects = _.filter(canvasObject.objects, object => !object.$removeFromSave);

    const json = JSON.stringify(canvasObject);
    localStorage.setItem('sejwwd', json);
  }
}

SaveService.$inject = $inject;

export default SaveService;
