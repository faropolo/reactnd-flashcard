import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Text
} from "react-native";
import Modal from "react-native-modal";
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions";
import { connect } from "react-redux";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
    modal: false
  };

  onPressAddCard = event => {
    let { deck } = this.props.navigation.state.params;
    let { question, answer } = this.state;
    if (question !== "" && answer !== "") {
      let card = { question, answer };
      addCardToDeck(deck.title, card);
      this.props.dispatch(
        addCard({ title: deck.title, question: { ...card } })
      );
      this.props.navigation.goBack(null);
    } else {
      this.setState(state => {
        return { ...state, modal: true };
      });
    }
  };

  render() {
    let { question, answer } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Type the question"
          value={question}
          style={styles.input}
          onChangeText={question =>
            this.setState(state => {
              return { ...state, question };
            })
          }
        />
        <TextInput
          placeholder="Type the answer"
          value={answer}
          style={styles.input}
          onChangeText={answer =>
            this.setState(state => {
              return { ...state, answer };
            })
          }
        />
        <TouchableHighlight style={[styles.btnDefault, styles.btnStartQuiz]}>
          <Button title="Submit" onPress={this.onPressAddCard} />
        </TouchableHighlight>

        <Modal isVisible={this.state.modal}>
          <View style={styles.modalContent}>
            <View>
              <Text>Check the Question and Answer fields!</Text>

              <TouchableHighlight
                style={styles.btnDefault}
                onPress={() => {
                  this.setState(state => {
                    return { ...state, modal: false };
                  });
                }}
              >
                <Text>Ok!</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect()(AddCard);

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
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 200
  },
  btnAddCard: {
    backgroundColor: "#ffffff"
  },
  btnStartQuiz: {
    backgroundColor: "#000000"
  },
  input: {
    width: 200,
    height: 44,
    borderWidth: 1,
    margin: 5
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
