import express from 'express'
import { licenceDeviceRouter } from '../licenceDevice/licenceDevice.resRoute';
import {
    getData,
    updateData,
    deleteData,
    insertData,
    getCompanyId,
    getStationLatLon
} from './licenceStation.controller'
export const licenceStationRouter = express.Router();

licenceStationRouter.get("/getData",getData)
licenceStationRouter.post("/insertData",insertData)
licenceStationRouter.post("/updateData",updateData)
licenceStationRouter.post("/deleteData",deleteData)
licenceStationRouter.get("/getCompanyId",getCompanyId)
licenceStationRouter.get("/getStationLatLon",getStationLatLon)
