import {
    clamp,
    add,
    subtract,
    multScalar,
    divScalar,
    normalize, 
    distance
  } from "./helperFcns.js";
  import applyForce from "./applyForce.js";
  import config from "../config.js";
  const { maxForce, maxVel} = config;

export default function separate(pos,vel,particles, acc, separation){
    let tempAcc = acc;
    let sum = [0,0,0];
    let count = 0;
    for (let i = 0; i<particles.length; i++){
      let thisPos = particles[i].position;
      let d = distance(pos, particles[i].position);
      if(d>0 && d<separation){
        let diff = subtract([pos.x,pos.y,pos.z], [thisPos.x,thisPos.y,thisPos.z]);;
        diff = normalize(diff);
        diff = divScalar(diff, d);
        sum = add(sum, diff);
        count++;
      }
    }
    if(count>0){
      sum = divScalar(sum, count);
      sum = normalize(sum);
      sum = multScalar(sum, maxVel);
      let steer = subtract(sum, [vel.x,vel.y,vel.z]);
      steer = clamp(steer, maxForce);
      tempAcc = applyForce(steer,tempAcc);
    }
    return tempAcc;
  }