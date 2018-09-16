import React from "react";
import { Header, Jumbotron, Footer } from "watson-react-components";
import Demo from "./demo.jsx";
import PhoneView from "./phoneView";
//import Background from "../public/images/1.png";
import "./style.css";

export default function Index() {
  return (
    <div>
      <Img src={"images/bg.jpg"} />;
      {/*<Header
        mainBreadcrumbs="Watson News Intelligence Starter Kit"
        mainBreadcrumbsUrl="#"
        subBreadcrumbs="WatsonNewsIntelligenceInformedVoter"
        subBreadcrumbsUrl=""
      /> */}
      <PhoneView />
    </div>
  );
}
