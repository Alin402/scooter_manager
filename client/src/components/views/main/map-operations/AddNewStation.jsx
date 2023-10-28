import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStation } from "../../../../actions/station";

const AddNewStation = ({ newStationCoords, setOpenAddStationModal, setInAddNewStationMode, setRefresh }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        stationName: "",
        noOfScooters: "",
        coords: newStationCoords
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submit = () => {
        console.log(formData);
        dispatch(addStation(formData));
        setOpenAddStationModal(false);
        setInAddNewStationMode(false);
        setRefresh(true);
    }
    return (
        <div>
            <h2 style={{ color: "black" }}>Add new station</h2>
            <h2 style={{ marginTop: "1rem" }}>Coordinates: <br />
                Latitude: { newStationCoords.lat } <br />
                Longitude: { newStationCoords.lng } <br />
            </h2>

            <div className="form-group">
                <label className="form-label" htmlFor="stationName">Station name</label>
                <input className="form-input" id="stationName" name="stationName" onChange={(e) => handleInputChange(e)}></input>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="noOfScooters">Number of Scooters</label>                    
                <input className="form-input" id="noOfScooters" name="noOfScooters" type="number" onChange={(e) => handleInputChange(e)}></input>
            </div>
           <div className="form-group">
                <button className="btn-submit" onClick={submit}>Add</button>
            </div>
        </div>
    )
}

export default AddNewStation;