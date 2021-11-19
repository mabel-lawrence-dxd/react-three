import React from "react";
export default class EmployeeHighlight extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('EMPLOYEE HIGHLIGHT PROPS: ', this.props)
    return (
      <div className="employee-highlight">
        <div className="highlight-image">
          <img alt="employee headshot" src={this.props.headshot} />
        </div>
        <div className="highlight-right-col employee-spotlight">
          <div className="highlight-info">
            <div className="quote small-spacing">
              <p>
                {this.props.quote}
              </p>
            </div>
            <div className="highlight-name small-spacing">
              <h4 className="small-spacing">{this.props.name}</h4>
            </div>
            <div className="highlight-induction small-spacing">{this.props.inductionYear}{this.props.secondInductionYear?', '+this.props.secondInductionYear:''} Inductee</div>
          </div>
        </div>
      </div>
    );
  }
}
