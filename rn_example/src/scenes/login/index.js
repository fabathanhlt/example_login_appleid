import React, {useEffect, useState} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import auth, {firebase} from '@react-native-firebase/auth';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

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
  function onClickAppleAuthentication() {
    //Call request authorize to Apple
    appleAuth
      .performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      })
      .then(appleAuthRequestResponse => {
        if (!appleAuthRequestResponse.identityToken) {
          throw 'Apple Sign-In failed - no identify token returned';
        }
        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );
        //Call request authorize to Firebase server
        auth()
          .signInWithCredential(appleCredential)
          .then(userCredential => {
            console.log('Apple login successful');
            goToHomeScreen(userCredential.user.email);
            //Do something here
          })
          .catch(error => {
            console.log('Error ' + JSON.stringify(error));
          });
      })
      .catch(error => {
        console.log('Error ' + JSON.stringify(error));
      });
  }

  function goToHomeScreen(userName) {
    navigation.navigate('HomeScreen', {
      userName: userName,
    });
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
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
