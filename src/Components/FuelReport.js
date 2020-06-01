import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Transaction } from "../Utils/Models";
import { addTransaction, reverseTransaction } from '../Redux/Actions';
import { getRandomId } from '../Utils/Utils';
import withCommonHOC from '../Utils/withCommonHOC';

function FuelReport(props) {

    const [transaction, setTransaction] = useState(new Transaction())
    const [showModal, setShowModal] = useState(false)

    const closeTransactionModal = () => {
        setTransaction(new Transaction());
        setShowModal(false);
    }

    const setTransactionValues = (e) => {
        let name = e.target.name
        let value = e.target.value
        let tempTrans = { ...transaction }
        tempTrans[name] = value
        setTransaction(tempTrans)
    }

    const createTransaction = (e) => {
        e.preventDefault();
        props.addTransaction(transaction);
        setTransaction(new Transaction());
        setShowModal(false);
    }

    const onReverseTransaction = (item) => {
        let itemCopy = { ...item }
        if (itemCopy.transactionType === "IN") {
            itemCopy.transactionType = "OUT";
        }
        else if (itemCopy.transactionType === "OUT") {
            itemCopy.transactionType = "IN";
        }
        itemCopy.transactionIdParent = item.transactionId;
        itemCopy.transactionId = getRandomId()
        props.reverseTransaction(itemCopy);
    }

    const [summaryModal, setSummaryModal] = useState(false)

    const viewSummary = () => {
        let result = props.transactions.reduce((r, a) => {
            r[a.airportId] = r[a.airportId] || [];
            r[a.airportId].push(a);
            return r;
        }, Object.create(null));
        let reportJsx = [];
        let keyIndex = 0;
        for (let [key, value] of Object.entries(result)) {
            let keyName = props.airports.find(item => item.airportId === key).airportName;
            reportJsx.push(<tr key={key}><td colSpan="4"><strong>{keyName}</strong></td></tr>);
            reportJsx.push(
                <tr key={keyIndex}>
                    <td>Date</td>
                    <td>Type</td>
                    <td>Quantity</td>
                    <td>Aircraft Id</td>
                </tr>
            )
            value.map((item, index) =>
                reportJsx.push(
                    <tr key={item.transactionId}>
                        <td>{item.transactionDateTime}</td>
                        <td>{item.transactionType}</td>
                        <td>{item.quantity}</td>
                        <td>{item.airCraftId === "" ? "N/A" : item.airCraftId}</td>
                    </tr>
                )
            );
            keyIndex++;
        }
        return <table className="table table-bordered"><tbody>{reportJsx}</tbody></table>;
    }

    return (
        <React.Fragment>
            <div className="table-container">
                <h3 className="text-primary">
                    Transactions
                    <button className="btn btn-light" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button className="btn btn-primary float-right" onClick={() => setSummaryModal(true)}>View Summary</button>
                </h3>
                {
                    props.transactions.length === 0 ?
                        <h4 className="center-content">No Transactions yet.</h4> :
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped data-table">
                                <thead>
                                    <tr>
                                        <th>#Id</th>
                                        <th onClick={() => props.sortData(props.transactions, "transactionDateTime")}>Date</th>
                                        <th onClick={() => props.sortData(props.transactions, "transactionType")}>Type</th>
                                        <th onClick={() => props.sortData(props.transactions, "airportId")}>Airport Id</th>
                                        <th onClick={() => props.sortData(props.transactions, "airCraftId")}>Aircraft Id</th>
                                        <th onClick={() => props.sortData(props.transactions, "quantity")}>Quantity</th>
                                        <th onClick={() => props.sortData(props.transactions, "transactionIdParent")}>Parent Id</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        props.transactions.map((item, index) =>
                                            <tr key={item.transactionId}>
                                                <td>{item.transactionId.toUpperCase()}</td>
                                                <td>{item.transactionDateTime}</td>
                                                <td>{item.transactionType}</td>
                                                <td>{item.airportId}</td>
                                                <td>{item.airCraftId === "" ? "N/A" : item.airCraftId}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.transactionIdParent === "" ? "N/A" : item.transactionIdParent.toUpperCase()}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" onClick={() => onReverseTransaction(item)}>
                                                        <i className="fa fa-retweet"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                }
                {

                    !showModal ? null :
                        <div className="modal-wrapper">
                            <div className="custom-modal">
                                <div className="custom-modal-header">
                                    <h5>
                                        Add New Transacation
                                        <i className="fa fa-times-circle float-right" onClick={closeTransactionModal}></i>
                                    </h5>
                                </div>
                                <div className="custom-modal-body">
                                    <form onSubmit={createTransaction}>
                                        <div className="form-group">
                                            <label htmlFor="airportId">Airport:</label>
                                            <select required className="form-control" id="airportId" name="airportId" value={transaction.airportId} onChange={setTransactionValues} >
                                                <option value="">Select</option>
                                                {
                                                    props.airports.map((item, index) =>
                                                        <option key={item.airportId} value={item.airportId} >{item.airportName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="transactionType">Transaction Type:</label>
                                            <select required className="form-control" id="transactionType" name="transactionType" value={transaction.transactionType} onChange={setTransactionValues}>
                                                <option value="">Select</option>
                                                <option value="IN">IN</option>
                                                <option value="OUT">OUT</option>
                                            </select>
                                        </div>
                                        {
                                            transaction.transactionType === "OUT" ?
                                                <div className="form-group">
                                                    <label htmlFor="aircraftId">Air Craft:</label>
                                                    <select required className="form-control" id="airCraftId" name="airCraftId" value={transaction.airCraftId} onChange={setTransactionValues} >
                                                        <option value="">Select</option>
                                                        {
                                                            props.aircrafts.map((item, index) =>
                                                                <option key={item.airCraftId} value={item.airCraftId} >{item.airCraftNo}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                : null
                                        }
                                        <div className="form-group">
                                            <label htmlFor="quantity">Quantity: </label>
                                            <input required type="number" className="form-control" id="quantity" name="quantity" value={transaction.quantity} onChange={setTransactionValues} />
                                        </div>
                                        <div className="center-content">
                                            <button type="submit" className="btn btn-light">Submit</button>
                                            <button type="button" className="btn btn-light" onClick={closeTransactionModal}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                }

                {

                    !summaryModal ? null :
                        <div className="modal-wrapper">
                            <div className="custom-modal">
                                <div className="custom-modal-header">
                                    <h5>
                                        Transacation Report
                                        <i className="fa fa-times-circle float-right" onClick={() => setSummaryModal(false)}></i>
                                    </h5>
                                </div>
                                <div className="custom-modal-body">
                                    {
                                        viewSummary()
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        </React.Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
        airports: state.airports,
        aircrafts: state.aircrafts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTransaction: (data) => dispatch(addTransaction(data)),
        reverseTransaction: (data) => dispatch(reverseTransaction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCommonHOC(FuelReport))
