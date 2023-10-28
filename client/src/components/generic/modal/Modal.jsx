import "./Modal.css";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";

const Modal = ({ open, handleClose, children }) => {
    return open && (
        <div id="myModal" class="modal">
        <div className="modal-content" style={{ position: "relative" }}>
            <div style={{ position: "absolute", right: "1rem" }}>
                <CloseIcon size={22} onClick={handleClose} />
            </div>
            {
                children
            }
        </div>
        </div>
    )
}

export default Modal;