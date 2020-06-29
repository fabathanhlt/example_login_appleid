import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const HomeScreen = ({prop, route}) => {
  const {userName} = route.params;
  return (
    <View style={styles.container}>
      <Text>Hello {userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
