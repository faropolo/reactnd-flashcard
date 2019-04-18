import React from "react";
import { View, StyleSheet } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import ListDecks from "./components/ListDecks";
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helpers";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

const Tabs = TabNavigator({
  TabDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: "Decks"
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "New Deck"
    }
  }
});

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs
  },
  ViewDeck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
