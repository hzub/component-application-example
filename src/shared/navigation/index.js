import { NavigationService } from './navigation.service';

export const NAVIGATION = angular.module('designerApp.shared.navigation', [])
  .service('navigationService', NavigationService)
  .name;
