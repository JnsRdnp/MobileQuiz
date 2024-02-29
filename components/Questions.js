import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import he from 'he'; // Import the 'he' library

const quizUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

const Questions = () => {
    const [questionObjects, setQuestionObjects] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
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
        if (questionObjects.length > 0) {
            setSelectedIndex(prevIndex => (prevIndex + 1) % questionObjects.length); 
        }
        setSelectedAnswer('');
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
                    <Text style={styles.question}>
                        {he.decode(questionObjects[selectedIndex].question)}
                    </Text>
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
