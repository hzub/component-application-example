import drawEditorView from './views/draw-editor/draw-editor.controller.js';
import secondaryNavigationView from './views/secondary-navigation/secondary-navigation.controller';
import orientationSelectView from './views/orientation-select/orientation-select.controller';

function RoutingConfiguration($stateProvider) {
  $stateProvider
    .state('draw', {
      url: '/draw',
      abstract: true,
      parent: 'default',
      views: {
        leftSidebar: {
          template: '<left-draw-sidebar></left-draw-sidebar>',
        },
        secondaryNavigation: {
          templateUrl: secondaryNavigationView.$view,
          controller: secondaryNavigationView,
          controllerAs: 'vmNavigation',
        },
        bottomBar: {
          templateUrl: orientationSelectView.$view,
          controller: orientationSelectView,
          controllerAs: 'vmOrientationSelect',
        },
        '': {
          template: '<ui-view></ui-view>',
        },
      },
    })
    .state('draw.editor', {
      url: '',
      controllerAs: 'vmDraw',
      controller: drawEditorView,
      templateUrl: drawEditorView.$view,
    })
  ;
}

RoutingConfiguration.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
];

export default RoutingConfiguration;
