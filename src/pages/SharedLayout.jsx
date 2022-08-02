import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./sharedLayout.module.css";

const SharedLayout = () => {
  return (
    <main className={styles.dashboard}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.dashboardPage}>
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
