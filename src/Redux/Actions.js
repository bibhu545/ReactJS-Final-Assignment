import { ADD_TRANSACTION, ADD_AIRPORT, ADD_AIRCRAFT, CREATE_TRANS_FROM_AIRPORT } from "./ActionTypes"
import { Transaction } from "../Utils/Models"

export const addTransaction = (trData) => {
    return {
        type: ADD_TRANSACTION,
        data: trData
    }
}

export const reverseTransaction = (trData) => {
    return {
        type: ADD_TRANSACTION,
        data: trData
    }
}

export const addAirport = (airportData) => {
    return {
        type: ADD_AIRPORT,
        data: airportData
    }
}

export const addAircraft = (aircraftData) => {
    return {
        type: ADD_AIRCRAFT,
        data: aircraftData
    }
}

export const createTransactionFromAirport = (airportData, fuelActionData) => {
    return {
        type: CREATE_TRANS_FROM_AIRPORT,
        airport: airportData,
        fuelAction: fuelActionData,
    }
}

export const handleTransactionFromAirport = (airports, airportData, fuelActionData) => {
    let itemIndex = airports.findIndex((item => item.airportId === airportData.airportId));
    if (fuelActionData.addMode) {
        airports[itemIndex].fuelAvailable = parseInt(airports[itemIndex].fuelAvailable) + parseInt(fuelActionData.amount);
    }
    else {
        airports[itemIndex].fuelAvailable = parseInt(airports[itemIndex].fuelAvailable) - parseInt(fuelActionData.amount);
    }
    let transaction = new Transaction();
    transaction.transactionType = fuelActionData.addMode ? "IN" : "OUT";
    transaction.airportId = airportData.airportId;
    transaction.airCraftId = fuelActionData.airCraftId;
    transaction.quantity = fuelActionData.amount;
    return {
        airports: airports,
        transaction: transaction
    }
}