import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Navbar} from '../../modules';

const AIScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <Navbar />
      <Text>AI Screen</Text>
    </View>
  );
};
export default AIScreen;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.9,
    backgroundColor: '#09090b',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
