import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f4f4] p-10">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
