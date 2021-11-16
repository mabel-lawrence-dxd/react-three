import * as THREE from "three";
import { clamp, add, scale } from "./helperFcns.js";
import boundaries from "./boundaries.js";
import separate from "./separate.js";
import config from "./config.js";
import circle from "./circle.png";
import pic1 from "./assets/1b7eaad74f5a4a9d818f43f9e43df394__72bb3eea-f7d1-402c-8041-605b3a84c15d.png";
import pic2 from "./assets/5a8fe5aaaddc44aea7a768f1e9067a8f__9067cce6-22d4-42e4-ba13-450277223e10.png";
import pic3 from "./assets/891f66ecd3784ddba1eff7b5a5b47a9c__ad3bf7f2-07b9-4203-9897-a3fc0f56ac33.png";

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
  const images = [pic1, pic2, pic3];

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

    //add images
    for (let i = 0; i < images.length; i++) {
      let size = Math.floor(Math.random() * 100) + 75;
      let picMap = new THREE.TextureLoader().load(images[i]);
      let material = new THREE.SpriteMaterial({
        map: picMap,
        color: "#ffffff",
      });
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
      sprite.name = images[i];
      sprite.position.set(x, y, z);
      sprite.scale.set(size, size, size);
      picParticles.push(sprite);
      picVel.push({ x: velX, y: velY, z: velZ });
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
        acc, 50
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

    picParticles.forEach((sprite, idx) => {
      acc = separate(sprite.position, picVel[idx], picParticles, acc, 200);
      let velVec = [picVel[idx].x, picVel[idx].y, picVel[idx].z];
      let result = boundaries(
        sprite.position,
        { x: velVec[0], y: velVec[1], z: velVec[2] },
        acc, 200
      );
      let { tempVel, tempAcc } = result;
      acc = tempAcc;
      velVec = tempVel;

      velVec = add(velVec, acc);
      velVec = clamp(velVec, maxVel);
      acc = [0, 0, 0];
      picVel[idx].x = velVec[0];
      picVel[idx].y = velVec[1];
      picVel[idx].z = velVec[2];
      sprite.position.set(
        sprite.position.x + picVel[idx].x,
        sprite.position.y + picVel[idx].y,
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
    for(let i = 0; i < picParticles.length; i++){
      let picPos = picParticles[i].position;
      let picRad = picParticles[i].scale.x/2;
      if(scaledX>picPos.x-picRad && scaledX<picPos.x+picRad &&scaledY>picPos.y-picRad && scaledY<picPos.y+picRad){
        console.log('CLICKED PICTURE: ', picParticles[i].name);
      }
    }
  }

  return {
    animate,
    update,
    onWindowResize,
    onMouseClick,
  };
};
