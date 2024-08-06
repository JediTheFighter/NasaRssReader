import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

type AppBarProps = {
  title: string;
  onLeftPress?: (event: GestureResponderEvent) => void;
  onRightPress?: (event: GestureResponderEvent) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarBackgroundColor?: string;
};

const AppBar: React.FC<AppBarProps> = ({ 
  title, 
  onLeftPress, 
  onRightPress, 
  leftIcon, 
  rightIcon,
  statusBarStyle = 'default',
  statusBarBackgroundColor = '#6200EE' 
}) => {
  return (
    <View>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} />
      <View style={styles.appBar}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
            {leftIcon}
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 8,
  },
});

export default AppBar;
