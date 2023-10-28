import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStation } from "../../../../actions/station";
import axios from "axios";

const BookScooter = ({ newStationCoords, setOpenAddStationModal, setInAddNewStationMode, station, setOpenBookModal }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        stationName: "",
        noOfScooters: "",
        coords: newStationCoords
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = async (s) => {
        const formData= {
            stationId: station._id,
            scooterId: s._id
        }
        await axios.post("http://localhost:5000/api/station/book", formData, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        setOpenBookModal(false)
    }
    return (
        <div>
            <h2 style={{ color: "black" }}>Book scooter {station.name} </h2>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <h2 style={{ color: "black" }}>Available Scooters: </h2>
                {
                    station.scooters.filter(scooter => scooter.reservedUserId === null).map(s => {
                        return (
                            <button className="btn" onClick={() => submit(s)}>
                                {s._id} <br />
                                {s.batteryLevel}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BookScooter;