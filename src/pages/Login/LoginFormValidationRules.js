export default function validate(values) {
  console.log('param:', values);

  const PASSWORD_MIN_LENGTH = 7;
  const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  let isValid = false;

  console.log('rule required:', (values.email !== '' && values.password !== ''));
  console.log('rule email:', (REGEX_EMAIL.test(values.email)));
  console.log('rule password:', (values.password.length >= PASSWORD_MIN_LENGTH));

  if ((values.email !== '' && values.password !== '') // email and password required
  && (REGEX_EMAIL.test(values.email)) // invalid email
  && (values.password.length >= PASSWORD_MIN_LENGTH)) { // invalid password
    isValid = true;
  }

  console.log('return:', isValid);
  return isValid;
}
