import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Userslist.css";
import { FaUserShield, FaTrash } from "react-icons/fa"; // Import Icons

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allusers", {
        headers: {
          Authorization: token,
        },
      });

      setUsers(response.data.data || []); // Set users data
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Handle Role Change to Admin
  const handleRoleChange = async (userId) => {
    const token = localStorage.getItem("authToken");

    if (window.confirm("Are you sure you want to make this user an Admin?")) {
      try {
        await axios.put(
          `http://localhost:8001/api/admin/updateuser/${userId}`,
          { role: "admin" }, // Update role to admin
          {
            headers: {
              Authorization: token,
            },
          }
        );
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error("Error updating user role", error);
      }
    }
  };

  // Handle Delete User
  const handleDelete = async (userId) => {
    const token = localStorage.getItem("authToken");

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8001/api/admin/deleteuser/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Users List</h1>

      {/* Fix Row Layout */}
      <div className="users-grid">
        {users.map((user) => {
          let avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;

          return (
            <div key={user._id} className="user-card">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  {/* Avatar Image */}
                  <img src={avatarUrl} alt={user.username} className="user-avatar" />

                  <h5 className="card-title mt-2">{user.username}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Role:</strong> {user.role}
                  </p>
                  <div className="action-buttons">
                    {user.role !== "admin" && (
                      <button className="btn btn-warning me-2" onClick={() => handleRoleChange(user._id)}>
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
