import React, { Component } from 'react'
import {Switch,Route,withRouter,Redirect} from 'react-router-dom'

import HomePage from '../pages/HomePage'
import RedirectPage from '../pages/RedirectPage'
import ProfilePage from '../pages/ProfilePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

class MainRouter extends Component {
    render() {
        const authorized= localStorage.jwt? true:false;
        console.log(authorized);
        
        return (
            <div>
                    <Switch>
                    <Route path='/' exact component={ (props)=>( authorized==true? <Redirect to='/profile'/>: <HomePage {...props} />  ) } />
                    <Route path='/redirect' exact component={RedirectPage} />
                    <Route path='/profile' exact component={ProfilePage} />
                    <Route path='/signin' exact component={SignInPage} />
                    <Route path='/signup' exact component={SignUpPage} />
                    

                    </Switch>
            </div>
        )
    }
}
export default withRouter(MainRouter)
