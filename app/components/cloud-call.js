import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
const { Component, set, get, inject: { service } } = Ember;

const local = v({
  cloudCall: {
    backgroundColor: 'black',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 0,
    opacity: 1,
    'canvas': {
      backgroundColor: '#073763'
    }
  }
});

export default Component.extend({
  classNames: [local.cloudCall],
  sanctu: service(),
  didInsertElement() {
    const mobile = $(window).width() < 500;
    let renderer = null;
    let scene = null;
    let camera = null;
    let clock = null;
    let delta = null;
    let smokeParticles = null;
    let container = this.element;
    let firstRender = false;

    const init = () => {
      clock = new THREE.Clock();
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);

      const light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      const smokeTexture = THREE.ImageUtils.loadTexture('/images/smoke.png');

      // TODO: Adjust Emissive & Color
      const smokeMaterial = new THREE.MeshPhongMaterial({
        color: 0x222222,
        emissive: 0x000,
        map: smokeTexture,
        transparent: true,
      });

      const smokeGeo = new THREE.PlaneGeometry(300, 300);
      smokeParticles = [];
      for (let p = 0; p < 60; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 1000 - 100,
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
      }
      container.appendChild(renderer.domElement);
    };

    const evolveSmoke = () => {
      if (!smokeParticles) return;
      let sp = smokeParticles.length;
      while (sp -= 1) smokeParticles[sp].rotation.z += delta * 0.06;
    }

    const render = () => {
      renderer.render(scene, camera);
      if (!firstRender) {
        firstRender = true;
        this.onFirstRender();
      }
    }

    const animate = () => {
      delta = clock.getDelta();
      requestAnimationFrame(animate);
      evolveSmoke();
      render();
    };

    init();
    animate();
  },

  onFirstRender() {
    get(this, 'sanctu').cloudsDidRender(this.element);
  }
});
