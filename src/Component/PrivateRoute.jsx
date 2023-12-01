import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
 
    let ans=localStorage.getItem("loggedin")
    console.log("ans",ans)

  return ans ? children : <Navigate to={"/"} />;
};

export default PrivateRoute;