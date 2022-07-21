import React from "react";
import { useState } from "react";
import styles from "./login.module.css";
import landingLogo from "../../assets/loginLogo.png";
import { useRef } from "react";

const Login = () => {
  const [isNewMember, setIsNewMember] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const registerHandler = () => {
    setIsNewMember((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch("");

    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <p className={styles.welcome}>Welcome!</p>
        <h2>Sign {isNewMember ? "up" : "in"} to</h2>
        <p>MOODIFY</p>

        {isNewMember && <label htmlFor="username">User Name</label>}
        {isNewMember && (
          <input type="text" id="username" required ref={usernameRef} />
        )}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" required ref={emailRef} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" required ref={passwordRef} />

        <button type="submit">Submit</button>

        <footer>
          {isNewMember ? "Already have an account?  " : "Not a member yet?  "}
          <span onClick={registerHandler}>
            {isNewMember ? "Login" : "Register"}
          </span>
        </footer>
      </form>

      <div className={styles.logoContainer}>
        <img src={landingLogo} alt="landing-logo" />
      </div>
    </div>
  );
};

export default Login;
