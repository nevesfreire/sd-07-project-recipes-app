export default function reducer(state, action) {
  switch (action.type) {
  case 'SET_USER':
    localStorage.setItem('user', JSON.stringify({ email: action.userEmail }));
    return { ...state, user: { userEmail: action.userEmail } };
  default:
    throw new Error();
  }
}
