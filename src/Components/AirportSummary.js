import React from 'react'
import { connect } from 'react-redux'
import withCommonHOC from '../Utils/withCommonHOC'

function AirportSummary(props) {
    return (
        <React.Fragment>
            <div className="table-container">
                <h3 className="center-content text-primary">
                    Airport Fuel Summary
                </h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped data-table">
                        <thead>
                            <tr>
                                <th>Sl no.</th>
                                <th onClick={() => props.sortData(props.airports, "airportName")}>Name</th>
                                <th onClick={() => props.sortData(props.airports, "fuelCapacity")}>Fuel Capacity</th>
                                <th onClick={() => props.sortData(props.airports, "fuelAvailable")}>Fuel Available</th>
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        airports: state.airports
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCommonHOC(AirportSummary))
