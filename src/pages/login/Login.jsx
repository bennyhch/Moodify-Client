import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styles from "./login.module.css";
import landingLogo from "../../assets/loginLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { postLoginInfo } from "../../features/login/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { correctAuth, showWarning, isAccountExisted } = useSelector(
    (store) => store.login
  );

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
      // dispatch(addUserName())
    } else {
      user.endpoint = "login";
      await dispatch(postLoginInfo(user));
    }

    // navigate("/");
    // if (!correctAuth) {
    //   setShowWarning(true);
    // }
    // needs to GET data before redirecting the page
    // if (isLoginLoading) {
    //   return <h1>Loading ...</h1>;
    // } else {
    //   navigate("/");
    // }
  };

  useEffect(() => {
    if (correctAuth) {
      navigate("/");
    }
    // else {
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 5000);
    // }
  }, [correctAuth]);

  return (
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <div className={styles.headerContainer}>
          <div>
            <p className={styles.welcome}>Welcome!</p>
            <h2>Sign {isNewMember ? "up" : "in"} to</h2>
            <p>MOODIFY</p>
          </div>
          <div className={styles.mlogo}>
            <img src={process.env.PUBLIC_URL + "assets/logo2.png"} alt="logo" />
          </div>
        </div>

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
        {showWarning && <p className={styles.warning}>Invalid Credentials</p>}
        {isAccountExisted && (
          <p className={styles.warning}>Account already existed</p>
        )}

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
