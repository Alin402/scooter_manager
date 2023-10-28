import LogInForm from "./LogInForm";
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"

const LogInView = ({ isAudioPlay }) => {
    const user = useSelector((state) => state.user);
    if (user.isAuth) {
        return <Navigate to="/main" replace />
    }
    return (
        <div className="landing">
            <div>
                <LogInForm />
            </div>
        </div>
    )
}

export default LogInView;