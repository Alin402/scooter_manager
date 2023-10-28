import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../actions/user";
import ProfileDropDown from "./ProfileNav";

const Navigation = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <nav className="navigation">
            {
                user.isAuth ? (
                    <>
                        <NavLink to="/">
                            <h2>Electric scooters</h2>
                        </NavLink>
                        <div className="nav-auth">
                            <NavLink to="/main" className="nav-item">
                                Home
                            </NavLink>
                            <NavLink className="nav-item" onClick={() => { dispatch(logoutUserAction()) }}>
                                Log Out
                            </NavLink>
                            <div>
                                <ProfileDropDown />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLink to="/">
                            <h2>Electric scooters</h2>
                        </NavLink>
                        <div className="nav-auth">
                        <NavLink to="/signup" className="nav-item">
                            Sign Up
                        </NavLink>
                        <NavLink to="/login">
                            <button className="btn" style={{ marginLeft: "1rem" }}>
                                Log In
                            </button>
                        </NavLink>
                        </div>
                    </>
                )
            }
        </nav>
    )
}

export default Navigation;