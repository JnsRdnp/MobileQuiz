import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import he from 'he'; // Import the 'he' library



const Questions = ({route}) => {

  const { questionAmount } = route.params;
  const {selectedDifficulty} = route.params;
  const quizUrl = `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple&difficulty=${selectedDifficulty}`;

    const [questionObjects, setQuestionObjects] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [points, setPoints] = useState(0);

    const fetchQuestions = () => {
        fetch(quizUrl)
            .then(res => res.json())
            .then(json => {
                setQuestionObjects(json.results); 
            })
            .catch(error => {
                console.log('Error in fetch:', error);
            });
    };

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleAnswer = (ans) => {
      console.log('answer check', ans, ' -- ', questionObjects[selectedIndex].correct_answer)

        if (ans === questionObjects[selectedIndex].correct_answer) {
            
            setPoints(points + 1);
        }
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
      console.log('F: HANDLE NEXT QUESTION... \n');
      if (questionObjects.length > 0) { // Corrected condition
          setSelectedIndex(prevIndex => (prevIndex + 1) % questionObjects.length); 
      }
  };

    useEffect(() => {
        console.log('F: FETCH QUESTIONS... \n');
        fetchQuestions();
    }, []);

    useEffect(() => {
        console.log('F: JOINING ANSWERS... \n');
        const tempAnswersArray = [];

        if (questionObjects.length > 0) {
            questionObjects.forEach(question => {
                const answers = [question.correct_answer, ...question.incorrect_answers];
                tempAnswersArray.push(shuffleArray(answers));
            });
        }

        if (tempAnswersArray.length > 0) {
            setAnswers(tempAnswersArray);
        }

        console.log('Answers useState:.... ', answers);
    }, [questionObjects]);

    return (
        <SafeAreaView>
            {answers.length > 0 && questionObjects.length > 0 && (
                <View>

                    {/* tracking of question index */}
                    <Text>{selectedIndex+1}/{questionObjects.length} - {selectedDifficulty}</Text>

                    {/* print question */}
                    <Text style={styles.question}>
                        {he.decode(questionObjects[selectedIndex].question)}
                    </Text>

                    {/* print answers */}
                    {answers[selectedIndex].map((answer, index) => (
                        <Button 
                            key={index} 
                            title={he.decode(answer)}
                            onPress={() => {handleAnswer(answer)}}
                        />
                    ))}


                    {/* <Button title="Submit Answer" onPress={handleAnswer} /> */}
                    {/* <Button title="Next Question" onPress={handleNextQuestion} /> */}
                    <Text>Points: {points}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default Questions;

const styles = StyleSheet.create({
    question: {
        padding: 10,
        backgroundColor: 'lightblue',
    }
});
