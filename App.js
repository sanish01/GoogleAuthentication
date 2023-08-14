import { View, Text } from 'react-native'
import React from 'react'
import Login from './component/Login'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './component/Home'
import Splash from './component/splash'

const stack= createNativeStackNavigator();

const App = () => {

 
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
        <stack.Screen name='Splash' component={Splash} />
        <stack.Screen name='Login' component={Login} />
        <stack.Screen name='Home' component={Home} />
      </stack.Navigator>
    </NavigationContainer>

  )
}

export default App

