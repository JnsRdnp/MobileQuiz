import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MobileQuiz!</Text>
      <Text style={styles.description}>
        MobileQuiz is a party game inspired by the Smart10 board game. Gather your friends or form teams, each color-coded for easy identification, and dive into a world of endless fun!
      </Text>
      <Text style={styles.subTitle}>How to Play:</Text>
      <Text style={styles.text}>
        In each round, players face intriguing questions. Answer correctly to earn points and advance swiftly to the next challenge. If you stumble, don't worry! The same question passes to the next team, giving them a chance to score.
      </Text>
      <Text style={styles.subTitle}>Customize Your Experience:</Text>
      <Text style={styles.text}>
        Personalize your game settings and adjustments from the settings page, accessible right from the start screen. Tailor the game to your preferences and embark on an unforgettable gaming adventure!
      </Text>

      <Text style={styles.subTitle}>API</Text>
      <Text style={styles.text}>
        The api used for the questions is "OPEN TRIVIA DATABASE". https://opentdb.com/
      </Text>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AboutScreen;
