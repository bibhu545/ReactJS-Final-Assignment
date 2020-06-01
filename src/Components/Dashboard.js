import React, { Component } from 'react';
import Airports from './Airports';
import AirportSummary from './AirportSummary';
import FuelReport from './FuelReport';
import AirCrafts from './AirCrafts';

export class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            component: ""
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("loggedIn") !== "true") {
            window.location = "home";
        }
    }

    getComponent(component) {
        switch (component) {
            case "airports":
                return <Airports />
            case "aircrafts":
                return <AirCrafts />
            case "airportSummary":
                return <AirportSummary />
            case "fuelReport":
                return <FuelReport />
            default:
                return <Airports />
        }
    }

    logout() {
        sessionStorage.setItem("loggedIn", false);
        window.location = '/';
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 side-nav">
                        <div className="center-content"><i className="fa fa-paper-plane nav-icon" aria-hidden="true"></i></div>
                        <span className="nav-link" onClick={() => this.setState({ component: "airports" })}>
                            <div className="row">
                                <div className="col-2"><i className="fa fa-home"></i></div>
                                <div className="col-10">Airports</div>
                            </div>
                        </span>
                        <span className="nav-link" onClick={() => this.setState({ component: "aircrafts" })}>
                            <div className="row">
                                <div className="col-2"><i className="fa fa-plane"></i></div>
                                <div className="col-10">Aircrafts</div>
                            </div>
                        </span>
                        <span className="nav-link" onClick={() => this.setState({ component: "airportSummary" })}>
                            <div className="row">
                                <div className="col-2"><i className="fa fa-clipboard"></i></div>
                                <div className="col-10">Airport Summary</div>
                            </div>
                        </span>
                        <span className="nav-link" onClick={() => this.setState({ component: "fuelReport" })}>
                            <div className="row">
                                <div className="col-2"><i className="fa fa-indent"></i></div>
                                <div className="col-10">Fuel Report</div>
                            </div>
                        </span>
                        <span className="nav-link" onClick={this.logout}>
                            <div className="row">
                                <div className="col-2"><i className="fas fa-sign-out-alt"></i></div>
                                <div className="col-10">Logout</div>
                            </div>
                        </span>
                    </div>
                    <div className="col-sm-10 dashboard-content">
                        {
                            this.getComponent(this.state.component)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
