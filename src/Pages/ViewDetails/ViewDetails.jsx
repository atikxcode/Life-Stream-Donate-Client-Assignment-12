import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewDetails = () => {
  const donation = useLoaderData();

  const {id} = donation;
  console.log(id)
  return (
    <div>
      <h2>This is the view Details page {id}</h2>
    </div>
  );
};

export default ViewDetails;