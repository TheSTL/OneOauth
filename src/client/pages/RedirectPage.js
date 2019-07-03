import React, { Component } from 'react'
import queryString from 'query-string'

export default class HelloPage extends Component {
    constructor(props){
        super(props);     
        console.log("yes");
           
    }
    componentWillMount(){
        const query= queryString.parse(this.props.location.search);
        if(query.token){
            localStorage.jwt=query.token;
            this.props.history.push('/profile');
        }
    }
    
    render() {

        return (
            <div>
                Hello page
            </div>
        )
    }
}
