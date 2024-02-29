import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, TouchableRipple, Text } from 'react-native-paper';
import { useSettings } from '../context/SettingsContext';

const SettingsScreen = () => {
  const { players, setPlayers, difficulty, setDifficulty, howManyQuestions, setHowManyQuestions} = useSettings();

  const increasePlayers = () => {
    if (players < 4) {
      setPlayers(players + 1);
    }
  };

  const decreasePlayers = () => {
    if (players > 1) {
      setPlayers(players - 1);
    }
  };

  const setDifficultyLevel = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const isDifficultySelected = (selectedDifficulty) => {
    return difficulty === selectedDifficulty;
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title={`Players: ${players}`}
          right={() => (
            <View style={styles.buttonGroup}>
              <TouchableRipple onPress={decreasePlayers} disabled={players <= 1}>
                <Text style={[styles.button, styles.text]}>-</Text>
              </TouchableRipple>
              <TouchableRipple onPress={increasePlayers} disabled={players >= 4}>
                <Text style={[styles.button, styles.text]}>+</Text>
              </TouchableRipple>
            </View>
          )}
        />
        <List.Item
          title="Difficulty"
          style={styles.difficultyTitle}
        />
        <TouchableRipple onPress={() => setDifficultyLevel('easy')} disabled={isDifficultySelected('easy')}>
          <List.Item
            title="Easy"
            style={[styles.difficultyItem, isDifficultySelected('easy') && styles.selectedDifficulty]}
          />
        </TouchableRipple>
        <TouchableRipple onPress={() => setDifficultyLevel('medium')} disabled={isDifficultySelected('medium')}>
          <List.Item
            title="Medium"
            style={[styles.difficultyItem, isDifficultySelected('medium') && styles.selectedDifficulty]}
          />
        </TouchableRipple>
        <TouchableRipple onPress={() => setDifficultyLevel('hard')} disabled={isDifficultySelected('hard')}>
          <List.Item
            title="Hard"
            style={[styles.difficultyItem, isDifficultySelected('hard') && styles.selectedDifficulty]}
          />
        </TouchableRipple>
        <TouchableRipple onPress={() => setDifficultyLevel('any')} disabled={isDifficultySelected('any')}>
          <List.Item
            title="Any"
            style={[styles.difficultyItem, isDifficultySelected('any') && styles.selectedDifficulty]}
          />
        </TouchableRipple>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#dddddd',
    marginHorizontal: 8,
  },
  text: {
    color: '#333333',
    fontFamily: 'Arial', // Change to your preferred font family
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  difficultyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff', // Change color as needed
  },
  difficultyItem: {
    marginVertical: 4,
  },
  selectedDifficulty: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 20,
    backgroundColor: 'transparent',
    color: '#007bff', // Change color as needed
  },
});

export default SettingsScreen;
