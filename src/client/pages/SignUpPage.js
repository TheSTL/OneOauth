import React, { Component } from 'react'
import axios from 'axios'
export default class SignUpPage extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            image:'',
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.data = new FormData();
    }
    handleChange(e){
        const name = e.target.name;
        const value = name=='image'? e.target.files[0]:e.target.value

        this.setState({
            [name]:value
        })
        this.data.append(name,value);
    }

    async handleSubmit(e){
        e.preventDefault()
 
        const response =await axios.post(`/api/oauth/local/signup`,this.data)       
        console.log(response.data);
        
        this.props.history.push('/')
        
        
    }

    render() {
        const {username,password,email} = this.state;
        return (
            <div>
                <h1>Signup Page</h1>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor="usename">Username</label>
                <input type='text' name='username' onChange={this.handleChange} value={username} /> <br/>

                <label htmlFor="email">Email</label>
                <input type='text' name='email' onChange={this.handleChange} value={email} /> <br/>

                <label htmlFor="image">Photo</label>
                <input type='file' name='image' onChange={this.handleChange}  /> <br/>

                <label htmlFor="password">Password</label>
                <input type="text" name='password' onChange={this.handleChange} value={password} /> <br/>

                <button type='submit'>Submit</button>
                </form>
                
            </div>
        )
    }
}
