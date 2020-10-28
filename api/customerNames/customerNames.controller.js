import configKey from '../../config'
import jwt from 'jsonwebtoken';
import {client} from '../../server'

export const getData = async(req,res) =>{
    try{
        const Data= await client.query(`select * from Customer_names ORDER BY id ASC`)
        // console.log(Data);
        if(Data.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            // const newitem=[];
            //     for(var i=0;i<Data.rows.length;i++){
            //         const companyData= await client.query(`select * from licence_company where id='${Data.rows[i].company_code}' `)
            //         Data.rows[i].company_code=companyData.rows[0].company_name
            //         newitem.push(Data.rows[i])
            //     }
            res.status(201).send({
                success:true,
                message:'data find successfully',
                data:Data.rows,

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
        var {customer_name,erp_code,address,village_code,city_code,country_code,contact_person,email,phone,cell,tax_office,tax_id,customer_type_id,customer_group_id,create_date,web_user_password,web_username,limit_type,blacklist,restriction_id,discount_id,country_id,company_id}=req.body

        const profileData= await client.query(`INSERT INTO Customer_names (customer_name,erp_code,address,village_code,city_code,country_code,contact_person,email,phone,cell,tax_office,tax_id,customer_type_id,customer_group_id,create_date,web_user_password,web_username,limit_type,blacklist,restriction_id,discount_id,country_id,company_id)VALUES('${customer_name}', '${erp_code}', '${address}','${village_code}','${city_code}','${country_code}','${contact_person}','${email}','${phone}','${cell}','${tax_office}','${tax_id}','${customer_type_id}','${customer_group_id}','${create_date}','${web_user_password}','${web_username}','${limit_type}','${blacklist}','${restriction_id}','${discount_id}','${country_id}','${company_id}')`)
        // console.log(profileData);
        if(profileData.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'somthing goes to wrong in find data'
            })
        }
        else{
            const profileDataId= await client.query(`select id from Customer_names ORDER BY ID DESC LIMIT 1`)
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
        var {id,customer_name,erp_code,address,village_code,city_code,country_code,contact_person,email,phone,cell,tax_office,tax_id,customer_type_id,customer_group_id,create_date,web_user_password,web_username,limit_type,blacklist,restriction_id,discount_id,country_id,company_id}=req.body

        // const companyData= await client.query(`select * from licence_company where company_name='${company_code}' `)
        // // console.log(companyData.rows[0].id);

        // const companyCode = await client.query(`SELECT licence_country.country_code FROM licence_country INNER JOIN licence_company ON licence_country.id = licence_company.country_id where licence_company.
        // id='${companyData.rows[0].id}';`)
        // // console.log("=-=-==-=-=-=compo code",companyCode.rows[0].country_code);

        // country_code = companyCode.rows[0].country_code
        // // console.log("country_code",country_code);

        const profileData= await client.query(`UPDATE Customer_names SET customer_name='${customer_name}',erp_code='${erp_code}',address='${address}',village_code='${village_code}',city_code='${city_code}',country_code='${country_code}',contact_person='${contact_person}',email='${email}',phone='${phone}',cell='${cell}',tax_office='${tax_office}',tax_id='${tax_id}',customer_type_id='${customer_type_id}',customer_group_id='${customer_group_id}',create_date='${create_date}',web_user_password='${web_user_password}',web_username='${web_username}',limit_type='${limit_type}',blacklist='${blacklist}',restriction_id='${restriction_id}',discount_id='${discount_id}',country_id='${country_id}',company_id='${company_id}'  WHERE id = '${id}'`)
    
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
        const profileData= await client.query(`DELETE FROM Customer_names WHERE id='${id}'`)
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

export const countryCode = async(req,res) =>{
    try{
        const {companyCode} =req.body;
        const data = await client.query(`SELECT licence_country.country_code FROM licence_country INNER JOIN licence_company ON licence_country.id = licence_company.country_id where licence_company.
        id='${companyCode}';`)
        // console.log("=-=-==-=-=-=compo code",data.rows[0].country_code);
        if(data.rowCount<=0){
            res.status(401).send({
                success:false,
                message:'data not found'
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:'data deleted successfully ',
                data:data.rows[0].country_code
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

export const supplierData = async(req,res) =>{
    try{
        const data = await client.query(`select * from licence_suppliers ORDER BY id ASC`)

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

export const distributorData = async(req,res) =>{
    try{
        const data = await client.query(`select * from licence_distributor ORDER BY id ASC`)

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