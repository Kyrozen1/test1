import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import {navigation} from 'react-navigation';
import List from './List';
import * as Google from "expo-google-app-auth";
import firebase from 'firebase'

export default class SignIn extends React.Component{
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function(result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: "dark"
                })
                .then(function(snapshot) {});
            }
          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  signInWithGoogleAsync = async ()=>{
    try {
      const result = await Google.logInAsync({
        behavior:"web",
        androidClientId: "125800549648-p7lmutqhofd5jb2h8h3sue9f4k6vpfv7.apps.googleusercontent.com",
        iosClientId: "125800549648-trmppft4cu95lvqrc7u6dtrqo1qs4hi5.apps.googleusercontent.com",
        scopes:['profile', 'email'],
      });
    if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <SafeAreaView>
        <View>
          <Image source={require('../assets/Google.png')} style={styles.imageLogo}/>
        </View>
        <View>
          <TouchableOpacity style={styles.button}
            onPress={()=>this.signInWithGoogleAsync()}>
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  imageLogo:{
    width:140,
    height:140,
    marginTop:50,
  },
  button:{
    marginTop:50,
    width:200,
    height:40,
    backgroundColor:"#4086F4",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  buttonText:{
    color:'white',
    fontSize:15,
    fontWeight:'bold',
  }
})