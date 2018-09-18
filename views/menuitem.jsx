import React, { Component } from "react";
import "./style.css";

//TODO: Make names props, implement state/compononetDidMount for onClick functions
export default class MenuItems extends Component {
  static propTypes = {
    handleClick: Function
  };

  state = {
    showItem: false,
    candidateNo: 0
  };

  //   handleClick = event => {
  //     console.log("hey there");
  //     this.setState({ candidateNo: 1 });
  //   };

  _handleClick = cno => {
    this.props.handleClick(cno);
  };

  render() {
    return (
      <div className="menu-style">
        <div
          className="menu-item"
          onClick={function() {
            this._handleClick(1);
          }.bind(this)}
        >
          <a href="#">
            <p>Andrew M. Cuomo</p>
          </a>
        </div>
        <div
          className="menu-item"
          onClick={function() {
            this._handleClick(2);
          }.bind(this)}
        >
          <a href="#">
            <p>Cynthia E. Nixon</p>
          </a>
        </div>
        <div
          className="menu-item"
          onClick={function() {
            this._handleClick(3);
          }.bind(this)}
        >
          <p>Kathy C. Hochul</p>
        </div>
      </div>
    );
  }
}
