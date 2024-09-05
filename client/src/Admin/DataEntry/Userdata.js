import React, { useEffect, useState } from "react";
import axios from "axios";
import { TERipple } from 'tw-elements-react';
import "./admin.css";
import Api from '../../Api';

function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${Api}/api/v1/users`);
        setUsers(response.data.data || []); // Ensure data is always an array
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers(setUsers);
  }, [setUsers]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${Api}/api/v1/users/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <h1 className="m-3">Users</h1>
      <hr className="bg-black m-3" />
   
      <div id="alluserscontainer" className="user-container-wrapper">
        {Array.isArray(users) && users.map((user) => (
          <div
            className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 my-4 mx-2 p-4"
            key={user._id}
          >
            <TERipple>
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                {/* Display Base64 image or a placeholder */}
                <img
                  className="rounded-t-lg"
                  src={user.image ? `data:image/jpeg;base64,${user.image}` : "https://via.placeholder.com/100"}
                  alt={user.username}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto' }}
                />
              </div>
            </TERipple>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {user.username}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {user.email}
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {user.mobileNumber}
              </p>
              <TERipple>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </TERipple>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserPage;
