import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Title, Paragraph, useTheme } from 'react-native-paper';
import he from 'he';

const Questions = ({ route }) => {
    const theme = useTheme();

    const { questionAmount } = route.params;
    const { selectedDifficulty } = route.params;

    if (selectedDifficulty==='any'){
      var urlSelectedDiff = ''
    } else {
      var urlSelectedDiff = selectedDifficulty
    }

    const { playerInt } = route.params;

    const createPlayerArray = (playerInt) => {
        const [players, setPlayers] = useState(Array.from({ length: playerInt }, () => 0));

        return [players, setPlayers];
    };

    // Usage
    const [players, setPlayers] = createPlayerArray(playerInt);
    const [playerTurnIndex, setPlayerTurnIndex] = useState(0);

    const handlePlayerTurnIndex = () => {
        if (playerTurnIndex >= (playerInt - 1)) {
            setPlayerTurnIndex(0);
        } else {
            setPlayerTurnIndex(playerTurnIndex + 1);
        }
    }

    const quizUrl = `https://opentdb.com/api.php?amount=50&type=multiple&difficulty=${urlSelectedDiff}`;

    const [questionObjects, setQuestionObjects] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [wrongAnswerIndex, setWrongAnswerIndex] = useState(null); // Track index of wrong answer

    const fetchQuestions = async () => {
        try {
            const response = await fetch(quizUrl);
            const json = await response.json();
            setQuestionObjects(json.results);
        } catch (error) {
            console.log('Error in fetch:', error);
        }
    };

    const getPlayerCardColor = (index) => {
        // Define professional colors for player cards
        const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12'];
        // Return color based on player index, loop if more than 4 players
        return colors[index % colors.length];
    };

    const getPlayerBackgroundColor = (index) => {
        // Define professional colors for player backgrounds
        const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12'];
        // Return color based on player index, loop if more than 4 players
        return colors[index % colors.length];
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
            // Update the score of the current player
            const newPlayers = [...players]; // Create a copy of the players array
            newPlayers[playerTurnIndex]++; // Increase the score of the current player
            setPlayers(newPlayers); // Update the players array with the new score

            setPoints(points + 1);
            setCorrectAnswerIndex(index); // Set correct answer index
            setTimeout(() => {
                setCorrectAnswerIndex(null); // Reset correct answer index after delay
                handleNextQuestion();
            }, 1000); // Duration in milliseconds
        } else {
            // Handle wrong answer
            setWrongAnswerIndex(index); // Set the index of wrong answer
            setTimeout(() => {
                setWrongAnswerIndex(null); // Reset wrong answer index
            }, 1000); // Duration in milliseconds
        }
        handlePlayerTurnIndex();
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
                            style={[
                                styles.answerButton,
                                index === correctAnswerIndex ? styles.correctAnswerButton : null,
                                index === wrongAnswerIndex ? styles.incorrectAnswerButton : null
                            ]}
                            onPress={() => handleAnswer(answer, index)}
                        >
                            {he.decode(answer)}
                        </Button>
                    ))}

                    <View style={styles.playerScoresContainer}>
                        {players.map((player, index) => (
                            <Card key={index} style={[styles.playerCard, { backgroundColor: getPlayerCardColor(index)}]}>
                                <Card.Content>
                                    <Title style={styles.playerTitle}>Player {index + 1}</Title>
                                    <Paragraph style={styles.playerParagraph}>Score: {player}</Paragraph>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                </View>
            )}
        </SafeAreaView>
    )
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
    incorrectAnswerButton: {
        backgroundColor: 'lightcoral', // Light red color for incorrect answer
    },
    pointsText: {
        fontSize: 16,
        marginTop: 20,
    },
    playerScoresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    playerCard: {
        width: '48%', // Adjust card width as needed
        marginBottom: 10,
    },
    playerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    playerParagraph: {
        fontSize: 14,
    },
});

export default Questions;
