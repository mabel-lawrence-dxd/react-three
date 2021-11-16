import React from "react";
import ReactDOM from "react-dom";
import threeEntryPoint from "./threeEntryPoint"

class App extends React.Component {
  constructor(props){
    super(props);
    this.imageIsSelected =  false;
    this.selectedImage = undefined;
  }

  componentDidMount() {
    let message = threeEntryPoint(this.threeRootElement);
    console.log(message)
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
