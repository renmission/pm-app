import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";
import React from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <div className="flex justify-center items-center mx-auto"><Spinner /></div>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="flex flex-col mx-auto md:-mx-0 md:flex-row items-center justify-between gap-4 ">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No project found.</p>
      )}
    </>
  );
};

export default Projects;
