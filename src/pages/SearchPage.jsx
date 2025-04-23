import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import LinkedinAvatar from "../assets/linkedin-avatar.svg";

const SearchPage = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchQuery) return;

      setLoading(true);
      try {
        const usersRef = collection(db, "users");

        const q = query(
            usersRef,
            where("displayName", ">=", searchQuery),
            where("displayName", "<=", searchQuery + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);

        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-white">Search Results for "{searchQuery}"</h1>
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="flex items-center gap-4 p-4 border rounded bg-white">
              <img src={user.photoURL  || LinkedinAvatar} alt={user.displayName} className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="text-lg font-medium">{user.displayName}</h2>
                <p className="text-sm text-gray-600">{user.jobPosition || 'Software Engineer at Google'}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default SearchPage;