import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setisValid] = useState(false);
  const [isClicked, setisClicked] = useState(false);

  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const MIN_NUMBER = 6;
    console.log("ala");
    if (
      regexEmail.test(String(email).toLowerCase()) &&
      password.length > MIN_NUMBER
    ) {
      setisValid(true);
    }
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: email }));
  }, [email, password]);

  return (
    <div>
      <form>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          data-testid="email-input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={!isValid}
          onClick={() => setisClicked(true)}
        >
          Entrar
        </button>
        {isClicked && <Redirect to="/comidas" />}
      </form>
    </div>
  );
}
