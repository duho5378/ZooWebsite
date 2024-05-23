import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return isAdmin ? (
    children
  ) : (
    <Navigate to="/entrance" replace />
  );
};
const isAdmin = localStorage.getItem("isAdmin");

if (isAdmin && isAdmin === "true") {
  // The user is an admin
  console.log("User is an admin");
} else {
  // The user is not an admin
  console.log("User is not an admin");
}

export default PrivateRoute;