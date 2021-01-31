function checksUnited(itemId, mealType, setHideBtn, setBeginBtn) {
  const zero = 0;
  const checkForCompletion = () => {
    const list = JSON.parse(localStorage.getItem('doneRecipes'));
    if (list !== null && list.filter((item) => item.id === itemId).length > zero) {
      setHideBtn('hidden');
    }
  };

  const checkForProgress = async () => {
    const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (list !== null) {
      let keys = [];
      if (mealType === 'Meal') { keys = Object.keys(list.meals); } else {
        keys = Object.keys(list.cocktails);
      }
      if (keys.includes(itemId)) setBeginBtn('Continuar Receita');
    }
  };

  // checkFavorites();
  checkForCompletion();
  checkForProgress();
}

export default checksUnited;
