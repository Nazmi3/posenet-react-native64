import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';



import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import InitialScreen from './app/screens/InitialsScreen';
import CameraScreen from './app/screens/CameraScreen';

const Stack = createStackNavigator();

const App = () => {
  return <NavigationContainer /* ref={navigationRef} */ independent={true} screenOptions={{ headerShown: false }}>
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
};



export default App;