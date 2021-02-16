export default function validate(values) {
  const PASSWORD_MIN_LENGTH = 7;
  const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  let isValid = false;

  if ((values.email !== '' && values.password !== '') // email and password required
  && (REGEX_EMAIL.test(values.email)) // invalid email
  && (values.password.length >= PASSWORD_MIN_LENGTH)) { // invalid password
    isValid = true;
  }

  return isValid;
}
