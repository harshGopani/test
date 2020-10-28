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
            const newitem=[];
                for(var i=0;i<Data.rows.length;i++){
                    const customerTypeData= await client.query(`select * from customer_type where id='${Data.rows[i].customer_type_id}' `)
                    Data.rows[i].customer_type_id=customerTypeData.rows[0].custype

                    const webUserTypeData= await client.query(`select * from web_user_type where user_type='${Data.rows[i].customer_group_id}' `)
                    Data.rows[i].customer_group_id=webUserTypeData.rows[0].user_name
                    
                    const limitTypeData= await client.query(`select * from limit_type where id='${Data.rows[i].limit_type}' `)
                    Data.rows[i].limit_type=limitTypeData.rows[0].limit_name
                    
                    const customerDiscountTypeData= await client.query(`select * from customer_discount_type where id='${Data.rows[i].discount_id}' `)
                    Data.rows[i].discount_id=customerDiscountTypeData.rows[0].discounttype

                    const licenceCountryData= await client.query(`select * from licence_country where id='${Data.rows[i].country_id}' `)
                    Data.rows[i].country_id=licenceCountryData.rows[0].country_name
                    
                    const companyData= await client.query(`select * from licence_company where id='${Data.rows[i].company_id}' `)
                    Data.rows[i].company_id=companyData.rows[0].company_name
                    
                    newitem.push(Data.rows[i])
                }
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

//get all customer_type_Data
export const customer_type_Data = async(req,res) =>{
    try{
        const data = await client.query(`select * from customer_type ORDER BY id ASC`)

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

//get all data from web_user_type
export const web_user_type = async(req,res) =>{
    try{
        const data = await client.query(`select user_type,user_name from web_user_type ORDER BY user_type ASC`)
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

//get all data from limit_type table
export const limit_type = async(req,res) =>{
    try{
        const data = await client.query(`select * from limit_type ORDER BY id ASC`)

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

// get all data from customer_discount_type table
export const customer_discount_type = async(req,res) =>{
    try{
        const data = await client.query(`select * from customer_discount_type ORDER BY id ASC`)

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