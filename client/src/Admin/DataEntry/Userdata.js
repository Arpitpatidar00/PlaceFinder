import React, { useEffect, useState } from "react";
import axios from "axios";
import { TERipple } from 'tw-elements-react';
import "./admin.css";
import Api from '../../Api';
import Loader from "../../Components/Loader/Loader";

function UserPage() {
  const [users, setUsers] = useState([false]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await axios.get(`${Api}/auth/users`, {
          params: { page, limit: 5 }  // Fetch 10 users per request
        });
        setUsers((prevUsers) => [...prevUsers, ...response.data.data || []]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, [page]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${Api}/auth/users${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const loadMoreUsers = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <h1 className="m-3">Users</h1>
      <hr className="bg-black m-3" />

      <div id="alluserscontainer" className="user-container-wrapper">
        {Array.isArray(users) && users.map((user) => (
          <div
            className="block rounded-lg bg-white shadow my-4 mx-2 p-4"
            key={user._id}
          >
            <TERipple>
              <div className="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  className="rounded-t-lg"
                  src={user.profileImage} 
                  alt={user.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto' }}
                />
              </div>
            </TERipple>
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {user.name}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {user.email}
              </p>
              <TERipple>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </TERipple>
            </div>
          </div>
        ))}
      </div>

      {!loading && (
        <button onClick={loadMoreUsers} className="load-more-btn">
          Load More
        </button>
      )}
      {loading && <p><Loader/></p>}
    </>
  );
}

export default UserPage;
