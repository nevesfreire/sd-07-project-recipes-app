function EmailOk(email, password, setDisabled) {
  const passwordLength = 6;
  if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    && password.length > passwordLength) {
    setDisabled(false);
    return true;
  }
  setDisabled(true);
  return false;
}

export default EmailOk;
