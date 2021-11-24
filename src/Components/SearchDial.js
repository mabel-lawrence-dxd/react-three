import { ReactThreeFiber } from "@react-three/fiber";
import React from "react";
import { Knob, Scale, Value, Arc } from "./rc-knob";

export default class Dial extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Knob
          size={300}
          angleOffset={0}
          angleRange={240}
          steps={30}
          min={1992}
          max={2022}
          marginLeft={this.props.left - 150}
          marginTop={this.props.top - 150}
          className="dial"
        >
          <Arc
            className="dial-arc"
            arcWidth={1.5}
            radius={120}
            color={"#7AD7F0"}
          />
          <circle
            className="inner-circle static-circle"
            r="20"
            cx="50%"
            cy="50%"
          />
          <circle
            className="outer-circle static-circle"
            r="60"
            cx="50%"
            cy="50%"
          />
          <Scale
            tickWidth={2}
            tickHeight={5}
            radius={100}
            type="circle"
            activeClassName="activeScale"
            className="normalScale"
          />
          <Value marginBottom={5} className="value" />
        </Knob>
      </div>
    );
  }
}
