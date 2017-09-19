import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Bot from './Bot'

class Login extends React.Component {
    render() {
        return(
            this.props.check ?
            <p>Đúng nè</p>
            :
            <p>Sai nè</p>
        )
    }
}


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsPressed : true,
            id : ""
        }
    }

    handleClick(user){
        fetch('http://localhost:8080/api', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        }).then(res=> res.json())
        .then(res => {
            console.log(res.id);
            if(res.checked === true) {
                this.setState({
                    IsPressed : false,
                    id : res.id
                });
            }
        })
        .catch(err=> console.error(err));
    }

    botStart() {
        window.location = '/api/'+this.state.id;
    }

    botEnd() {
        window.location = '/api/'+this.state.id+'/logout';
    }

    render() {
        return (
            // <div>
            //     <LoginForm Clicked= {this.handleClick.bind(this)}/>
            //     <Login check={this.state.IsPressed}/>
            // </div>
            this.state.IsPressed ?
            <LoginForm 
             Clicked= {this.handleClick.bind(this)}
            />
            :
            <Bot
             Start= {this.botStart.bind(this)}
             End={this.botEnd.bind(this)}
            />
        );
    }
}
