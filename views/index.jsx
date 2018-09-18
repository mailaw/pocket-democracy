import React from "react";
import { Header, Jumbotron, Footer } from "watson-react-components";
import BodyView from "./bodyView";

//import Background from "../public/images/1.png";
import "./style.css";

export default function Index() {
  return (
    <div>
      {/* TODO: Insert background 
      <Header
        mainBreadcrumbs="Watson News Intelligence Starter Kit"
        mainBreadcrumbsUrl="#"
        subBreadcrumbs="WatsonNewsIntelligenceInformedVoter"
        subBreadcrumbsUrl=""
      /> */}
      <BodyView className="bodyStyle" />
    </div>
  );
}
