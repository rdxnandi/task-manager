import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-row">
      <Header />
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
}

export default Layout;
