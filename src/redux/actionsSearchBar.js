export const SHOW_HIDE_SEARCHBAR = 'SHOW_HIDE_SEARCHBAR';

export const toggleSearchBar = (toggle) => ({
  type: SHOW_HIDE_SEARCHBAR,
  toggle,
});

export const SHOW_HIDE_CARD_FOOD = 'SHOW_HIDE_CARD_FOOD';

export const toggleCardFood = (toggleFood) => ({
  type: SHOW_HIDE_CARD_FOOD,
  toggleFood,
});

export const SHOW_HIDE_CARD_DRINK = 'SHOW_HIDE_CARD_DRINK';

export const toggleCardDrink = (toggleDrink) => ({
  type: SHOW_HIDE_CARD_DRINK,
  toggleDrink,
});
