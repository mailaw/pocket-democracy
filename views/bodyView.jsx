import React, { Component } from "react";
import Demo from "./demo";
import Img from "react-image";
import MenuItems from "./menuitem";
import "./style.css";

export default class BodyView extends Component {
  state = {
    candidateNo: 1
  };

  handleClick = cno => {
    this.setState({ candidateNo: cno });
  };

  render() {
    return (
      <div>
        <Img className="bgStyle" src={"images/bg.jpg"} />
        <div className="row">
          <div className="column phone-demo">
            <div className="row">
              <MenuItems handleClick={this.handleClick} />
            </div>
            <div className="row phone-demo">
              <Img className="phoneStyle" src={"images/mai.jpg"} />
              <div className="phone-view">
                <div className="scroll">
                  <Demo candidateNo={this.state.candidateNo} />
                </div>
              </div>
            </div>
          </div>

          <div className="column app-desc-container">
            <Img id="app-desc" src={"images/thai.jpg"} />
          </div>
        </div>
      </div>
    );
  }
}
