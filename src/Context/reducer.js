export default function reducer(state, action) {
  switch (action.type) {
  case 'SET_USER':
    localStorage.setItem('user', JSON.stringify({ email: action.userEmail }));
    return { ...state, user: { userEmail: action.userEmail } };

  case 'SET_MEALS':
    return { ...state, mealsData: action.data };

  case 'SET_COCKTAILS':
    return { ...state, cocktailsData: action.data };

  case 'SET_CATEGORIES_MEALS':
    return { ...state, mealsCategory: action.data };

  case 'SET_CATEGORIES_COCKTAILS':
    return { ...state, cocktailsCategory: action.data };

  default:
    throw new Error();
  }
}
