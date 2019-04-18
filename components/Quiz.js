import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight
} from "react-native";
import { NavigationActions } from "react-navigation";
import {
  clearLocalNotifications,
  setLocalNotification,
  getWindowSize
} from "../utils/helpers";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    sumCorrects: 0,
    showQuestion: true,
    showResult: false
  };

  onPressAnswer = event => {
    this.setState(state => {
      return { ...state, showQuestion: !state.showQuestion };
    });
  };

  resetQuiz = event => {
    let { deck } = this.props.navigation.state.params;
    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({ routeName: "ViewDeck", params: { deck } }),
        NavigationActions.navigate({ routeName: "Quiz", params: { deck } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  goHome = event => {
    let { deck } = this.props.navigation.state.params;
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      })
    );
  };

  onAnswerQuestion = correct => {
    let { deck } = this.props.navigation.state.params;
    let lastIndex = deck.questions.length - 1;
    let { sumCorrects, questionIndex, showResult } = this.state;

    if (correct) {
      sumCorrects = ++sumCorrects;
    }

    if (questionIndex === lastIndex) {
      showResult = true;
      clearLocalNotifications().then(setLocalNotification);
    } else {
      questionIndex++;
    }

    this.setState(state => {
      return {
        ...state,
        sumCorrects,
        questionIndex,
        showResult,
        showQuestion: true
      };
    });
  };

  render() {
    let { deck } = this.props.navigation.state.params;
    let { questionIndex, showQuestion, showResult, sumCorrects } = this.state;
    let { question, answer } = deck.questions[questionIndex];
    let btnText = showQuestion ? "Answer" : "Questions";

    return (
      <View style={styles.container}>
        {!showResult && (
          <View>
            <Text>
              {questionIndex + 1} / {deck.questions.length}
            </Text>
            <Text style={styles.txtQuestion}>
              {showQuestion ? question : answer}
            </Text>
            <Button title={btnText} onPress={this.onPressAnswer} />

            {!showQuestion && (
              <View>
                <TouchableHighlight
                  disabled={showQuestion}
                  style={[styles.btnDefault, styles.btnCorrect]}
                  onPress={event => {
                    this.onAnswerQuestion(true);
                  }}
                >
                  <Text>Correct</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  disabled={showQuestion}
                  style={[styles.btnDefault, styles.btnIncorrect]}
                  onPress={event => {
                    this.onAnswerQuestion(false);
                  }}
                >
                  <Text>Incorrect</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        )}
        {showResult && (
          <View>
            <Text>
              You answered {sumCorrects} of {deck.questions.length} questions
              correctly
            </Text>
            <TouchableHighlight
              style={styles.btnDefault}
              onPress={event => {
                this.resetQuiz();
              }}
            >
              <Text>Reset Quiz</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btnDefault}
              onPress={event => {
                this.goHome();
              }}
            >
              <Text>Home</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

export default Quiz;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
    padding: 5,
    ...getWindowSize()
  },
  txtQuestion: {
    fontSize: 30,
    fontWeight: "bold",
    width: getWindowSize().width
  },
  btnDefault: {
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 200
  },
  btnCorrect: {
    backgroundColor: "#00FF00"
  },
  btnIncorrect: {
    backgroundColor: "#FF0000"
  }
});
