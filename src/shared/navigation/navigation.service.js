import { StatefulService } from 'shared/state';

export class NavigationService extends StatefulService {
  constructor() {
    super('navigation');
  }

  getPrimaryButtons() {
    return this._state.getState('buttons').buttons;
  }

  setPrimaryButtons(buttons) {
    this._state.setState({
      buttons,
    });
  }
}
