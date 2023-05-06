import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectBtn from "../components/DeleteProjectBtn";
import EditProjectForm from "../components/EditProjectForm";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center mx-auto">
        <Spinner />
      </div>
    );

  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <div className="w-full max-w-7xl">
          <Link
            to="/"
            className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>{" "}
            Back
          </Link>
          <div className="flex gap-4">
            <div className="w-full max-w-xl p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
              <div className="flex flex-col space-y-4">
                <div>
                  <h5 className="mb-2 text-3xl font-bold text-gray-900">
                    {data.project.name}
                  </h5>
                  <p className="text-gray-500 text-sm mb-2">
                    {data.project.description}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    Status: <strong>{data.project.status}</strong>
                  </p>
                </div>

                <hr />

                <h5 className="text-base font-semibold">Client Information</h5>
                <ClientInfo client={data.project.client} />

                <hr />

                <DeleteProjectBtn projectId={data.project.id} />
              </div>
            </div>

            <div className="w-full max-w-xl p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
              <div className="flex flex-col space-y-4">
                <EditProjectForm project={data.project} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
