import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
    setShowModal(false);
  };

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            className="bg-pink-600 text-white active:bg-pink-500 
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 flex gap-2"
            type="button"
            onClick={() => setShowModal(true)}
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
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span>Add Project</span>
          </button>
          {showModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                <div className="relative w-full my-6 mx-auto max-w-4xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">Add Project</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-gray-500 h-6 w-6 text-2xl">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form
                        onSubmit={handleOnSubmit}
                        className="px-8 pt-6 pb-8 w-full flex flex-col space-y-4"
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
                          <label className="block text-black text-sm font-bold mb-1">
                            Client
                          </label>
                          <select
                            id="clientId"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="shadow appearance-none border rounded w-full text-sm py-2 px-2 text-gray-600"
                          >
                            <option value="">Select Client</option>
                            {data.clients.map((client) => (
                              <option key={client.id} value={client.id}>
                                {client.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center justify-end p-6">
                          <button
                            className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-white bg-pink-500 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default AddProjectModal;
