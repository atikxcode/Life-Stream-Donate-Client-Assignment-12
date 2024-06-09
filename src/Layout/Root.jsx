import React from 'react';
import NavBar from '../Pages/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';

const Root = () => {
  return (
    <div>
     <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;