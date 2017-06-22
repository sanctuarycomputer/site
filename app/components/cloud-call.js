import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
const { Component } = Ember;

const styles = v({
  cloudCall: {
    backgroundColor: 'black',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
    'canvas': {
      backgroundColor: '#173963'
    }
  }
});

export default Component.extend({
  classNames: [styles.cloudCall],
  styles,
  didInsertElement() {
    let w = $(window).width();
    let h =  $(window).height();
    let mobile = w < 500;
    let renderer = null;
    let scene = null;
    let camera = null;
    let smokeTexture = null;
    let clock = null;
    let delta = null;
    let smokeParticles = null;
    let container = this.element;

    const resize = () => {
      if (!camera || !renderer) return;
      w = $(window).width();
      h =  $(window).height();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const init = () => {
      window.addEventListener('resize', resize, false);
      clock = new THREE.Clock();
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(w, h);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);

      const light = new THREE.DirectionalLight(0xfff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      const loader = new THREE.TextureLoader();
      loader.load(
        '/images/smoke.png',
        (texture) => {
          smokeTexture = texture;
          generateSmoke();
        }
      )
    };

    const generateSmoke = () => {
      const smokeMaterial = new THREE.MeshStandardMaterial({
        color: 0x000,
        emissive: 0x000,
        map: smokeTexture,
        transparent: true,
      });

      const smokeGeo = new THREE.PlaneGeometry(300, 300);
      smokeParticles = [];
      for (let p = 0; p < 45; p += 1) {
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
    }

    const evolveSmoke = () => {
      if (!smokeParticles) return;
      let sp = smokeParticles.length;
      while (sp -= 1) smokeParticles[sp].rotation.z += delta * 0.06;
    }

    const render = () => renderer.render(scene, camera);

    const animate = () => {
      delta = clock.getDelta();
      requestAnimationFrame(animate);
      evolveSmoke();
      render();
    };

    init();
    animate();
  }
});
