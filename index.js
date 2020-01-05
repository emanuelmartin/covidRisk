import { AppRegistry } from 'react-native';
import App from './src/app';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

AppRegistry.registerComponent('hrsl', () => gestureHandlerRootHOC(App));
