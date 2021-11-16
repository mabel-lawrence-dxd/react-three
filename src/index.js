import React from "react";
import ReactDOM from "react-dom";
import threeEntryPoint from "./threeEntryPoint"

class App extends React.Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  render() {
    return (
      <div
        className="header-header"
        ref={(element) => (this.threeRootElement = element)}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
