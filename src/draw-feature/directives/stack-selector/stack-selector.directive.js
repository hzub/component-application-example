import $ from 'jquery';
import $templateUrl from './stack-selector.template.html';
import './stack-selector.styles.less';

const $inject = [
  '$compile',
  '$templateCache',
  '$rootScope',
  'stackSelectorService',
  'drawService',
];

class StackSelectorDirective {
  constructor(
    $compile,
    $templateCache,
    $rootScope,
    stackSelectorService,
    drawService
  ) {
    Object.assign(this, {
      $compile,
      $templateCache,
      $rootScope,
      stackSelectorService,
      drawService,
    });

    this.viewScope = this.$rootScope.$new();

    Object.assign(this.viewScope, {
      setStackPosition: this.setStackPosition.bind(this),
    });
  }

  setStackPosition(command) {
    this.drawService.setStackPosition(command);
    this.stackSelectorService.hide();
  }

  static get(...args) {
    return new StackSelectorDirective(...args);
  }

  link() {
    const template = this.$templateCache.get($templateUrl);

    const compiledTemplate = this.$compile(template)(this.viewScope);

    $('body').append(compiledTemplate);

    this.stackSelectorService.onChange((state, x, y) => {
      this.viewScope.shown = state;
      const popupElement = $('#layer-choice');
      popupElement.css('left', `${x}px`);
      popupElement.css('top', `${y}px`);
    });
  }
}

StackSelectorDirective.get.$inject = $inject;

export default StackSelectorDirective.get;
