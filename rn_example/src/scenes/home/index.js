import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const HomeScreen = ({props}) => {
  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
