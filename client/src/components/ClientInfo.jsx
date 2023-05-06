import React from "react";

const ClientInfo = ({ client }) => {
  return (
    <ul className="max-w-md divide-y divide-gray-700">
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {client.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {client.email}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-medium text-gray-900">
            {client.phone}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ClientInfo;
