import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <a
        href="#"
        className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {project.name}
        </h5>
        <p className="text-gray-500 text-sm mb-2">Status: <strong>{project.status}</strong></p>
        <a
          href={`/project/${project.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </a>
    </div>
  );
};

export default ProjectCard;
