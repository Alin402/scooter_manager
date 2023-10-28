import { useState } from "react";
import { loginUserAction } from "../../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const LogInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = () => {
        dispatch(loginUserAction(formData, navigate));
    }

    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title">sign up</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">email</label>
                    <input className="form-input" id="email" name="email" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">password</label>
                    <input className="form-input" id="password" name="password" type="password" onChange={(e) => handleInputChange(e)}></input>
                </div>
                <div className="form-group">
                    <button className="btn-submit" onClick={submit}>Log In</button>
                </div>
            </div>
            <div className="signup-shadow-login"></div>
        </div>
    )
}

export default LogInForm;