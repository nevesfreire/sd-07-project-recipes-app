function foodOrDrink(cards, pathname, isOver, goatIgredient) {
  if (pathname === '/comidas') {
    const question = cards.length > 1
    || cards.length === isOver
    || goatIgredient.includes('Goat');
    return question;
  }
  if (pathname === '/bebidas') {
    const question = cards.length > 1 || cards.length === isOver;
    return question;
  }
}

export default foodOrDrink;
