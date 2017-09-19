import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      InputEmail : '',
      InputPassword : ''
    }
  }

  handleClick(){
      var payload = {
        "Email" : this.state.InputEmail,
        "Password" : this.state.InputPassword
      }
      this.props.Clicked(payload);
  }

  render(){
    return(
        <div>
          <MuiThemeProvider style={{ alignItems: 'center'}}>
            <div>
            <AppBar
              title="Login"
            />
            <div style={{    flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center' }}>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event,newValue) => this.setState({InputEmail:newValue})}
              />
            <br/>
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({InputPassword:newValue})}
                />
              <br/>
              <RaisedButton label="Submit" 
              primary={true} 
              style={style} 
              onClick={this.handleClick.bind(this)}/>
              </div>
          </div>
          </MuiThemeProvider>
        </div>
    );
  }
}

const style = {
 margin: 15,
};

export default LoginForm;