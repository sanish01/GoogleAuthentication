import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React from 'react'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({route, navigation}) => {
    const {name, imageUrl, email } = route.params;
    console.log(name,imageUrl,email);

    const handleLogout = async () =>{
        try{
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem('user');
            navigation.replace('Login');
            console.log("logged out Success");
        }
        catch(error){
            console.log("Error during Logout ", error)
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {email}!</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.nameText}>Hello, {name}!</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    nameText: {
      fontSize: 18,
      color: '#555',
    },
  });