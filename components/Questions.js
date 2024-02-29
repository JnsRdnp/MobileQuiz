import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import he from 'he';

const Questions = ({ route }) => {
    const theme = useTheme();

    const { questionAmount } = route.params;
    const { selectedDifficulty } = route.params;
    const quizUrl = `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple&difficulty=${selectedDifficulty}`;

    const [questionObjects, setQuestionObjects] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(quizUrl);
            const json = await response.json();
            setQuestionObjects(json.results);
        } catch (error) {
            console.log('Error in fetch:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        const tempAnswersArray = [];
        if (questionObjects.length > 0) {
            questionObjects.forEach(question => {
                const answers = [question.correct_answer, ...question.incorrect_answers];
                tempAnswersArray.push(shuffleArray(answers));
            });
            setAnswers(tempAnswersArray);
        }
    }, [questionObjects]);

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleAnswer = (ans, index) => {
        if (ans === questionObjects[selectedIndex].correct_answer) {
            setPoints(points + 1);
            setCorrectAnswerIndex(index); // Set correct answer index
            setTimeout(() => {
                setCorrectAnswerIndex(null); // Reset correct answer index after delay
                handleNextQuestion();
            }, 1000); // Duration in milliseconds
        } else {
            // Handle wrong answer
        }
    };

    const handleNextQuestion = () => {
        setSelectedIndex(prevIndex => (prevIndex + 1) % questionObjects.length);
    };

    return (
        <SafeAreaView style={styles.container}>
            {answers.length > 0 && questionObjects.length > 0 && (
                <View style={styles.innerContainer}>
                    <Text style={styles.questionCounter}>{selectedIndex + 1}/{questionObjects.length} - {selectedDifficulty}</Text>
                    <Text style={styles.questionText}>{he.decode(questionObjects[selectedIndex].question)}</Text>
                    {answers[selectedIndex].map((answer, index) => (
                        <Button
                            key={index}
                            mode="outlined"
                            style={[styles.answerButton, index === correctAnswerIndex ? styles.correctAnswerButton : null]}
                            onPress={() => handleAnswer(answer, index)}
                        >
                            {he.decode(answer)}
                        </Button>
                    ))}
                    <Text style={styles.pointsText}>Points: {points}</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    questionCounter: {
        fontSize: 16,
        marginBottom: 10,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    answerButton: {
        width: '100%',
        marginVertical: 5,
    },
    correctAnswerButton: {
        backgroundColor: 'green', // Change to desired color
    },
    pointsText: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default Questions;
