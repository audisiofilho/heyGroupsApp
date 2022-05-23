import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

export default function heyGroupsApp() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}