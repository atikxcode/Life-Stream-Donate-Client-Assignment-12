import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const AllUsers = () => {

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState('all');
  


  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };


  const {isError, error, isPending, refetch,  data: users} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user')
      return res.data
    }
  })

  // const [userRoles, setUserRoles] = useState(users);

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  // console.log(users);
  

  if (isError) {
    return <p>Error: {error.message}</p>;
  }



  const handleRoleChange = (id, newRole) => {
    const updateRole = {
      role: newRole,  
  }

  // console.log("Updated Donation Request", updateRole)

  axiosSecure.put(`/user/role/${id}`, updateRole)
    .then(res => {
      if(res.data.modifiedCount > 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated the User Role Successfully",
          showConfirmButton: false,
          timer: 1500,
          
        });
       refetch();
      } 
    })
    .catch(error => {
      console.error(error)
    })
  };




  const updateStatus = (id, newStatus) => {
    const updateStatus = {
      status: newStatus,  
  }

  // console.log("Updated Donation Request", updateStatus)

  axiosSecure.put(`/user/status/${id}`, updateStatus)
    .then(res => {
      if(res.data.modifiedCount > 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated the User Status Successfully",
          showConfirmButton: false,
          timer: 1500,
          
        });
       refetch();
      } 
    })
    .catch(error => {
      console.error(error)
    })
  };

  const filteredUsers = users.filter((user) => {
    return statusFilter === 'all' || user.status === statusFilter;
  });

  return (
    <div>
  <Helmet>
    <meta charSet="utf-8" />
    <title>All User - Life Stream Donate</title>
  </Helmet>
  
  <div className='flex flex-col md:flex-row justify-between my-10 mb-10'>
    <h2 className="text-center md:text-left">Members</h2>
    <div className="mt-4 md:mt-0">
      <select
        className='rounded-xl p-2'
        id="statusFilter"
        value={statusFilter}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
    </div>
  </div>

  <div>
    {filteredUsers.map((user) => (
      <div key={user._id} className="overflow-hidden shadow-custom mb-9 rounded-2xl">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="w-1/4 text-center">Name</th>
              <th className="w-1/4 text-center">Role</th>
              <th className="w-1/4 text-center">Status</th>
              <th className="w-1/4 text-center">Role Change</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td className="text-center">
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user?.image} alt={`${user?.name}'s avatar`} />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-bold">{user?.name}</div>
                    <div className="text-sm opacity-50">{user?.email}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">{user?.role}</td>
              <td className="text-center">
                {user?.status === "active" ? (
                  <button className="btn" value='blocked' onClick={(e) => updateStatus(user._id, e.target.value)}>Block This User</button>
                ) : (
                  <button className="btn" value='active' onClick={(e) => updateStatus(user._id, e.target.value)}>Active This User</button>
                )}
              </td>
              <td className="text-center">
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="donor">Donor</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ))}
  </div>
</div>

  );
};

export default AllUsers;