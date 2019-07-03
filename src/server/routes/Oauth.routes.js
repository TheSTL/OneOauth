import { Router } from 'express'
import passport from 'passport'

import {localSignin,localSignup, googleHandler,facebookHandler,
githubHandler
} from '../handler/Oauth.handler'

const router= Router();
router.route('/local/signup').post(localSignup)

router.route('/local/signin').post( (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        try{
            if(info){throw new Error(info.message)}
            else {
                req.user=user;
                next()
            }    
        }
        catch(err){
            next(err)
        }
        
    })(req,res,next) 

},localSignin )

router.route('/google').get(passport.authenticate('google'));
router.route('/google/callback').get(passport.authenticate('google'),googleHandler)

router.route('/facebook').get(passport.authenticate('facebook'));
router.route('/facebook/callback').get(passport.authenticate('google'),facebookHandler)

router.route('/github').get(passport.authenticate('github'));
router.route('/github/callback').get(passport.authenticate('github'),githubHandler)

export default router;