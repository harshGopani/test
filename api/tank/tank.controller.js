import {client} from '../../server'

export const getcompanyData = async(req,res) =>{
    try{
        const data= await client.query(`SELECT * FROM licence_company`)
        // console.log(profileData);
        if(data.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data find successfully',
                data:data.rows,
            })
        }
    }
    catch(err){
        res.status(401).send({
            success:false,
            message:err.message
        })
    }
}

export const getfueldata = async(req,res) =>{
    try{
        var {companyId,stationId,fuelId,date} = req.body;
        const Pdate = date.split("T")[0]

        const data= await client.query(`SELECT data_creation_time,gross_fuel_vol,water_level FROM tank_data where company_code=${companyId} AND station_code=${stationId} AND fuel_type_id=${fuelId} AND date(data_creation_time)='${Pdate}'`)
        if(data.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data find successfully',
                data:data.rows,
            })
        }
        // console.log("timestamp",JSON.stringify(data.rows[0].data_creation_time);
    }
    catch(err){
        res.status(401).send({
            success:false,
            message:err.message
        })
    }
}