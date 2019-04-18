import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from "../actions";

function reducer(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.card.title]: {
          ...state[action.card.title],
          questions: [
            ...state[action.card.title].questions,
            action.card.question
          ]
        }
      };
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    default:
      return state;
  }
}

export default reducer;
