import DS from 'ember-data';
import Contentful from 'ember-data-contentful/models/contentful';
import Ember from 'ember';

const {
  get,
  computed,
} = Ember;

const {
  attr,
  hasMany,
} = DS;

export default Contentful.extend({
  title: attr('string'),
  body: attr('string'),
  images: hasMany('contentful-asset'),
  combined: computed('images.length', function () {
    const images = get(this, 'images');
    const body = get(this, 'body');
    const imageArr = images.map(i => ({ text: i.get('title'), url: i.get('file.url') }));
    const textArr = body.split(/\n/g);
    const data = textArr.map((t) => {
      const fImage = imageArr.find(i => t.includes(i.text));
      return {
        text: t,
        url: fImage ? fImage.url : null,
      };
    });
    return data;
  }),
});
