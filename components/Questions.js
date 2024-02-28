import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const quizUrl = 'https://opentdb.com/api.php?amount=5&type=multiple';

const Questions = () => {
    const [questionObjects, setQuestionObjects] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const fetchQuestions = () => {
      fetch(quizUrl)
        .then(res => res.json())
        .then(json => {
          setQuestionObjects(json.results); // Save all question objects
        })
        .catch(error => {
          console.log('Error in fetch:', error);
        });
    };
  
    useEffect(() => {
      fetchQuestions();
    }, []);
  
    const handleNextQuestion = () => {
      setSelectedIndex(prevIndex => (prevIndex + 1) % questionObjects.length); // Cycle through questions
    };
  
    return (
      <SafeAreaView>
        {questionObjects.length > 0 && (
          <View>
            <Text style={styles.question}>{questionObjects[selectedIndex].question}</Text>
            <Text>Correct Answer: {questionObjects[selectedIndex].correct_answer}</Text>
            <Text>Incorrect Answers: {questionObjects[selectedIndex].incorrect_answers.join(', ')}</Text>
            <Button title="Next Question" onPress={handleNextQuestion} />
          </View>
        )}
      </SafeAreaView>
    );
        }
export default Questions;

const styles = StyleSheet.create({
// Your styles here
  question: {
    padding: 10,
    backgroundColor: 'lightblue',

    // alignSelf:'center'
  }
});