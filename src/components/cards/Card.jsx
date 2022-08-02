import React from "react";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Card = (props) => {
  const { title, data } = props;
  return (
    <>
      <header>
        <h4>{title}</h4>
      </header>
      <main>{data ? <TiTickOutline /> : <ImCross />}</main>
    </>
  );
};

export default Card;
