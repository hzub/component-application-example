/*
* This is the temporary dirty solution based on the open source angular-knob lib
* TODO: We need to improve this one or replace it with more sophisticated open source plugin
* */

class KnobDirective {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.restrict = 'E';
    this.template = `<input ng-model="knobData" type="number" max="360" ng-change="onChange()"/>`;
    this.scope = {
      knobData: '=',
      knobOptions: '='
    };
  }

  link($scope, $element) {
    const knobInit = $scope.knobOptions || {};
    const release = knobInit.release || angular.noop;
    var _value;
    knobInit.release = (newValue) => {
      _apply.call(this, newValue);
    };

    $scope.onChange = () => {
      _apply.call(this, this.knobData);
    }

    $scope.$watch('knobData', function(newValue, oldValue) {
      if (newValue != oldValue && newValue != _value) {
        $($element).val(newValue).change();
      }
    });

    $($element).val($scope.knobData).knob(knobInit);


    function _apply(newValue) {
      this.$timeout(function() {
        $scope.knobData = newValue;
        _value = newValue;
        release(newValue);
      });
    }
  }

  static get(...params) {
    return new KnobDirective(...params);
  }
}

KnobDirective.get.$inject = ['$timeout'];

export default KnobDirective.get;
