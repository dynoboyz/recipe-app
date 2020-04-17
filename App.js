import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Root } from "native-base";
import RootNavigation from './app/navigation/RootNavigation';

export default class App extends React.Component {
  render() {
    return (
      <Root>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' && <StatusBar barStyle="default" />}
        <RootNavigation />
      </Root>
    );
  }
}
