import React, { Component } from "react";
import { fields } from "./fields";
import Demo from "./demo";
import MenuItems from "./menuitem.jsx";
import "./style.css";

export default class PhoneView extends Component {
  state = {
    candidateNo: 1
  };

  handleClick = cno => {
    this.setState({ candidateNo: cno });
  };

  render() {
    return (
      <div>
        <div>
          <MenuItems handleClick={this.handleClick} />
        </div>
        <div className="phone-view">
          <div className="scroll">
            <Demo candidateNo={this.state.candidateNo} />
          </div>
        </div>
      </div>
    );
  }
}
