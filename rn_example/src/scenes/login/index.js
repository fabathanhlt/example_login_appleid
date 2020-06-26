import React, {useEffect, useState} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {firebase} from '@react-native-firebase/auth';

function LoginScreen({props, navigation}) {
  const [user, setUser] = useState();
  const currentNavigation = navigation;
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(newUser) {
    setUser(newUser);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  function _onSuccessLogin(value) {
    console.log('user ' + value);
    currentNavigation.navigate('MainNavigation');
  }

  function _onErrorLogin(error) {
    console.log('error ' + error);
  }

  function onClickAppleAuthentication() {
    console.log('onClickAppleAuthentication');
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={styles.buttonApple}
          onPress={() => {
            onClickAppleAuthentication();
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonApple: {
    width: 240,
    height: 48,
  },
  buttonGoogle: {
    width: 248,
    height: 56,
    marginTop: 10,
  },
});

export default LoginScreen;
