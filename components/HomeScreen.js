import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const handleStartQuiz = () => {
    navigation.navigate('Questions', { questionAmount: 10, selectedDifficulty: 'easy' }); 
  };

  const handleStartAbout = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        mode="contained"
        onPress={handleStartQuiz}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Start Quiz
      </Button>
      <Button
        mode="outlined"
        onPress={handleStartAbout}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        About
      </Button>
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
  button: {
    marginBottom: 20,
    borderRadius: 8,
    width: '80%'
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
