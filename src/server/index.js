
import express from 'express'
import httpsLocalhost from 'https-localhost'
import bodyParser from 'body-parser'
import passport from 'passport'
import path from'path'


import Routes from './routes'
import './model'


const app = httpsLocalhost();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('dist/public') )



import './middleware/Passport'
app.use(passport.initialize())
app.use(passport.session())


app.use('/api',Routes)


app.get('*',async(req,res)=>{
    
    res.sendFile(path.resolve(__dirname,'dist/public/index.html'))
})


app.use((err,req,res,next)=>{
    
   return res.json({
        err:err.message || 'Something went wrong'
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`Server running at port no :-${process.env.PORT}`);
    
})


