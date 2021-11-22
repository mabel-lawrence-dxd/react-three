import * as THREE from "three";
import { clamp, add, scale } from "./helperFcns.js";
import boundaries from "./boundaries.js";
import separate from "./separate.js";
import clickedInfo from "./clickedInfo.js";
import config from "./config.js";
import circle from "./circle.png";

export default (canvas) => {
  const screenDimensions = {
    width: canvas.width,
    height: canvas.height,
  };

  let { maxVel } = config;
  const numParticles = 10;

  let particles = [];
  let vel = [];
  let picParticles = [];
  let picVel = [];
  let acc = [0, 0, 0];
  const mouse = new THREE.Vector2();

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0000af");
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
      let size = 25;
      let material = new THREE.SpriteMaterial({ map: map, color: "#ffffff" });
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
        acc,
        50
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

  function onMouseClick(event) {
    let clickedSearch = "";
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    let scaledX;
    let scaledY;
    if (mouse.x < window.innerWidth) {
      scaledX = window.innerWidth / 2 - (window.innerWidth - mouse.x);
    } else {
      scaledX = window.innerWidth / 2 + mouse.x;
    }
    if (mouse.y < window.innerHeight) {
      scaledY = window.innerHeight / 2 - mouse.y;
    } else {
      scaledY = window.innerHeight / 2 - mouse.y;
    }
    // console.log("CLICKED MOUSE @: ", scaledX, scaledY);

    //check to see if clicked a photo
    for (let i = 0; i < particles.length; i++) {
      let pos = particles[i].position;
      let rad = picParticles[i].scale.x / 2;
      if (
        scaledX > pos.x - rad &&
        scaledX < pos.x + rad &&
        scaledY > pos.y - rad &&
        scaledY < pos.y + rad
      ) {
        clickedSearch = particles[i];
      }
    }
    console.log('CLICKED SEARCH ', clickedSearch)
  }

  return {
    animate,
    update,
    onWindowResize,
    onMouseClick,
  };
};
