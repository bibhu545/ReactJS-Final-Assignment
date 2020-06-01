import { getRandomId } from "./Utils"

export class User {
    userId = getRandomId()
    name = ""
    email = ""
    password = ""
}

export class Airport {
    airportId = getRandomId()
    airportName = ""
    fuelCapacity = 0
    fuelAvailable = 0
}

export class AirCraft {
    airCraftId = getRandomId()
    airCraftNo = ""
    airline = ""
}

export class Transaction {
    transactionId = getRandomId()
    transactionDateTime = new Date().toLocaleString()
    transactionType = ""
    airportId = ""
    airCraftId = ""
    quantity = 0
    transactionIdParent = ""
}

export class FuelAction {
    addMode = true
    amount = 0
    airCraftId = ""
}