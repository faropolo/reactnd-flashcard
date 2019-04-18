import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  onPressAddCard = () => {
    let deck = this.props.decks[this.props.navigation.state.params.deck.title];
    this.props.navigation.navigate("AddCard", {
      deck
    });
  };

  onPressStartQuiz = () => {
    let deck = this.props.decks[this.props.navigation.state.params.deck.title];
    this.props.navigation.navigate("Quiz", {
      deck
    });
  };

  render() {
    let deck = this.props.decks[this.props.navigation.state.params.deck.title];
    let disableQuiz = deck.questions.length === 0;

    return (
      <View style={styles.container}>
        <Text style={styles.txt}>Deck - {deck.title}</Text>
        <Text style={styles.subTxt}>{deck.questions.length} Cards</Text>
        <TouchableHighlight style={[styles.btnDefault, styles.btnAddCard]}>
          <Button title="Add Card" onPress={this.onPressAddCard} />
        </TouchableHighlight>
        <TouchableHighlight
          disabled={disableQuiz}
          style={[styles.btnDefault, styles.btnStartQuiz]}
        >
          <Button
            disabled={disableQuiz}
            title="Start Quiz"
            onPress={this.onPressStartQuiz}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state
  };
}
export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 20
  },
  txt: {
    fontSize: 40,
    fontWeight: "bold"
  },
  subTxt: {
    fontSize: 30,
    fontWeight: "bold"
  },
  btnDefault: {
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 5,
    margin: 5
  },
  btnAddCard: {
    backgroundColor: "#ffffff"
  },
  btnStartQuiz: {
    backgroundColor: "#000000"
  }
});
