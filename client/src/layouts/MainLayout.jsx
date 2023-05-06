import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="max-w-7xl mx-auto mt-6">
      <div className="flex flex-col items-start justify-start mx-2  gap-6 ">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
