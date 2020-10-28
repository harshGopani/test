import express from 'express'
import {userRouter} from './user'
import {licenceStationRouter} from './licenceStation'
import { licenceDeviceRouter } from './licenceDevice/licenceDevice.resRoute';
import { tankRouter } from './tank';
import { fuelRouter } from './fuel/fuel.resRoute';
import { customerNamesRouter } from './customerNames';

export const restRouter = express.Router();

restRouter.use('/user',userRouter)
restRouter.use('/licenceStation',licenceStationRouter)
restRouter.use('/licenceDevice',licenceDeviceRouter)
restRouter.use('/tank',tankRouter)
restRouter.use('/fuel',fuelRouter)
restRouter.use('/customerNames',customerNamesRouter)
