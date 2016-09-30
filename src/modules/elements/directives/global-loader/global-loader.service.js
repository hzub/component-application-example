import './global-loader.styles.less';

class GlobalLoaderService {
  constructor() {
    const spinner = document.createElement('DIV');

    const spinnerPart1 = document.createElement('DIV');
    const spinnerPart2 = document.createElement('DIV');

    spinner.classList.add('global-loader');
    spinnerPart1.classList.add('global-loader__bar-1');
    spinnerPart2.classList.add('global-loader__bar-2');

    spinner.appendChild(spinnerPart1);
    spinner.appendChild(spinnerPart2);

    document.body.appendChild(spinner);

    this.element = spinner;
  }

  show() {
    this.element.classList.add('isShown');
  }

  hide() {
    this.element.classList.remove('isShown');
  }
}

export default GlobalLoaderService;
