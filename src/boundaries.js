import {
    clamp,
    subtract,
    multScalar,
    normalize
  } from "./helperFcns.js";
  import applyForce from "./applyForce.js";
  import config from "./config.js";
  const { maxForce, maxVel} = config;

export default function boundaries(tempPos, tempVel,acc, buffer) {
    let desired = null;
    let xBound = window.innerWidth/2+buffer;
    let yBound = window.innerHeight/2+buffer;
    if (tempPos.x < -xBound) {
      desired = [maxVel, tempVel.y, tempVel.z];
    } else if (tempPos.x > xBound) {
      desired = [-maxVel, tempVel.y, tempVel.z];
    }
    if (tempPos.y < -yBound) {
      desired = [tempVel.x, maxVel, tempVel.z];
    } else if (tempPos.y > yBound) {
      desired = [tempVel.x, -maxVel, tempVel.z];
    }
    if (desired !== null) {
      desired = normalize(desired);
      desired = multScalar(desired, maxVel);
      let steer = subtract(desired, [tempVel.x,tempVel.y,0]);
      steer = clamp(steer, maxForce);
      let tempAcc = applyForce(steer, acc);
      return {tempVel: desired, tempAcc};
    } else{
    return {tempVel:[tempVel.x,tempVel.y,tempVel.z], tempAcc: acc};
    }
  }