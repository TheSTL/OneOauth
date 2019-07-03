import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    method:String,
    local:{
        username:String,
        photo:{
            data:Buffer,
            contentType:String
        },
        email:String,
        password:String   
    },
    google:{
        id:String,
        username:String,
        acessToken:String,
        refreshToken:String,
        email:String,
        photo:String
    },
    github:{
        id:String,
        username:String,
        photo:String,
        location:String,
        follower:String,
        following:String,
        bio:String,
        created:Date,
        updated:Date
    }
},{collection:'user'})

UserSchema.methods.hashPassword= async function(){
    this.local.password= await bcrypt.hash(this.local.password,10);
}
UserSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.local.password);
}

export default mongoose.model('user',UserSchema)