import React from 'react';
import {  Route, Routes } from 'react-router-dom';



import Signup from './Signup';
import Login from './Login';
import Movie from './Movie';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';
import Favorites from './Favorite';

function AllRoutes() {
  return (
    <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login"element={<Login/>} />
       
          <Route path="/Movie" element=
      {
      <PrivateRoute>
            <Movie />
          </PrivateRoute>
      }
      ></Route>
          <Route path="/fav"element={<Favorites/>} />
         <Route path="/logout"element={<Logout/>} />



    </Routes>
  );
}

export default AllRoutes;
