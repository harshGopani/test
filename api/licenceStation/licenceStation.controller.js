import configKey from '../../config'
import jwt from 'jsonwebtoken';
import {client} from '../../server'

export const getData = async(req,res) =>{
    try{

        const profileData= await client.query(`select * from licence_station ORDER BY id ASC`)
        // console.log(profileData);
        
        if(profileData.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            const newitem=[];
                for(var i=0;i<profileData.rows.length;i++){
                    const companyData= await client.query(`select * from licence_company where id='${profileData.rows[i].company_code}' `)
                    profileData.rows[i].company_code=companyData.rows[0].company_name
                    newitem.push(profileData.rows[i])
                }
            res.status(201).send({
                success:true,
                message:'data find successfully',
                data:newitem,

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

export const insertData = async(req,res) =>{
    try{
        var {company_code,station_code,station_name,station_ref,altitute,longitute,status}=req.body
        if(!altitute){
            altitute=NaN
        }
        if(!longitute){
            longitute=NaN
        }
        const companyData= await client.query(`select * from licence_company where company_name='${company_code}' `)
        console.log(companyData.rows[0].id);
        const profileData= await client.query(`INSERT INTO licence_station (
            company_code,station_code,station_name,station_ref,altitute,longitute,status)VALUES('${companyData.rows[0].id}', '${station_code}', '${station_name}','${station_ref}','${altitute}','${longitute}','${status}')`)
        // console.log(profileData);


        if(profileData.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'somthing goes to wrong in find data'
            })
        }
        else{
            const profileDataId= await client.query(`select id,company_code from licence_station ORDER BY ID DESC LIMIT 1`)

            res.status(201).send({
                success:true,
                message:'data insert successfully',
                data:profileDataId.rows[0].id
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

export const updateData = async(req,res) =>{
    try{
        var {id,company_code,station_code,station_name,station_ref,altitute,longitute,status}=req.body
        if(!altitute){
            altitute=NaN
        }
        if(!longitute){
            longitute=NaN
        }
        const companyData= await client.query(`select * from licence_company where company_name='${company_code}' `)
        console.log(companyData.rows[0].id);
        const profileData= await client.query(`UPDATE licence_station SET company_code=${companyData.rows[0].id},station_code=${station_code},station_name='${station_name}',station_ref='${station_ref}',altitute='${altitute}',longitute='${longitute}',status='${status}'  WHERE id = '${id}'`)
        // console.log(profileData);
        if(profileData.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'somthing goes to wrong in find data'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data update successfully',
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

export const deleteData = async(req,res) =>{
    try{
        const {id} =req.body;
        console.log("id",id);
        const profileData= await client.query(`DELETE FROM licence_station WHERE id='${id}'`)
        if(profileData.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data deleted successfully ',
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

export const getCompanyId = async(req,res) =>{
    try{
        const companyId= await client.query(`select company_name from licence_company ORDER BY id ASC`)
        // console.log(profileData);
        if(companyId.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data find successfully',
                data:companyId.rows,
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

export const getStationLatLon = async(req,res) =>{
    try{
        const {stationId} =req.body
        const profileData= await client.query(`select altitute,longitute from licence_station where id=${stationId} `)
        // console.log(profileData);
        if(profileData.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data find successfully',
                data:profileData.rows,

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