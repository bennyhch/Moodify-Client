import React from "react";
import styles from "./modalWrapper.module.css";

const ModalWrapper = ({ children, height, width }) => {
  const modalSize = {
    height,
    width,
  };
  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={styles.modal} style={modalSize}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
