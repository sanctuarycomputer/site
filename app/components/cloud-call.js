import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
const {Component} = Ember;

const styles = v({
  cloudCall: {
    backgroundColor: 'black',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
    canvas: {
      backgroundColor: '#173963',
    },
  },
});

export default Component.extend({
  classNames: [styles.cloudCall],
  styles,
  didInsertElement() {
    let w = $(window).width();
    let h = $(window).height();
    let renderer = null;
    let scene = null;
    let camera = null;
    let smokeParticles = null;
    let container = this.element;

    const resize = () => {
      if (!camera || !renderer) return;
      w = $(window).width();
      h = $(window).height();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const init = () => {
      window.addEventListener('resize', resize, false);
      renderer = new THREE.WebGLRenderer({alpha: true});
      renderer.setSize(w, h);
      container.appendChild(renderer.domElement);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);

      const light = new THREE.DirectionalLight(0xfff, 0.5);
      light.position.set(-1, 0, 1);
      scene.add(light);

      const loader = new THREE.TextureLoader();
      loader.load('/images/smoke.png', tex => generateSmoke(tex));
    };

    const generateSmoke = tex => {
      const smokeMaterial = new THREE.MeshStandardMaterial({
        color: 0x000,
        emissive: 0x000,
        map: tex,
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

      render();
      zoom();
    };

    const zoom = () => {
      smokeParticles.forEach((particle, i) => {
        let u = new TWEEN.Tween(particle.position)
          .to({ x: particle.position.x, z: 900, y: particle.position.y }, 20000)
          .easing(TWEEN.Easing.Exponential.InOut);
        let d = new TWEEN.Tween(particle.position)
          .to({ x: particle.position.x, z: 0, y: particle.position.y }, 20000)
          .easing(TWEEN.Easing.Exponential.InOut);
        u.chain(d);
        d.chain(u);
        i % 2 === 0 ? u.start() : d.start()
      });
    };

    const rotate = () => {
      smokeParticles.forEach((particle) => {
        particle.rotation.z += 0.002;
      });
    }

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
      rotate();
      TWEEN.update();
    };

    init();
  },
});
