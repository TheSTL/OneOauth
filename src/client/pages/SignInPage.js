import React, { Component } from 'react'
import axios from 'axios'

export default class SignInPage extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            err:''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
   async handleSubmit(event){
        event.preventDefault();

       const response =await axios.post(`/api/oauth/local/signin`,this.state)       
        
       const {token,err}= response.data;
       if(err){
        this.setState({err})
       } 
       else{
        this.props.history.push(`/redirect?token=${token}`)

       }

    }

    render() {
        const {username,password,err}= this.state;
           
        return (
            <div>
                <h1>Local Login Page</h1>
                <form onSubmit={this.handleSubmit}>
                {err} <br/>
                <label htmlFor="usename">Username</label>
                <input type='text' name='username' onChange={this.handleChange} value={username} /> <br/>
                <label htmlFor="password">Password</label>
                <input type="text" name='password' onChange={this.handleChange} value={password} /> <br/>
                <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}
