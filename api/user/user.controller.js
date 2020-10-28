import configKey from '../../config'
import jwt from 'jsonwebtoken';
import {client} from '../../server'

export const getProfile = async(req,res) =>{
    try{
        const decoded =jwt.decode(req.headers.token)
        console.log("email::",decoded.sub);
        const profileData= await client.query(`select * from users where email='${decoded.sub}'`)
        // console.log("-=-==-=-=-=-=profiledata::",profileData.rows);
        if(profileData.rows.length<=0){
            res.status(401).send({
                success:false,
                message:'somthing goes to wrong in find data'
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
