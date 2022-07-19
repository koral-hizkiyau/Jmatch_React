import React, { Component } from "react";
import './style/css/pagenotfound.css'

class TempTry extends Component {


  render() {
    return (
      <div style={{backgroundColor:"lightblue"}} id="notfound">
        <div className="notfound">
          <div className="notfound-bg">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 style={{fontSize:"104px"}}>oops!</h1>
          <h2>Error 404 : Page Not Found</h2>
          <a id="pnf" href="#">go back</a>
          <div className="notfound-social">
        
          </div>
        </div>
      </div>

    );
  }
}

export default TempTry;


