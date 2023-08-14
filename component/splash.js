import {View, Text} from 'react-native';
import React from 'react';
import {_getFromAsyncStorage} from './asyncStorace';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Splash = ({navigation}) => {
  setTimeout(() => {
    checkUser();
  }, 1000);

  async function checkUser() {
    const value = await _getFromAsyncStorage('user');
    const parsedValue = JSON.parse(value);
    if (!value) {
      navigation.replace('Login');
    } else {
      // console.log("the value is" ,JSON.parse(value));
      // console.log(parsedValue.user.name,parsedValue.user.photo,parsedValue.user.email )
      GoogleSignin.configure({
            scopes: ['profile', 'email'],
            webClientId: '1086813414531-3m9eiq81107g1g7mget8n2kqh0a8eum7.apps.googleusercontent.com',
            offlineAccess: false,
        });
      navigation.replace('Home', {
        name: parsedValue.user.name,
        imageUrl: parsedValue.user.photo,
        email: parsedValue.user.email,
      });
    }
  }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <Text style={{color: 'black'}}>splash</Text>
    </View>
  );
};

export default Splash;

// const LoginStack = () =>{
//     return(
//       <NavigationContainer>
//         <stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
//           <stack.Screen name='Login' component={Login} />
//           {/* <stack.Screen name='Home' component={Home} /> */}
//         </stack.Navigator>
//       </NavigationContainer>
//     )
//   }
//   export {LoginStack}

//   const HomeStack = () =>{
//     return(
//       <NavigationContainer>
//         <stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
//           {/* <stack.Screen name='Login' component={Login} /> */}
//           <stack.Screen name='Home' component={Home} />
//         </stack.Navigator>
//       </NavigationContainer>
//     )
//   }
//   export {HomeStack}
