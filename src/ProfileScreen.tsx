import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import RoutesList from './navigation/routes';
import Icon from 'react-native-vector-icons/AntDesign';

type ProfileScreenNavigationProp = StackNavigationProp<RoutesList, 'Profile'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

interface UserData {
    username: string;
    email: string;
    fullName: string;
    bio?: string;
}

const ProfileScreen:React.FC<Props>  = ({ navigation }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        fetchUserData();
      }, []);
    
      const fetchUserData = async () => {
        try {
          const username = await AsyncStorage.getItem('currentUser');
          if (username) {
            const userDataString = await AsyncStorage.getItem(`user_${username}`);
            if (userDataString) {
              setUserData(JSON.parse(userDataString));
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('currentUser');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    
      if (!userData) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
      }
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Text>Username: {userData.username}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Full Name: {userData.fullName}</Text>
          <Text>Bio: {userData.bio || 'Not provided'}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      );
}

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
});

export default ProfileScreen;