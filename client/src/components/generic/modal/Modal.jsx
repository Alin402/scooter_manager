import "./Modal.css";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";

const Modal = ({ open, handleClose, children }) => {
    return open && (
        <div id="myModal" class="modal">
        <div className="modal-content">
            <CloseIcon size={22} onClick={handleClose} />
            {
                children
            }
        </div>
        </div>
    )
}

export default Modal;