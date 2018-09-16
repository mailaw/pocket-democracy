import React from "react";
import { string, func } from "prop-types";

function WidgetHeader({ title, description, onShowQuery }) {
  return (
    <div>
      <div className="widget--header">
        <h2 className="base--h2 widget--header-title">{title}</h2>
        <div className="widget--header-spacer" />
      </div>
      <p className="base--p">{description}</p>
    </div>
  );
}

WidgetHeader.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  onShowQuery: func.isRequired
};

export default WidgetHeader;
