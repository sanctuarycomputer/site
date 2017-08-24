import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
const { Component, get, inject: { service } } = Ember;

let shouldRender = true;

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
  sanctu: service(),
  styles,
  didInsertElement() {
    let w = $(window).width();
    let h = $(window).height();
    let renderer = null;
    let scene = null;
    let camera = null;
    let smokeParticles = null;
    let container = this.element;
    let firstRender = false;

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
      renderer = new THREE.WebGLRenderer({ alpha: true });
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
      let n = 0;
      while (n < 45) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 1000 - 100,
        );
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
        n += 1;
      }
      render();
    };

    const rotate = () => smokeParticles.forEach((particle, i) => i % 2 === 0 ? particle.rotation.z += 0.001 : particle.rotation.z -= 0.001 );

    const render = () => {
      requestAnimationFrame(render);
      if (!shouldRender) return;
      renderer.render(scene, camera);
      rotate();
      if (!firstRender) {
        firstRender = true;
        this.onFirstRender();
      }
    };

    init();
  },
  onFirstRender() {
    get(this, 'sanctu').cloudsDidRender(this.element);
  },
  didReceiveAttrs() {
    this.getScrollingEl()
  },
  handleScroll: function(e) {
    if (this.route !== 'index') {
      if (e.target.scrollTop > e.target.clientHeight) shouldRender = false;
      else shouldRender = true;
    } else {
      if (e.target.scrollTop >= (e.target.scrollHeight - (e.target.clientHeight * 2))) shouldRender = true;
      else shouldRender = false;
    }
  },
  getScrollingEl: function() {
    const scrollingEl = Ember.$('.detectScroll')[0];
    scrollingEl.addEventListener('scroll', this.handleScroll.bind(this));
  },
});
