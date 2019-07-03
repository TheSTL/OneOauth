import React, { Component } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'





export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state={ 
            loading:true
        }
        this.logout=this.logout.bind(this);
        this.userData= this.userData.bind(this);
    }
    
    async componentDidMount(){
      if(!localStorage.jwt){
          this.props.history.push('/')
          return
      }  
     const {_id}= jwt.decode(localStorage.jwt);        
     const response = await axios.get(`/api/user/${_id}`);
     const{data}=response;
     console.log(data);
     
     switch(data.method){
        case 'local':
            this.setState({
                _id,
                ...data.local,
                loading:false,
                photo:`/api/user/image/${_id}`
            })
            break;
        case 'google':
            this.setState({
                _id,
                ...data.google,
                loading:false,
                id:undefined
            })
             break;
        case 'github':
            this.setState({
                _id,
                ...data.github,
                loading:false,
                id:undefined
            })    
     }
     console.log(this.state);
     
    }



     logout(){
        localStorage.clear()
        axios.get(`/api/user/${this.state._id}/logout`)
        console.log(`/api/user/${this.state._id}/logout`);
        this.setState({
           loading:true
        })
        this.props.history.push('/')
    }


    userData(){
        const keys =Object.keys(this.state);
        const data = keys.map(key=>{
            if(key=='photo' || key=='username' || 
            key=='id' || key=='_id' || key=='loading' ){
                return ;
            }
            
            return(<div key={key}> 
              {key} : {this.state[key]}
            </div>)

        }) 
        
        return data;
    }


    render() {
        const{photo,username,loading} = this.state;
        return (
            <div>
               { !loading && (
                   <div className='profile'>
                       <div className='info name'> {username}</div>
                       <div>
                       {this.userData()}
                       </div>
                       <img src={photo} alt='' />
                       <button onClick={this.logout}>Logout</button>
                    </div>
               )}  
                
            </div>
        )
    }
}
