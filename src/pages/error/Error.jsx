import React from "react";
import { useNavigate } from "react-router-dom";
import SaveButton from "../../components/tools/SaveButton";
import styles from "./error.module.css";

const Error = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/");
  };
  return (
    <div className={styles.errorContainer}>
      <h1>404</h1>
      <h3>Sorry, the page you tried cannot be found</h3>
      <SaveButton onClick={backHandler}>Back Home</SaveButton>
    </div>
  );
};

export default Error;
