import React from "react";
import { useState, useRef } from "react";
import styles from "./login.module.css";
import landingLogo from "../../assets/loginLogo.png";
import { useDispatch } from "react-redux";
import { postLoginInfo } from "../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";

// insert invalid credential case!!!!
// loading page

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isNewMember, setIsNewMember] = useState(false);

  const registerHandler = () => {
    setIsNewMember((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };
    if (isNewMember) {
      const enteredUsername = usernameRef.current.value;
      user.username = enteredUsername;
      user.endpoint = "register";
      await dispatch(postLoginInfo(user));
    } else {
      user.endpoint = "login";
      await dispatch(postLoginInfo(user));
    }
    // check if valid credential, then proceed if ok
    navigate("/dashboard");
  };

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <p className={styles.welcome}>Welcome!</p>
        <h2>Sign {isNewMember ? "up" : "in"} to</h2>
        <p>MOODIFY</p>

        {isNewMember && <label htmlFor="username">User Name</label>}
        {isNewMember && (
          <input
            type="text"
            id="username"
            required
            ref={usernameRef}
            placeholder="Enter your user name"
          />
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          ref={emailRef}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          ref={passwordRef}
          placeholder="Enter your password"
        />

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
