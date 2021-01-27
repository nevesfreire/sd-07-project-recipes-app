import { useState } from 'react';

function validation({ email = '', password = '' }) {
  const emailValidate = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const passwordMinLength = 6;
  const validPassword = password.length >= passwordMinLength;
  const validEmail = emailValidate.test(email);
  return (validPassword && validEmail);
}

export default function useValideEmailAndPassword(valid = false) {
  const [user, setUser] = useState(false);

  valid = validation(user);

  return [valid, setUser];
}
