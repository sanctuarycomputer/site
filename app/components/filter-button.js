import Ember from 'ember';
import vudu from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
  computed,
  get,
} = Ember;

const v = vudu(c);

const styles = vudu({
  active: {
    color: c.sanctuBlue.color,
  },
});


export default Component.extend({
  classNameBindings: [`isActive:${styles.active}`],
  classNames: [v.sansLight, v.pointer],
  tagName: 'li',

  isActive: computed('typeFilter', 'filter', function() {
    return get(this, 'filter') === get(this, 'typeFilter');
  }),

  click() {
    this.attrs.filterAction();
  },

});
