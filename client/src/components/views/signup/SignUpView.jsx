import SignUpForm from "./SignUpForm";
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const SignUpView = ({ isAudioPlay }) => {
    const user = useSelector((state) => state.user);
    if (user.isAuth) {
        return <Navigate to="/main" replace />
    }
    return (
        <div className="landing">
            <div>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUpView;