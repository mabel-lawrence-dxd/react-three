import React from "react";

export default class TempSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="search-results">
        <h3>Search Results
        </h3>
        <ul>
          {this.props.results.map((result) => {
            return <li key={result.id}>{result.employeeName} - {result.formerEmployee?'FORMER':'CURRENT'}</li>;
          })}
        </ul>
      </div>
    );
  }
}
