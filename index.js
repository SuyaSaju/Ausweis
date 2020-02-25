import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppNavigationContainer from './src/AppNavigationContainer';

AppRegistry.registerComponent(appName, () => AppNavigationContainer);
