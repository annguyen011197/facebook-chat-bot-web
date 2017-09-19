import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Bot extends Component {

    handleClick(){
        this.props.Start();
    }

    handleClickEnd(){
        this.props.End();
    }
    
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton
                     label = "Bot Start"
                     primary = {true}
                     style={style}
                     onClick = {this.handleClick.bind(this)}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <RaisedButton
                     label = "Bot Off"
                     primary = {true}
                     style={style}
                     onClick = {this.handleClickEnd.bind(this)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
 margin: 15,
};