import {User} from '../model'


const userById = async(req,res)=>{
    const {userId}= req.params;
    const user=await User.findById(userId);
    if(user.method=='local'){
        user.local.password=undefined;
    }

    res.json(user);
}

const logout = (req,res)=>{
    req.logout();
}

const getImage= async(req,res)=>{
    const {userId}= req.params;
    const user=await User.findById(userId);
    res.set('Content-Type',user.local.photo.contentType);
    return res.send(user.local.photo.data);
}

export{
    userById,
    logout,
    getImage
}
