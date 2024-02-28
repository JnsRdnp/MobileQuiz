import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Questions from './components/Questions';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [questions,setQuestions] = useState([])

  return (
    <SafeAreaView style={styles.container}>
      <Questions/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
