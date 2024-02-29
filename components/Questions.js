import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import he from 'he';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Questions = ({ route }) => {
    const theme = useTheme();

    const { questionAmount } = route.params;
    const { selectedDifficulty } = route.params;
    const quizUrl = `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple&difficulty=${selectedDifficulty}`;

    const [questionObjects, setQuestionObjects] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [wrongAnswers, setWrongAnswers] = useState([]);

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

    const handleAnswer = (ans, index) => {
        if (ans === questionObjects[selectedIndex].correct_answer) {
            setPoints(points + 1);
            handleNextQuestion();
        } else {
            setWrongAnswers(prevState => [...prevState, selectedIndex]);
        }
        setSelectedAnswerIndex(index);
    };

    const handleNextQuestion = () => {
        if (questionObjects.length > 0) {
            setSelectedIndex(prevIndex => (prevIndex + 1) % questionObjects.length);
            setSelectedAnswerIndex(null); // Reset selected answer
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
        }
        if (tempAnswersArray.length > 0) {
            setAnswers(tempAnswersArray);
        }
    }, [questionObjects]);

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
                            // style={[
                            //     styles.answerButton,
                            //     selectedAnswerIndex === index && answer !== questionObjects[selectedIndex].correct_answer && styles.wrongAnswerButton,
                            //     wrongAnswers.includes(selectedIndex) && index === questionObjects[selectedIndex].incorrect_answers.indexOf(answer) && styles.wrongAnswerButton
                            // ]}
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
}

export default Questions;

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
    wrongAnswerButton: {
        backgroundColor: 'red',
    },
    pointsText: {
        fontSize: 16,
        marginTop: 20,
    },
});
