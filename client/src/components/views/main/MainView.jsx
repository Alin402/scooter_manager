import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { getStations } from "../../../actions/station";
import Map from "./Map";
import MapDashboard from "./MapDashboard";
import "./Main.css";

const LandingView = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [openAddStationModal, setOpenAddStationModal] = useState(false);
    const [newStationCoords, setNewStationCoords] = useState({  });
    const [inAddNewStationMode, setInAddNewStationMode] = useState(false);
    const [selectedStation, setSelectedStation] = useState(false);
    const [openBookModal, setOpenBookModal] = useState(false);

    useEffect(() => {
        console.log("intra")
        dispatch(getStations());
    }, [])

    const handleAddStationModalClose = () => {
        setOpenAddStationModal(false);
        setInAddNewStationMode(false);
    }

    const handleOpenModal = () => {
        setOpenAddStationModal(true);
    }

    const handleCloseBookModal = () => {
        setOpenBookModal(false);
    }

    return (
        <div className="landing">
            <div className="main-container">
                <MapDashboard
                    inAddNewStationMode={inAddNewStationMode}
                    setInAddNewStationMode={setInAddNewStationMode}
                    handleOpenModal={handleOpenModal}
                    handleAddStationModalClose={handleAddStationModalClose}
                    openAddStationModal={openAddStationModal}
                    newStationCoords={newStationCoords}
                    setOpenAddStationModal={setOpenAddStationModal}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                    openBookModal={openBookModal}
                    setOpenBookModal={setOpenBookModal}
                    handleCloseBookModal={handleCloseBookModal}
                />
                <Map
                    newStationCoords={newStationCoords}
                    setNewStationCoords={setNewStationCoords}
                    inAddNewStationMode={inAddNewStationMode}
                    setOpenAddStationModal={setOpenAddStationModal}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                />
            </div>
        </div>
    );
}

export default LandingView;