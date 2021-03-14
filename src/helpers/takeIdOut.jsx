function takeIdOut(pathname, cards) {
  const id = cards[0];

  return (
    pathname === '/comidas' ? id.idMeal : id.idDrink
  );
}

export default takeIdOut;
