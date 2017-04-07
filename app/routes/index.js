import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  inject: { service },
  Route
} = Ember;

const styles = v({
  indexRoute: {
    '@composes': [c.liquidInner, c.bgLightGray],
    bottom: 0,
    '.section': {
      marginBottom: '8rem',
    },
    '.sub-section': {
      marginBottom: '4rem',
    },
    '.block': {
      display: 'block',
    },
  },
  triangleContainer: {
    width: '100%',
    'img': {
      width: '100%',
    }
  },

});

export default Route.extend({
  sanctu: service(),

  model() {
    return [
      {
        waypoint: 'info',
        className: 'index--info',
        copy: "<div class='section'>\
                <p class='sub-section'>\
                  We are currently looking for work in the Virtual Reality, Food Technology & Affordable Housing Industries—get in touch!\
                </p>\
                <p class='sub-section'>\
                  We are also taking applications for our spring summer intership program and still have desks available in the studio.\
                </p>\
                <p class='sub-section'>\
                  Sanctuary Computer is an artful user interface studio, based on the Bowery in NYC.  We work with established companies, city entities and startups to build compelling and empathetic digital products in the art, music & social infrastructure spaces.\
                </p>\
                <p class='sub-section'>\
                  Our small team all hail from art and music backgrounds, and work closely with notable New York design teams like Gin Lane, PlayLab, Labour NY and Human NYC.  Some recent clients include Dig Inn, Herman Miller and Dame Products.\
                </p>\
                <p class='sub-section'>\
                  Our technology stack includes React, React Native, Ember, Phoenix, Elixir, Ruby, Rails, Sass, Greensock, and A Frame among others.\
                </p>\
              </div>"
      },
      {
        waypoint: 'jobs',
        className: 'index--jobs',
        copy: "<div class='section'>\
                <p class='sub-section'>\
                We also have desks available for rent at our large studio space in Chinatown. Working alongside us involves good books, great music, fast wifi, cold beers and dead plants. For more info contact Ella.\
                </p>\
                <p class='sub-section'>We are currently taking applicants for our spring/summer intership program and are always on the lookout for talented developers. Email your CV and work samples to jobs@sanctuary.computer.</p>\
              </div>"
      },
      {
        waypoint: 'contact',
        className: 'index--contact',
        copy: "<div class='sub-section'>\
                <p class='block'>New business: ella@sanctuary.computer</p>\
                <p class='block'>Jobs: jobs@sanctuary.computer</p>\
                <p class='block'>General inquiries: hello@sanctuary.computer</p>\
               </div>\
               <div class='sub-section'>\
                <p class='block'>Facebook</p>\
                <p class='block'>Twitter</p>\
                <p class='block'>Instagram</p>\
               </div>\
               <div class='sub-section'>\
                <p class='block'>110 Bowery St, Fourth Floor</p>\
                <p class='block'>New York City, 10013</p>\
               </div>\
              "
      },
    ];
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
