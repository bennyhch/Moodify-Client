import React from "react";

const Header = ({ children, backgroundColor }) => {
  const headerStyle = {
    color: "white",
    backgroundColor: backgroundColor,
    textAlign: "center",
    padding: "15px",
    borderRadius: "15px 15px 0 0",
  };

  return <h4 style={headerStyle}>{children}</h4>;
};

export default Header;
