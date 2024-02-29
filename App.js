import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import { SettingsProvider } from './context/SettingsContext';
import Questions from './components/Questions';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import SettingsScreen from './components/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SettingsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Questions" component={Questions} options={{ title: 'MobileQuiz' }} />
            <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </PaperProvider>
  );
}