import { AsyncStorage } from "react-native";

const storagekey = "UDACITY:FLASHCARDS";

export function getDecks() {
  return AsyncStorage.getItem(storagekey).then(data => {
    return JSON.parse(data);
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(storagekey).then(results => {
    let deck = JSON.parse(results)[id];
    return deck;
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    storagekey,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}

export function addCardToDeck(title, card) {
  return getDeck(title).then(deck => {
    let { questions } = deck;
    return AsyncStorage.mergeItem(
      storagekey,
      JSON.stringify({
        [title]: {
          title,
          questions: [...questions, card]
        }
      })
    );
  });
}
