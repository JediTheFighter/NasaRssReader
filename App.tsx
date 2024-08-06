import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen.tsx';
import LoginScreen from './src/onboarding/LoginScreen';
import RegisterScreen from './src/onboarding/RegisterScreen';
import ProfileScreen from './src/ProfileScreen';
import { TouchableOpacity } from 'react-native/Libraries/Components/Touchable/TouchableOpacity';
import Icon from 'react-native-vector-icons/AntDesign';
import RoutesList from './src/navigation/routes';
import SplashScreen from './src/SplashScreen';
import DetailScreen from './src/DetailScreen';


const Stack = createStackNavigator<RoutesList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
                <Icon name="person-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;