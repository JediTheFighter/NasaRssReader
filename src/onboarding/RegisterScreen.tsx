import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import RoutesList from '../navigation/routes';

type RegisterScreenNavigationProp = StackNavigationProp<RoutesList, 'Register'>;
type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProp;
};


const RegistrationScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = async () => {
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
  
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      try {
        const user = { username, email, password };
        await AsyncStorage.setItem(`user_${username}`, JSON.stringify(user));
        Alert.alert('Success', 'Registration successful!');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to register. Please try again.');
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
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

export default RegistrationScreen;