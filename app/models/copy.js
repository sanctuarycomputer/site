import DS from 'ember-data';
import Contentful from 'ember-data-contentful/models/contentful';
import Ember from 'ember';

const {
  get,
  computed,
} = Ember;

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Contentful.extend({
  title: attr('string'),
  body: attr('string'),
  images: hasMany('contentful-asset'),
  combined: computed('images.length', function() {
    const i = get(this, 'images');
    const b = get(this, 'body');
    const iX = i.map(u => {
      return {text: u.get('title'), url: u.get('file.url')};
    });
    const bX = b.replace(/\n/g, ' ').split(' ');
    const m = bX.map(w => {
      let foundUrl = iX.find(y => y.text === w);
      return {
        text: w + ' ',
        url: foundUrl ? foundUrl.url : null,
      };
    });
    return m;
  }),
});
