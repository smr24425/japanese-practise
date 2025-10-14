import React from "react";
import { NavBar } from "antd-mobile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SafeArea } from "antd-mobile";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SafeArea position={"top"} />

      <Header />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          background:
            "linear-gradient(135deg, rgba(215,195,247,0.15), rgba(180,160,220,0.1))",
        }}
      >
        {children}
      </main>
      <Footer />
      <SafeArea position={"bottom"} />
    </div>
  );
};

export default Layout;
