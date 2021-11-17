import React from "react";
import icon from "./pfizer_icon.png";

export default class BrandMoment extends React.Component {
  render() {
    return (
      <div id="brand-highlight">
        <div className="highlight-image">
          <img alt="pfizer logo" src={icon} />
        </div>
        <div className="highlight-right-col">
          <div className="highlight-info brand">
            <div className="quote">
              <p>
                Since its inception, the Pfizer Hall of Fame has been
                recognizing the finest members of the U.S. Field Force. To
                qualify, colleagues must win 6 annual awards. In 30 years, only
                500 colleagues have achieved this prestigious award.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
