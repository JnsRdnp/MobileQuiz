import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const quizUrl = 'https://opentdb.com/api.php?amount=50&type=multiple';

const Questions = () => {
    const [questionObjects, setQuestionObjects] = useState([]);
    const [answers, setAnswers] = useState([]);
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

    const handleNextQuestion = () => {
        console.log('F: HANDLE NEXT QUESTION... \n'); // Corrected typo
        if(questionObjects.length > 0){
            setSelectedIndex(prevIndex => (prevIndex + 1) % questionObjects.length); // Cycle through questions
        }
        
      };
  

    useEffect(() => {
        console.log('F: FETCH QUESTIONS... \n');
        fetchQuestions();
      }, []);


    //TODO join answers and shuffle them after questionsFetched
    useEffect(() => {
        console.log('F: JOINING ANSWERS... \n');


        const tempAnswersArray = [];

        questionObjects.map((question,index) => {

            const tempAnswers = []

            tempAnswers.push(question.correct_answer);

            question.incorrect_answers.map((correctanswer, index) => {
                tempAnswers.push(correctanswer);
            });
            
            tempAnswersArray.push(tempAnswers)
        });

        

        setAnswers(tempAnswersArray)

        console.log('Answers useState:.... ', answers)



    }, [questionObjects]);
  



  
    return (
        <SafeAreaView>
        {questionObjects.length > 0 && (
          <View>
            <Text style={styles.question}>
              {questionObjects[selectedIndex].question}
            </Text>

            {answers[selectedIndex].map((answer => (
                <Text>{answer}</Text>
            )))}
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