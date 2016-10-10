import { State } from './state';

describe('State', () => {

  /** @type {State} */
  let stateFoo;
  /** @type {State} */
  let stateFooBar;
  /** @type {State} */
  let stateFooBarBaz;
  /** @type {State} */
  let stateFooQuix;


  beforeEach(() => {
    stateFoo = new State('foo');
    stateFooBar = new State('foo.bar');
    stateFooBarBaz = new State('foo.bar.baz');
    stateFooQuix = new State('foo.quix');
  });


  describe('getState() / setState()', () => {
    it(`should get / set the state accordingly to state's path`, () => {
      const fooBarNewState = {
        baz: 'bazValue',
        barProp: 'fooBar.prop value'
      };

      stateFooBar.setState(fooBarNewState);

      expect(stateFoo.getState()).toEqual({
        bar: fooBarNewState,
        quix: null
      });
      expect(stateFooBar.getState()).toEqual(fooBarNewState);
      expect(stateFooBarBaz.getState()).toEqual(fooBarNewState.baz)
    });

    it('should publish STATE_CHANGED action if the state was changed', () => {
      const newFooBarState = {
        baz: 'new foo.bar.baz value'
      };


      const fooSubscriber = jasmine.createSpy('fooSubscriber');
      const fooBarSubscriber = jasmine.createSpy('fooBarSubscriber');
      const fooBarBazSubscriber = jasmine.createSpy('fooBarBazSubscriber');
      const fooQuixSubscriber = jasmine.createSpy('fooQuixSubscriber');

      const unsub = [
        stateFoo.subscribe(fooSubscriber),
        stateFooBar.subscribe(fooBarSubscriber),
        stateFooBarBaz.subscribe(fooBarBazSubscriber),
        stateFooQuix.subscribe(fooQuixSubscriber)
      ];


      stateFooBar.setState(newFooBarState);

      expect(fooSubscriber).toHaveBeenCalled();
      expect(fooBarSubscriber).toHaveBeenCalled();

      // foo.quix is not changed
      expect(fooQuixSubscriber).not.toHaveBeenCalled();
      // but foo is changed, because foo.bar is changed
      expect(fooBarBazSubscriber).toHaveBeenCalled();


      const newFooState = {
        prop: 'new foo.prop value',
        quix: 'new foo.quix state value'
      };

      stateFoo.setState(newFooState);

      expect(fooSubscriber).toHaveBeenCalledWith({
        type: 'STATE_CHANGED'
      });
      expect(fooBarSubscriber).toHaveBeenCalled();
      expect(fooBarBazSubscriber).toHaveBeenCalled();
      expect(fooQuixSubscriber).toHaveBeenCalled();

      unsub.forEach(f => f());
    });

  });

});
