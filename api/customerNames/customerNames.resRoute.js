import express from 'express'
import {
    getData,
    updateData,
    deleteData,
    insertData,
    countryCode,
    supplierData,
    distributorData
} from './customerNames.controller'
export const customerNamesRouter = express.Router();

customerNamesRouter.get("/getData",getData)
customerNamesRouter.post("/insertData",insertData)
customerNamesRouter.post("/updateData",updateData)
customerNamesRouter.post("/deleteData",deleteData)
customerNamesRouter.get("/countryCode",countryCode)
customerNamesRouter.get("/supplierData",supplierData)
customerNamesRouter.get("/distributorData",distributorData)
