import 'expose?$!expose?jQuery!jquery';
import 'jquery-knob/js/jquery.knob';

import 'spectrum-colorpicker';
import 'spectrum-colorpicker/spectrum.css';

import 'font-awesome/css/font-awesome.css';

import 'toastr';
import 'angular';
import 'angular-load';
import '@iamadamjowett/angular-click-outside';


import 'angular-spectrum-colorpicker';

import angularUiRouter from 'angular-ui-router';
import angularUiBootstrap from 'angular-ui-bootstrap';

import 'bootstrap/less/bootstrap.less';
import 'toastr/toastr.less';


export default [
  angularUiRouter,
  angularUiBootstrap,
  'angularLoad',
  'angularSpectrumColorpicker',
  'angular-click-outside',
];
