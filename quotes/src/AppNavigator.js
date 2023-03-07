import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Screens/Home';
import List from './Screens/List';



const AppNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
     
      <Stack.Screen
          name="Music App"
          component={List}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
