import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

export default function heyGroupsApp() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#179bd7"/>
      <Routes />
    </NavigationContainer>
  );
}
