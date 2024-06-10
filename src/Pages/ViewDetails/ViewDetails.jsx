import React from 'react';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {

  const donor = useParams();

  console.log(donor)

  return (
    <div>
      <h2>This is the view Details page</h2>
    </div>
  );
};

export default ViewDetails;