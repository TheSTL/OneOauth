import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import {Strategy as FacebookStrategy} from 'passport-facebook'
import {Strategy as TwiterStrategy} from 'passport-twitter'
import {Strategy as GitHubStrategy} from 'passport-github2'

import {User}from '../model'


passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser(async(id,done)=>{
    const user=await User.findById(id)
    done(null,user)
})


passport.use( new GoogleStrategy({
clientID:process.env.GoogleclientID,
clientSecret:process.env.GoogleclientSecret,
callbackURL:process.env.GooglecallbackURL,
scope:['profile','email']
},async(acessToken,refreshToken,profile,done)=>{    
    try {
    const user=await User.findOne({'google.id':profile.id})
    
    if(user){
        
        return done(null,user)
    }
    const newUser = new User({
        method:'google',
        google:{
            id:profile.id,
            username:profile.displayName,
            photo:profile.photos[0].value,
            email:profile.emails[0].value
        }
    })
    
    
    await newUser.save()
    done(null,newUser)
    }
    catch(err){
        console.log(err);
        
    }


}) )



passport.use( new LocalStrategy({
  usernameField:'username',
  passwordField:'password'  
},async(username,password,done)=>{
    
    const user = await User.findOne({ 'local.username':username});
        
    if(!user){
        return done(null,false,{message:'Invalid Username'})
    }
    if(!user.comparePassword(password)){
        return done(null,false,{message:'Invalid Password'})
    }
    return done(null,user)

} ))




passport.use(new GitHubStrategy({
    clientID: process.env.GithubclientID,
    clientSecret:process.env.GithubclientSecret,
    callbackURL: process.env.GithubcallbackURL
  },
  async(accessToken, refreshToken, profile, done)=>{
    const user = await User.findOne({"github.id":profile.id})
    console.log(profile);
    
    if(user){
        return done(null,user)
    }
    const newUser = new User({
        method:'github',
        github:{
            id:profile._json.id,
            username:profile._json.name,
            location:profile._json.location,
            bio:profile._json.bio,
            created:profile._json.created_at,
            updated:profile._json.updated_at,
            photo:profile._json.avatar_url,
            follower:profile._json.follower_url,
            following_url:profile._json.following_url
        }
    })
    console.log(newUser);
    
    
    newUser.save()
    
    return done(null,newUser)    
  }
));