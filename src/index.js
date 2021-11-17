import React from "react";
import ReactDOM from "react-dom";
import styles from './styles.css'
import threeEntryPoint from "./threeEntryPoint";
import BrandMoment from "./BrandMoment.js";
import clickedInfo from "./clickedInfo.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      imageIsSelected: false,
      selectedImage: undefined,
      showBrand: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    console.log('react on click')
    let message = clickedInfo();
    console.log('message from clicked info in react onClick: ', message)
    // this.setState({...this.state, showBrand: !this.state.showBrand})
    // this.forceUpdate();
  }

  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  componentDidUpdate(){
    console.log('comp did update')
  }

  render() {
    console.log('state in render: ',this.state)
    return (
      <div>
      <div
      id="three-component"
      ref={(element) => {
        this.threeRootElement = element;
      }}
      onClick = {() => this.onClick()}
      />
      {this.state.showBrand?<BrandMoment/>:<div></div>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
