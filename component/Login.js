import {View, StyleSheet, Button, Image} from 'react-native';
import {React} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {_storeIntoAsyncStorage} from './asyncStorace';

const Login = ({navigation}) => {
  const signIn = async () => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId:
        '1086813414531-3m9eiq81107g1g7mget8n2kqh0a8eum7.apps.googleusercontent.com',
      offlineAccess: false,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredentials);
      console.log('userInfo ', userInfo);
      console.log('SignIn successful for ', userInfo.user.email);

      _storeIntoAsyncStorage('user', JSON.stringify(userInfo)); // storing data in to async sotrage

      navigation.replace('Home', {
        name: userInfo.user.name,
        imageUrl: userInfo.user.photo,
        email: userInfo.user.email,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play services not available or outdated');
      } else {
        console.log('Google Sign In Error: Unknown error');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../src/assets/google.png')}
        style={{height: 40, width: 40}}
      />
      <View style={{flex: 1, padding: 10}}>
        <Button title="Signin with Google" onPress={signIn} />
      </View>
    </View>
  );
};
// };

export default Login;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
});
