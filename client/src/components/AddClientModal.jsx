import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(name === '' || email === '' || phone === '' ){
      return alert('Please fill in all fields')
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white active:bg-blue-500 
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
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>

        <span>Add Client</span>
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-full my-6 mx-auto max-w-4xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Add Client</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-gray-500 h-6 w-6 text-2xl">x</span>
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
                        Email
                      </label>
                      <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-bold mb-1">
                        Phone
                      </label>
                      <input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
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
  );
};

export default AddClientModal;
