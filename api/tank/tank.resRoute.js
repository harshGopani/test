import express from 'express'
import {
    getfueldata,
    getcompanyData
} from './tank.controller'
export const tankRouter = express.Router();


tankRouter.get("/getfueldata",getfueldata)
tankRouter.get("/getcompanyData",getcompanyData)