import React from 'react'
import {Link} from 'react-router-dom'
import signup from '../images/signup.png'
import signin from '../images/login.jpg'
import google from '../images/google.png'
import github from '../images/github.png'

export default function HomePage(props) {
    console.log(props);
    
    return (
        <div>
            <h1>Login with </h1>
            <div className='signin-btn'>
               <a href='/api/oauth/google'><img className='homeImage' src={google}/></a>
               <a href='/api/oauth/github'><img className='homeImage' src={github}/></a>
               <Link to='/signin'><img className='homeImage' src={signin}/> </Link>
            </div>

            <h3>Or Signup</h3>
            <Link to='/signup'><img className='homeImage' src={signup}/></Link>
        </div>
    )
}
