import angular from 'angular';
import mocks from 'angular-mocks';

const context = require.context('.', true, /\.spec\.js$/);
context.keys().forEach(context);
