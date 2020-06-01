import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Airport, FuelAction } from '../Utils/Models';
import { addAirport, createTransactionFromAirport } from '../Redux/Actions';
import withCommonHOC from '../Utils/withCommonHOC';
import { Utils } from '../Utils/Utils';

function Airports(props) {

    const [showModal, setShowModal] = useState(false)
    const [showTransactionModal, setShowTransactionModal] = useState(false)
    const [airport, setAirport] = useState(new Airport())
    const [fuelAction, setFuelAction] = useState(new FuelAction())

    const closeAirportModal = () => {
        setAirport(new Airport());
        setShowModal(false);
    }

    const onAirportValueChanged = (e) => {
        let name = e.target.name
        let value = e.target.value
        let airportCopy = { ...airport }
        airportCopy[name] = value
        setAirport(airportCopy)
    }

    const createAirport = (e) => {
        e.preventDefault();
        console.log(airport)
        props.addAirport(airport);
        setShowModal(false);
    }

    const openTransactionModal = (e, item, mode) => {
        e.preventDefault();
        setFuelAction({ ...fuelAction, addMode: mode });
        setAirport(item);
        setShowTransactionModal(true);
    }

    const closeTransactionModal = () => {
        setFuelAction(new FuelAction());
        setShowTransactionModal(false);
    }

    const onFuelActionChanged = (e) => {
        let name = e.target.name
        let value = e.target.value
        let fuelActionCopy = { ...fuelAction }
        fuelActionCopy[name] = value
        setFuelAction(fuelActionCopy)
    }

    const createTransaction = (e) => {
        e.preventDefault();
        if (airport.fuelAvailable < fuelAction.amount) {
            new Utils().showErrorMessage("Required Fuel is more than Available.");
        }
        else {
            props.createTransactionFromAirport(airport, fuelAction);
            setFuelAction(new FuelAction());
            setShowTransactionModal(false);
        }
    }

    return (
        <React.Fragment>
            <div className="table-container">
                <h3 className="center-content text-primary">
                    Airports
                    <button className="btn btn-light" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus"></i>
                    </button>
                </h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped data-table">
                        <thead>
                            <tr>
                                <th>Sl no.</th>
                                <th onClick={() => props.sortData(props.airports, "airportName")}>Name</th>
                                <th onClick={() => props.sortData(props.airports, "fuelCapacity")}>Fuel Capacity</th>
                                <th onClick={() => props.sortData(props.airports, "fuelAvailable")}>Fuel Available</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.airports.map((item, index) =>
                                    <tr key={item.airportId}>
                                        <td>{index + 1}</td>
                                        <td>{item.airportName}</td>
                                        <td>{item.fuelCapacity}</td>
                                        <td>{item.fuelAvailable}</td>
                                        <td>
                                            <a href="/" onClick={(e) => openTransactionModal(e, item, true)}>Add</a> /
                                            <a href="/" onClick={(e) => openTransactionModal(e, item, false)}>Withdraw</a>
                                        </td>
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
                                    <i className="fa fa-times-circle float-right" onClick={closeAirportModal}></i>
                                </h5>
                            </div>
                            <div className="custom-modal-body">
                                <form onSubmit={createAirport}>
                                    <div className="form-group">
                                        <label htmlFor="airportName">Airport Name:</label>
                                        <input required id="airportName" name="airportName" className="form-control" value={airport.airportName} onChange={onAirportValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fuelCapacity">Capacity: </label>
                                        <input required type="number" className="form-control" id="fuelCapacity" name="fuelCapacity" value={airport.fuelCapacity} onChange={onAirportValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fuelAvailable">Available Fuel: </label>
                                        <input required type="number" className="form-control" id="fuelAvailable" name="fuelAvailable" value={airport.fuelAvailable} onChange={onAirportValueChanged} />
                                    </div>
                                    <div className="center-content">
                                        <button type="submit" className="btn btn-light">Submit</button>
                                        <button type="button" className="btn btn-light" onClick={closeAirportModal}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }

            {

                !showTransactionModal ? null :
                    <div className="modal-wrapper">
                        <div className="custom-modal">
                            <div className="custom-modal-header">
                                <h5>
                                    Add / Withdraw Fuel
                                    <i className="fa fa-times-circle float-right" onClick={closeTransactionModal}></i>
                                </h5>
                            </div>
                            <div className="custom-modal-body">
                                <form onSubmit={createTransaction}>
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount: </label>
                                        <input type="number" className="form-control" id="amount" name="amount" value={fuelAction.amount} onChange={onFuelActionChanged} />
                                    </div>
                                    {
                                        !fuelAction.addMode &&
                                        <div className="form-group">
                                            <label htmlFor="airCraftId">Aircraft ID:</label>
                                            <select id="airCraftId" name="airCraftId" className="form-control" value={fuelAction.airCraftId} onChange={onFuelActionChanged}>
                                                <option value="">Select</option>
                                                {
                                                    props.aircrafts.map((item, index) =>
                                                        <option key={item.airCraftId} value={item.airCraftId}>{item.airCraftNo}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    }
                                    <div className="center-content">
                                        <button type="submit" className="btn btn-light">Submit</button>
                                        <button type="button" className="btn btn-light" onClick={closeTransactionModal}>Cancel</button>
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
        airports: state.airports,
        aircrafts: state.aircrafts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAirport: (data) => dispatch(addAirport(data)),
        createTransactionFromAirport: (airport, fuelAction) => dispatch(createTransactionFromAirport(airport, fuelAction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCommonHOC(Airports))
