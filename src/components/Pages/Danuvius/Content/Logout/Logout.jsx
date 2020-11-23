import React, { Component } from 'react';
import { Button,Header } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";

class Logout extends Component {
    constructor() {
        super();
        this.state = {
          redirect: null,
        };
      }
    
    _redirectHandler(){
        localStorage.clear()
        this.setState({ redirect: "/" });
    }
    
    render() { 
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
          }
        return ( <>
            <Header>Are you sure you want to logout?</Header>
            <Button color="red" fluid onClick={this._redirectHandler.bind(this)}>Yes</Button>            
        </> );
    }
}
 
export default Logout;