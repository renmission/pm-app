import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutation";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill in all fields");
    }

    updateProject(name, description, status);
  };

  return (
    <div className="">
      <h3 className="text-base font-semibold">Update Project Details</h3>
      <form
        onSubmit={HandleOnSubmit}
        className="flex flex-col gap-2 my-4 w-full"
      >
        <div>
          <label className="block text-black text-sm font-bold mb-1">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
          />
        </div>
        <div>
          <label className="block text-black text-sm font-bold mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
          />
        </div>
        <div>
          <label className="block text-black text-sm font-bold mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full text-sm py-2 px-2 text-gray-600"
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-3 py-2 my-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            <span> Update Project</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
