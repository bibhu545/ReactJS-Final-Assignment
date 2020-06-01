import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AirCraft } from '../Utils/Models'
import { addAircraft } from '../Redux/Actions'
import withCommonHOC from '../Utils/withCommonHOC'

function AirCrafts(props) {

    const [showModal, setShowModal] = useState(false)
    const [aircraft, setAircraft] = useState(new AirCraft())

    const closeAircraftModal = () => {
        setAircraft(new AirCraft())
        setShowModal(false);
    }

    const onAircraftValueChanged = (e) => {
        let name = e.target.name
        let value = e.target.value
        let aircraftCopy = { ...aircraft }
        aircraftCopy[name] = value
        setAircraft(aircraftCopy)
    }

    const createAircraft = (e) => {
        e.preventDefault();
        props.addAircraft(aircraft);
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <div className="table-container">
                <h3 className="center-content text-primary">
                    AirCrafts
                    <button className="btn btn-light" onClick={() => setShowModal(true)}><i className="fa fa-plus"></i></button>
                </h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped data-table">
                        <thead>
                            <tr>
                                <th>Sl no.</th>
                                <th onClick={() => props.sortData(props.aircrafts, "airCraftNo")}>Aircraft No</th>
                                <th onClick={() => props.sortData(props.aircrafts, "airCraftNo")}>Airline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.aircrafts.map((item, index) =>
                                    <tr key={item.airCraftId}>
                                        <td>{index + 1}</td>
                                        <td>{item.airCraftNo}</td>
                                        <td>{item.airline}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                !showModal ? null :
                    <div className="modal-wrapper">
                        <div className="custom-modal">
                            <div className="custom-modal-header">
                                <h5>
                                    Add New Airport
                                    <i className="fa fa-times-circle float-right" onClick={closeAircraftModal}></i>
                                </h5>
                            </div>
                            <div className="custom-modal-body">
                                <form onSubmit={createAircraft}>
                                    <div className="form-group">
                                        <label htmlFor="airCraftNo">Aircraft No:</label>
                                        <input id="airCraftNo" name="airCraftNo" className="form-control" value={aircraft.airCraftNo} onChange={onAircraftValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="airline">AirCraft Id: </label>
                                        <input type="text" className="form-control" id="airline" name="airline" value={aircraft.airline} onChange={onAircraftValueChanged} />
                                    </div>
                                    <div className="center-content">
                                        <button type="submit" className="btn btn-light">Submit</button>
                                        <button type="button" className="btn btn-light" onClick={closeAircraftModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        aircrafts: state.aircrafts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAircraft: (data) => dispatch(addAircraft(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCommonHOC(AirCrafts))
