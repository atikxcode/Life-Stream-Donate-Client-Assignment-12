import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const VolunteerAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  // Fetch user data
  const { isPending, isError, error, data: userRoles } = useQuery({
    queryKey: ['userRoles'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user');
      return res.data.map(user => user.role); // Extract only roles
    }
  });

  if (isPending || loading) {
    return (
      <div className="mx-auto container flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Check if user is logged in and has volunteer or admin role
  if (user && userRoles) {
    const isAdminOrVolunteer = userRoles.some(role => role === "admin" || role === "volunteer");

    if (isAdminOrVolunteer) {
      return children;
    }
  }

  // Redirect to login if user is not a volunteer or admin
  return <Navigate state={location.pathname} to="/login" />;
};

export default VolunteerAdminRoute;
