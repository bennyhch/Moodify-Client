import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import styles from "./sidebar.module.css";
import { RiDashboardFill } from "react-icons/ri";
import { ImClipboard, ImStatsDots } from "react-icons/im";
import { BsJournalCheck } from "react-icons/bs";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios("/logout");
    navigate("/login");
  };

  return (
    <nav className={styles.navLinkContainer}>
      <div className={styles.logoContainer}>
        <img src={process.env.PUBLIC_URL + "assets/logo2.png"} alt="logo" />
      </div>

      <NavLink to="/" className={styles.navbtnContainer}>
        <RiDashboardFill size={30} />
        Dashboard
      </NavLink>

      <NavLink to="/logger" className={styles.navbtnContainer}>
        <ImClipboard size={30} />
        Logger
      </NavLink>

      <NavLink to="/statistics" className={styles.navbtnContainer}>
        <ImStatsDots size={30} />
        Statistics
      </NavLink>

      <NavLink to="/journal" className={styles.navbtnContainer}>
        <BsJournalCheck size={30} />
        Journal
      </NavLink>

      <NavLink
        onClick={logoutHandler}
        to="/"
        className={styles.navbtnContainer}
      >
        <FiLogOut size={30} type="button" />
        Logout
      </NavLink>
    </nav>
  );
};

export default Sidebar;

/* <div className={styles.navbtnContainer}>
        <span>
          <FiLogOut onClick={logoutHandler} size={30} type="button" />
        </span>
        Logout
      </div> */
