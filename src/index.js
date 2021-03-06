import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.css";
import threeEntryPoint from "./three/threeEntryPoint";
import BrandMoment from "./Components/BrandMoment.js";
import clickedInfo from "./clickedInfo.js";
import clickedSearch from "./clickedSearch.js";
import EmployeeHighlight from "./Components/EmployeeHighlight";
import SearchDial from "./Components/SearchDial";
import TempSearchResults from "./Components/TempSearchResults";
// import headshot from "./assets/1b7eaad74f5a4a9d818f43f9e43df394__72bb3eea-f7d1-402c-8041-605b3a84c15d.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIsSelected: false,
      selectedEmployee: undefined,
      selectedSearch: undefined,
      searchResults: [],
      showBrand: false,
    };
    this.onClick = this.onClick.bind(this);
    this.searchYear = this.searchYear.bind(this);
  }

  async onClick() {
    console.log(">>>> On click in react");
    let employeeId = clickedInfo();
    let clickedPos = clickedSearch();
    let isSelected = false;
    let xPx, yPx;

    //check to see if activated a search icon
    if (clickedPos.x) {
      console.log("clicked pos in react on click: ", clickedPos);
      const { x, y } = clickedPos;
      xPx = window.innerWidth / 2 + x;
      yPx = window.innerHeight / 2 - y;
      console.log("CLICKED SEARCH in react on click");
      // console.log("actual px: ", xPx, yPx);
      this.setState({ ...this.state, selectedSearch: { x: xPx, y: yPx } });
    } else if (this.state.selectedSearch) {
      this.setState({ ...this.state, selectedSearch: undefined });
    }

    employeeId = employeeId.split("/").pop().split("__").shift();
    if (this.state.imageIsSelected) {
      this.setState({
        ...this.state,
        imageIsSelected: false,
        selectedEmployee: undefined,
      });
    } else {
      if (employeeId.length) {
        console.log(
          "employeeId from clicked info in react onClick: ",
          employeeId
        );
        isSelected = true;
        let res = await fetch(`/api/employees/id/${employeeId}`);
        let employee = await res.json();
        await console.log(employee);
        //TEMP FIX FOR HEADSHOT LINK
        let empFixedHeadshot = employee[0];
        empFixedHeadshot.headshot = empFixedHeadshot.headshot.split('/').pop()+'.png'
        await this.setState({
          ...this.state,
          imageIsSelected: isSelected,
          selectedEmployee: empFixedHeadshot,
        });
      }
    }
  }

  async searchYear(year) {
    console.log(">>> In search year with year: ", year);
    try {
      let res = await fetch(`/api/years/${year}`);
      let employees = await res.json();
      await console.log(employees);
      this.setState({
        ...this.state,
        selectedSearch: undefined,
        searchResults: employees,
      });
      clickedSearch({});
    } catch (error) {
      console.log("issue searching by year, ", error);
    }
  }

  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }

  render() {
    console.log("state in render: ", this.state);
    let enterX, enterY;
    if (this.state.selectedSearch) {
      enterX = this.state.selectedSearch.x;
      enterY = this.state.selectedSearch.y;
    }
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
            headshot={`http://localhost:8080/${this.state.selectedEmployee.headshot}`}
            inductionYear={this.state.selectedEmployee.inductionYear}
            secondInductionyear={
              this.state.selectedEmployee.secondInductionyear
            }
            quote={this.state.selectedEmployee.quote}
          />
        ) : (
          <div></div>
        )}
        {this.state.selectedSearch ? (
          <div
            onClick={() => {
              const year =
                document.getElementsByClassName("value")[0].innerHTML;
              this.searchYear(year);
            }}
          >
            <SearchDial
              left={this.state.selectedSearch.x}
              top={this.state.selectedSearch.y}
            />
          </div>
        ) : (
          <div></div>
        )}
        {this.state.searchResults.length ? (
          <div
            onClick={() => {
              console.log("clicked search results");
              this.setState({ ...this.state, searchResults: [] });
            }}
          >
            <TempSearchResults results={this.state.searchResults} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
