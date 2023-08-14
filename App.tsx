/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {CollapseCard} from './CollapseCard';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <CollapseCard />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
