/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Image, SafeAreaView} from 'react-native';
import AssetImage from '../../assets/images';
const SplashScreen = ({props, navigation}) => {
  const currentNavigation = navigation;
  useEffect(() => {
    setTimeout(() => {
      currentNavigation.push('LoginScreen');
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={AssetImage.fabaLogo} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 160,
    height: 75,
  },
});

export default SplashScreen;
