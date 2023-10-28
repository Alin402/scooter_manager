import Dropdown from "../generic/dropdown/Dropdown";
import { BiSolidUserPin as UserIcon } from "react-icons/bi";
import {useSelector} from "react-redux"
import { NavLink } from "react-router-dom";

const ProfileNav = () => {
    const user = useSelector((state) => state.user);
    return (
        <div>
            <Dropdown
                header = {
                    <UserIcon size={35} color="inherit" />
                }
            >
                <NavLink className="nav-item-inv">
                    {user.userData.email}
                </NavLink>
            </Dropdown>
        </div>
    )
}

export default ProfileNav;