import React from "react";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
      <AddClientModal /> 
      <AddProjectModal />
      </div>
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
