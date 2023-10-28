import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const LandingView = ({ isAudioPlay }) => {
    const user = useSelector((state) => state.user);
    if (user.isAuth) {
        return <Navigate to="/main" replace />
    }
    return (
        <div className="landing">
            <div className="middle-header">
            <h2 className="middle-header-text" style={{ marginTop: "2rem" }}>
                The best way for students <br />
                to get around.
            </h2>
            <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="btn-action" style={{ marginTop: "4rem" }}>
                    Sign Up Now
                </button>
            </Link>
            </div>
        </div>
    );
}

export default LandingView;