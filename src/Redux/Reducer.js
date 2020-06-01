import { AIRPORTS, AIRCRAFTS } from "../Utils/Data";
import { ADD_TRANSACTION, REVERSE_TRANSACTION, ADD_AIRPORT, ADD_AIRCRAFT, CREATE_TRANS_FROM_AIRPORT } from "./ActionTypes";
import { handleTransactionFromAirport, updateAirportsOnReverse } from "./Actions";

const commonInitialState = {
    airports: AIRPORTS,
    aircrafts: AIRCRAFTS,
    transactions: []
}

export const commonReducer = (state = commonInitialState, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            let airportsResult = updateAirportsOnReverse(state.airports, action.data)
            return {
                ...state,
                transactions: airportsResult.updated ? [...state.transactions, action.data] : state.transactions,
                airports: airportsResult.updated ? airportsResult.airports : state.airports
            }
        case REVERSE_TRANSACTION:
            return {
                ...state,
                transactions: [...state.transactions, action.data]
            }
        case ADD_AIRPORT:
            return {
                ...state,
                airports: [...state.airports, action.data]
            }
        case ADD_AIRCRAFT:
            return {
                ...state,
                aircrafts: [...state.aircrafts, action.data]
            }
        case CREATE_TRANS_FROM_AIRPORT:
            let result = handleTransactionFromAirport(state.airports, action.airport, action.fuelAction)
            return {
                ...state,
                airports: result.updated ? result.airports : state.airports,
                transactions: result.updated ? [...state.transactions, result.transaction] : state.transactions
            }
        default:
            return state
    }
}