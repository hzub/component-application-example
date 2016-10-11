export class StackSelectorService {
  constructor() {
    this.listeners = [];

    this.hide();
  }

  onChange(cb) {
    this.listeners.push(cb);
  }

  show(x, y) {
    this.shown = true;
    this.x = x;
    this.y = y;

    this.listeners.forEach(cb => cb.call(this, this.shown, this.x, this.y));
  }

  hide() {
    if (!this.shown) { // avoid unnecessary firing of listeners
      return false;
    }
    this.shown = false;
    this.listeners.forEach(cb => cb.call(this, this.shown, this.x, this.y));
    return true;
  }
}
