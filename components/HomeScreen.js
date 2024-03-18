import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useSettings } from '../context/SettingsContext';

const HomeScreen = ({ navigation }) => {
    const { difficulty } = useSettings(); // Access selectedDifficulty from the settings context
    const {players} = useSettings();


    const handleStartQuiz = () => {
    navigation.navigate('Questions', { questionAmount: 10, selectedDifficulty: difficulty, playerInt: players }); // Pass selectedDifficulty to Questions screen
    };

    const handleStartAbout = () => {
    navigation.navigate('About');
    };

    const handleStartSettings = () => {
    navigation.navigate('Settings');
    };

  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require('../assets/logo.png')} // Replace 'path/to/your/logo.png' with the actual path to your logo image
        style={styles.logo}
        resizeMode="contain" // Adjust the resizeMode as needed
      />


      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleStartQuiz}
          style={styles.startButton}
          labelStyle={styles.buttonLabel}
        >
          Start Quiz
        </Button>
      </View>
      
      

      <Button
        mode="outlined"
        onPress={handleStartAbout}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        About
      </Button>
      <IconButton
        icon='cog'
        size={24} // Adjust the size as needed
        onPress={handleStartSettings}
      />

    <Text style={styles.settingsText}>Difficulty: {difficulty}</Text>
    <Text style={styles.settingsText}>Players: {players}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    logo: {
      width: 200, // Adjust the width of the logo as needed
      height: 200, // Adjust the height of the logo as needed
      marginBottom: 20, // Adjust the margin as needed
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      marginBottom: 20,
    },
    startButton: {
      borderRadius: 8,
      width: '100%', // Adjust the width as needed
      flex: 1
    },
    button: {
      marginBottom: 20,
      borderRadius: 8,
      width: '80%',
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    settingsText: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: 'bold', // Add this line to make the text bold
      color: '#333', // Add this line to set the text color
    },
  });
  
  export default HomeScreen;
