require('es6-symbol/implement');
global.STORYBOOK_REACT_CLASSES = {};

import {AppRegistry} from 'react-native';
import {configure, getStorybookUI} from '@storybook/react-native';

import '../add-decorators';


// import stories
configure(() => {
    require('../../stories/index');
}, module);

const StorybookUI = getStorybookUI({port: 7007, host: 'localhostooo'});
AppRegistry.registerComponent('smartulaMobile', () => StorybookUI);