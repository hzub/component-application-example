import { PRIMARY_NAV } from 'components';

import './styles/styles';

// import './partials/primary-nav.html';
import './partials/secondary-nav.html';
import './partials/footer.html';

import sideNavigation from './directives/sideNavigation';

const moduleName = 'designerApp.layouts.default';

angular.module(moduleName, [PRIMARY_NAV])
  .directive('sideNavigation', sideNavigation)
;

export default moduleName;
