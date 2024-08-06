import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import RoutesList from '../navigation/routes';

type LoginScreenNavigationProp = StackNavigationProp<RoutesList, 'Login'>;
type LoginScreenProps = {
    navigation: LoginScreenNavigationProp;
};


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const userData = await AsyncStorage.getItem(`user_${username}`);
      if (userData) {
        const user = JSON.parse(userData);
        if (user.password === password) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('currentUser', username);
          navigation.replace('Home');
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '100%',
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
  });

export default LoginScreen;