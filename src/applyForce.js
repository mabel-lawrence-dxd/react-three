export default function applyForce(force, acc) {
    for (let i = 0; i < force.length; i++) {
      acc[i] += force[i];
    }
    return acc;
}