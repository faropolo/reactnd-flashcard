import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { getDecks } from "../utils/api";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";

class ListDecks extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    getDecks().then(data => {
      this.props.dispatch(receiveDecks(data));
      // this.setState(state => {
      //   return { items: data };
      // });
    });
  }

  render() {
    let { items } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {items &&
            Object.values(items).map(item => {
              return (
                <TouchableHighlight
                  key={item.title}
                  onPress={() =>
                    this.props.navigation.navigate("ViewDeck", {
                      deck: item
                    })
                  }
                >
                  <View style={[styles.container, styles.lineBox]}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text>{item.questions.length} cards</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state
  };
}

export default connect(mapStateToProps)(ListDecks);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 40
  },
  lineBox: {
    borderWidth: 1
  },
  text: {
    fontSize: 60,
    fontWeight: "bold"
  }
});
