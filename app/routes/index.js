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
    '@composes': [c.liquidInner],
    bottom: 0,
    backgroundColor: c.lightGray.color,
  },
  triangleContainer: {
    width: '100%',
    'img': {
      width: '100%',
    }
  }

});

export default Route.extend({
  sanctu: service(),

  model() {
    return [
      {
        waypoint: 'info',
        className: 'index--info',
        copy: 'We are currently looking for work in the Virtual Reality, Food Technology & Affordable Housing Industries—get in touch!We are also taking applications for our spring summer intership program and still have desks available in the studio.Sanctuary Computer is an artful user interface studio, based on the Bowery in NYC.  We work with established companies, city entities and startups to build compelling and empathetic digital products in the art, music & social infrastructure spaces. Our small team all hail from art and music backgrounds, and work closely with notable New York design teams like Gin Lane, PlayLab, Labour NY and Human NYC.  Some recent clients include Dig Inn, Herman Miller and Dame Products.Our technology stack includes React, React Native, Ember, Phoenix, Elixir, Ruby, Rails, Sass, Greensock, and A Frame among others.'
      },
      {
        waypoint: 'jobs',
        className: 'index--jobs',
        copy: 'We are currently looking for work in the Virtual Reality, Food Technology & Affordable Housing Industries—get in touch!We are also taking applications for our spring summer intership program and still have desks available in the studio.Sanctuary Computer is an artful user interface studio, based on the Bowery in NYC.  We work with established companies, city entities and startups to build compelling and empathetic digital products in the art, music & social infrastructure spaces. Our small team all hail from art and music backgrounds, and work closely with notable New York design teams like Gin Lane, PlayLab, Labour NY and Human NYC.  Some recent clients include Dig Inn, Herman Miller and Dame Products.Our technology stack includes React, React Native, Ember, Phoenix, Elixir, Ruby, Rails, Sass, Greensock, and A Frame among others.'
      },
      {
        waypoint: 'contact',
        className: 'index--contact',
        copy: 'We are currently looking for work in the Virtual Reality, Food Technology & Affordable Housing Industries—get in touch!We are also taking applications for our spring summer intership program and still have desks available in the studio.Sanctuary Computer is an artful user interface studio, based on the Bowery in NYC.  We work with established companies, city entities and startups to build compelling and empathetic digital products in the art, music & social infrastructure spaces. Our small team all hail from art and music backgrounds, and work closely with notable New York design teams like Gin Lane, PlayLab, Labour NY and Human NYC.  Some recent clients include Dig Inn, Herman Miller and Dame Products.Our technology stack includes React, React Native, Ember, Phoenix, Elixir, Ruby, Rails, Sass, Greensock, and A Frame among others.'
      },
    ]
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
