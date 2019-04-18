import React, { Component } from "react";
import { saveDeckTitle } from "../utils/api";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class AddDeck extends Component {
  state = {
    deckTitle: ""
  };

  onPressNewDeck = event => {
    saveDeckTitle(this.state.deckTitle);

    this.props.dispatch(
      addDeck({ title: this.state.deckTitle, questions: [] })
    );

    this.setState({ deckTitle: "" });
  };

  render() {
    let { deckTitle } = this.state;
    return (
      <View style={styles.form}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder="Deck Title"
          value={deckTitle}
          onChangeText={deckTitle => this.setState({ deckTitle })}
        />
        <TouchableHighlight>
          <Button title="Submit" onPress={this.onPressNewDeck} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect()(AddDeck);

const styles = StyleSheet.create({
  form: {
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
    padding: 8
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  input: {
    width: 200,
    height: 44,
    borderWidth: 1,
    margin: 50
  },
  button: {}
});
