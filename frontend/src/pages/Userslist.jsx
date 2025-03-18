import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Userslist.css";
import { FaUserShield, FaUser, FaTrash } from "react-icons/fa"; // Added FaUser icon

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allusers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Toggle Role Between "admin" and "user"
  const handleRoleToggle = async (userId, currentRole) => {
    const token = localStorage.getItem("token");
    const newRole = currentRole === "admin" ? "user" : "admin"; // Toggle role

    if (window.confirm(`Are you sure you want to change role to ${newRole}?`)) {
      try {
        await axios.put(
          `http://localhost:8001/api/admin/updateuser/${userId}`,
          { role: newRole }, // Update role dynamically
          {
            headers: { Authorization: `Bearer ${token}` },
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
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8001/api/admin/deleteuser/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers(); // Refresh user list
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="users-title text-center mb-4">Users List</h1>

      <div className="users-grid">
        {users.map((user) => {
          let avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${user.username}`;

          return (
            <div key={user._id} className="user-card">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <img src={avatarUrl} alt={user.username} className="user-avatar" />

                  <h5 className="card-title mt-2">{user.username}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Role:</strong> {user.role}
                  </p>
                  <div className="action-buttons">
                    <button
                      className={`btn ${user.role === "admin" ? "btn-secondary" : "btn-warning"} me-2`}
                      onClick={() => handleRoleToggle(user._id, user.role)}
                    >
                      {user.role === "admin" ? <FaUser /> : <FaUserShield />}{" "}
                      {user.role === "admin" ? "Make User" : "Make Admin"}
                    </button>
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
