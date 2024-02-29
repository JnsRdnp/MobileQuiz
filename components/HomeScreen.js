import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleStartQuiz = () => {
    // Pass an integer questionAmount prop to the Questions screen
    navigation.navigate('Questions', { questionAmount: 10, selectedDifficulty: 'easy' }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Start Quiz" onPress={handleStartQuiz} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;