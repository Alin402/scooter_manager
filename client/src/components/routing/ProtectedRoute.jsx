import React, { useEffect } from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation, Outlet} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user);
    useEffect(() => {
        console.log("USER", user)
    }, [])
    let location = useLocation();
    return user.isAuth ? <Outlet /> :  <Navigate to="/login" replace />

};

export default ProtectedRoute;