import { User } from "../model";
import jwt from 'jsonwebtoken'
import formidable from 'formidable'
import fs from 'fs'

const localSignin= (req,res)=>{
    const _id= req.user._id;
    const token  = jwt.sign({_id},process.env.SECRET);
    res.json({
        token
    })
}
const localSignup=async(req,res,next)=>{
        
        let form = new formidable.IncomingForm();
        form.keepExtensions=true;
        const data =await new Promise((resolve,reject)=>{

            form.parse(req,(err,fields,files)=>{
                if(err){
                    reject(err)
                }
                resolve({
                    fields,
                    files
                })
            })

        } )


    
    const {fields,files}= data;

    let user  = new User({
        method:'local',
         local:{
          ...fields
         }
    })
    if(files.image){
        user.local.photo.data = fs.readFileSync(files.image.path);
        user.local.photo.contentType=files.image.type
    }
    await user.hashPassword()

    await user.save()
    
    res.json(user)
    

}

const googleHandler = (req,res)=>{
    const _id=req.user._id
    const token= jwt.sign({_id},process.env.SECRET)
    
    res.redirect(`/redirect?token=${token}`);
}

const facebookHandler = (req,res)=>{

}

const githubHandler= (req,res)=>{
    console.log(req.user);
    
    const _id=req.user._id
    const token= jwt.sign({_id},process.env.SECRET)
    
    res.redirect(`/redirect?token=${token}`);
}

export{
    localSignin,
    localSignup,
    googleHandler,
    facebookHandler,
    githubHandler
}