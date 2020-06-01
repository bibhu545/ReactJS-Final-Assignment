import { ADD_TRANSACTION, ADD_AIRPORT, ADD_AIRCRAFT, CREATE_TRANS_FROM_AIRPORT } from "./ActionTypes"
import { Transaction } from "../Utils/Models"
import { Utils } from "../Utils/Utils"

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
    let updated = true;
    if (fuelActionData.addMode) {
        let totalQuantity = parseInt(airports[itemIndex].fuelAvailable) + parseInt(fuelActionData.amount);
        if (airports[itemIndex].fuelCapacity < totalQuantity) {
            new Utils().showErrorMessage("Total Fuel is more than capacity.");
            updated = false;
        }
        else {
            airports[itemIndex].fuelAvailable = totalQuantity;
        }
    }
    else {
        if (airports[itemIndex].fuelAvailable < fuelActionData.amount) {
            new Utils().showErrorMessage("Required Fuel is more than Available.");
            updated = false;
        }
        else {
            airports[itemIndex].fuelAvailable = parseInt(airports[itemIndex].fuelAvailable) - parseInt(fuelActionData.amount);
        }
    }
    let transaction = new Transaction();
    transaction.transactionType = fuelActionData.addMode ? "IN" : "OUT";
    transaction.airportId = airportData.airportId;
    transaction.airCraftId = fuelActionData.airCraftId;
    transaction.quantity = fuelActionData.amount;
    return {
        airports: airports,
        transaction: transaction,
        updated: updated
    }
}

export const updateAirportsOnReverse = (airports, transaction) => {
    let itemIndex = airports.findIndex((item => item.airportId === transaction.airportId));
    let updated = true;
    if (transaction.transactionType === "IN") {
        let totalQuantity = parseInt(airports[itemIndex].fuelAvailable) + parseInt(transaction.quantity);
        if (airports[itemIndex].fuelCapacity < totalQuantity) {
            new Utils().showErrorMessage("Total Fuel is more than capacity.");
            updated = false;
        }
        else {
            airports[itemIndex].fuelAvailable = totalQuantity;
        }
    }
    else {
        if (airports[itemIndex].fuelAvailable < transaction.quantity) {
            new Utils().showErrorMessage("Required Fuel is more than Available.");
            updated = false;
        }
        else {
            airports[itemIndex].fuelAvailable = parseInt(airports[itemIndex].fuelAvailable) - parseInt(transaction.quantity);
        }
    }
    return {
        airports: airports,
        updated: updated
    };
}