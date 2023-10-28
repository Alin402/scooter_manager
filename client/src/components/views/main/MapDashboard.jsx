import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../generic/modal/Modal";
import AddNewStation from "./map-operations/AddNewStation";
import BookScooter from "./map-operations/BookScooter";

const MapDashboard = ({ inAddNewStationMode, 
    setInAddNewStationMode, 
    handleAddStationModalClose, 
    handleOpenModal,
    openAddStationModal,
    newStationCoords,
    setOpenAddStationModal,
    selectedStation,
    setSelectedStation,
    openBookModal,
    setOpenBookModal,
    handleCloseBookModal,
    setRefresh
}) => {
    const user = useSelector(state => state.user);

    return (
        <>
            <div className="map-dashboard">
                {
                    user.userData.isAdmin ?
                    <>
                    <div style={{ display: "flex" }}>
                        <button className="btn" onClick={() => { setInAddNewStationMode(!inAddNewStationMode) }}>
                            {
                                inAddNewStationMode ? "Exit" :
                                "Add new station"
                            }
                        </button>
                        {
                            inAddNewStationMode &&
                                <div className="add-station-mode">
                                    Please select a point on the map to add the station
                                </div>
                        }
                    </div>
                    </> :
                    <>
                    {
                        selectedStation &&
                            <button className="btn" onClick={() => { setOpenBookModal(true) }}>
                                Book station {selectedStation.name}
                            </button>
                    }
                    </>
                }
            </div>
            <Modal 
                open={openAddStationModal}
                handleClose={handleAddStationModalClose}
            >
                <AddNewStation
                    newStationCoords={newStationCoords}
                    setOpenAddStationModal={setOpenAddStationModal}
                    setInAddNewStationMode={setInAddNewStationMode}
                    setRefresh={setRefresh}
                />
            </Modal>

            <Modal 
                open={openBookModal}
                handleClose={handleCloseBookModal}
            >
                <BookScooter
                    newStationCoords={newStationCoords}
                    setOpenAddStationModal={setOpenAddStationModal}
                    setInAddNewStationMode={setInAddNewStationMode}
                    station={selectedStation}
                    setOpenBookModal={setOpenBookModal}
                />
            </Modal>
        </>
    )
}

export default MapDashboard;