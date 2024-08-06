import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import RoutesList from './navigation/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SplashScreenNavigationProp = StackNavigationProp<RoutesList, 'Splash'>;

type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
};


const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const username = await AsyncStorage.getItem('currentUser');

      // Simulate a delay to show the splash screen (remove in production)
      setTimeout(() => {
        if (isLoggedIn === 'true' && username) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to My App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Change to your desired background color
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Change to your desired text color
  },
});

export default SplashScreen;