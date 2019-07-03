import mongoose from 'mongoose'

import User from './User.model'


mongoose.connect(process.env.mongooseUri,{useNewUrlParser:true},()=>{
    console.log('Database is connected');
    
})



export{
    User
}


