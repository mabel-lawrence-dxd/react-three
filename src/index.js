import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.css";
import threeEntryPoint from "./threeEntryPoint";
import BrandMoment from "./BrandMoment.js";
import clickedInfo from "./clickedInfo.js";
import EmployeeHighlight from "./EmployeeHighlight";
// import headshot from "./assets/1b7eaad74f5a4a9d818f43f9e43df394__72bb3eea-f7d1-402c-8041-605b3a84c15d.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIsSelected: false,
      selectedEmployee: undefined,
      showBrand: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    let message = clickedInfo();
    let isSelected = false;
    message = message.split("/").pop().split("__").shift();
    console.log("message from clicked info in react onClick: ", message);
    if (this.state.imageIsSelected) {
      this.setState({
        ...this.state,
        imageIsSelected: false,
        selectedEmployee: undefined,
      });
    } else {
      if (message.length) {
        isSelected = true;
        let res = await fetch(`/api/employees/id/${message}`);
        let employee = await res.json();
        await console.log(employee);
        await this.setState({
          ...this.state,
          imageIsSelected: isSelected,
          selectedEmployee: employee[0],
        });
      }
    }
  }

  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  render() {
    console.log("state in render: ", this.state);
    return (
      <div>
        <div
          id="three-component"
          ref={(element) => {
            this.threeRootElement = element;
          }}
          onClick={() => this.onClick()}
        />
        {this.state.imageIsSelected ? (
          <EmployeeHighlight
            name={this.state.selectedEmployee.employeeName}
            headshot={
              "https://www.cnet.com/a/img/csgXVU5hZmVK1rmnxiHz_KwE38A=/940x0/2017/03/21/3c0946d8-1dbf-4754-bdcc-14984d9ba7b8/harry-potter-philosophers-stone.jpg"
            }
            inductionYear={this.state.selectedEmployee.inductionYear}
            secondInductionyear={
              this.state.selectedEmployee.secondInductionyear
            }
            quote={this.state.selectedEmployee.quote}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
