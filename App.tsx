
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import AlbumListScreen from './screens/AlbumListScreen';
import AlbumDetailsScreen from './screens/AlbumDetailsScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AlbumList">
          <Stack.Screen name="AlbumList" component={AlbumListScreen} />
          <Stack.Screen name="AlbumDetails" component={AlbumDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
