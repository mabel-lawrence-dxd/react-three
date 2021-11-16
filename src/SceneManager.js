import * as THREE from "three";
import circle from "./circle.png";
import { normalize, clamp, add, scale } from "./helperFcns.js";
import boundaries from "./boundaries.js";
import separate from "./separate.js";
import config from "./config.js";

export default (canvas) => {
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  let { numParticles, maxVel } = config;
  const colors = [
    "#01003C",
    "#4BB7C1",
    "#19095E",
    "#A7A6EB",
    "#050370",
    "#75ABCA",
  ];
  let particles = [];
  let vel = [];
  let acc = [0, 0, 0];

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");
    return scene;
  }

  function buildRender() {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio.pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  }

  function buildCamera() {
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      3000
    );

    camera.position.z = 1500;
    return camera;
  }

  function createSceneSubjects(scene) {
    const map = new THREE.TextureLoader().load(circle);
    for (let i = 0; i < numParticles; i++) {
      let randColor = colors[Math.floor(Math.random() * colors.length)];
      let size = Math.floor(Math.random() * 30) + 5;
      let material = new THREE.SpriteMaterial({ map: map, color: randColor });
      let sprite = new THREE.Sprite(material);
      let x = scale(
        Math.random() * window.innerWidth,
        0,
        window.innerWidth,
        -window.innerWidth / 2,
        window.innerWidth / 2
      );
      let y = scale(
        Math.random() * window.innerHeight,
        0,
        window.innerHeight,
        -window.innerHeight / 2,
        window.innerHeight / 2
      );
      let z = 0;
      let velX = Math.random();
      let velY = Math.random();
      let velZ = 0;
      sprite.position.set(x, y, z);
      sprite.scale.set(size, size, size);
      particles.push(sprite);
      vel.push({ x: velX, y: velY, z: velZ });
      scene.add(sprite);
    }
  }

  function animate() {
    // requestAnimationFrame(animate);
    particles.forEach((sprite, idx) => {
      acc = separate(sprite.position, vel[idx], particles, acc, 40);

      let velVec = [vel[idx].x, vel[idx].y, vel[idx].z];

      let result = boundaries(
        sprite.position,
        { x: velVec[0], y: velVec[1], z: velVec[2] },
        acc
      );
      let { tempVel, tempAcc } = result;
      acc = tempAcc;
      velVec = tempVel;

      velVec = add(velVec, acc);
      velVec = clamp(velVec, maxVel);
      acc = [0, 0, 0];
      vel[idx].x = velVec[0];
      vel[idx].y = velVec[1];
      vel[idx].z = velVec[2];

      sprite.position.set(
        sprite.position.x + vel[idx].x,
        sprite.position.y + vel[idx].y,
        0
      );

      //   sprite.position.set(sprite.position.x + 1, sprite.position.y, 0);
    });
    update();
  }

  function update() {
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  return {
    animate,
    update,
    onWindowResize,
  };
};
