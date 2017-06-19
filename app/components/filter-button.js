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
    color: c.electricBlue.color,
  },
});


export default Component.extend({
  classNameBindings: [`isActive:${styles.active}`],
  classNames: [v.sansRegular, v.pointer],
  tagName: 'li',

  isActive: computed('typeFilter', 'filter', 'techFilter', function() {
    return get(this, 'filter') === get(this, 'typeFilter') || get(this, 'filter') === get(this, 'techFilter');
  }),

  click() {
    this.attrs.filterAction();
  },

});
