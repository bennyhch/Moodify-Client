import React from "react";
import { TiTickOutline } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import styles from "./card.module.css";

const Card = (props) => {
  const {
    title,
    data,
    colorHeader,
    subheadingNeg,
    descriptionNeg,
    descriptionPos,
    subheadingPos,
  } = props;

  return (
    <div className={styles.itemContainer}>
      <header className={`${styles[colorHeader]}`}>
        <h4>{title}</h4>
      </header>
      <main>
        <div>{data ? <TiTickOutline size={75} /> : <MdClose size={75} />}</div>
        <div className={styles.textContainer}>
          <h4>{data ? `${subheadingPos}` : `${subheadingNeg}`}</h4>
          <p>{data ? `${descriptionPos}` : `${descriptionNeg}`}</p>
        </div>
      </main>
    </div>
  );
};

export default Card;
