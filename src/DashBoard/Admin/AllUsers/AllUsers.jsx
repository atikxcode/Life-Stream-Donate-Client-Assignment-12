import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {

  const axiosPublic = useAxiosPublic();
  const [statusFilter, setStatusFilter] = useState('all');

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };


  const {isError, error, isPending, data: users} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user')
      return res.data
    }
  })



  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  console.log(users);

  if (isError) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div>
      <div className='flex  justify-between my-10 mb-10'>
        <h2>Members</h2>
        <div>
        <select className='rounded-xl p-2' id="statusFilter" value={statusFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
        </div>
      </div>



      <div>
  {users.map((user) => (
    <div key={user._id} className="overflow-x-auto shadow-custom mb-9 rounded-2xl">
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
              <div className="flex items-center gap-3 justify-center">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={user?.image} alt={`${user?.name}'s avatar`} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{user?.name}</div>
                  <div className="text-sm opacity-50">{user?.email}</div>
                </div>
              </div>
            </td>
            <td className="text-center">{user?.role}</td>
            <td className="text-center">
              {user?.status === "active" ? (
                <button className="btn">Block</button>
              ) : (
                <button className="btn">Active</button>
              )}
            </td>
            <td className="text-center">
              {user?.role === "donor" ? (
                <button className="btn">Make Volunteer</button>
              ) : (
                <button className="btn">Make Admin</button>
              )}
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