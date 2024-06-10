import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  // Fetch volunteer data
  const { isPending, isError, error, data: volunteers } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user');
      return res.data;
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

  // Check if user is logged in and has volunteer role
  if (user && volunteers) {
    const isVolunteer = volunteers.some(volunteer => volunteer.email === user.email && volunteer.role === "volunteer");

    if (isVolunteer) {
      return children;
    }
  }

  // Redirect to login if user is not a volunteer
  return <Navigate state={location.pathname} to="/login" />;
};

export default VolunteerRoute;
