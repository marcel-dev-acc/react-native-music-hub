
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { Player } from './src/screens';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.appContainer}>
      <Player />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,20,40)',
  },
});

export default App;
