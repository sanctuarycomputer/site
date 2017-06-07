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
    const titleArr = images.map(i => i.get('title'));
    const imageArr = images.map(i => ({ text: i.get('title'), url: i.get('file.url') }));
    let textArr = [body];
    const pattern = new RegExp(titleArr.join('|'), 'gi');
    const pattern2 = /\n/g;
    if (titleArr.length) {
      textArr = body
        .replace(pattern, x => `***${x}***`)
        .replace(pattern2, x => `***${x}***`)
        .split('***');
    } else {
      textArr = body
        .replace(pattern2, x => `***${x}***`)
        .split('***');
    }
    const data = textArr.filter(t => {
      return t.length > 1 || t.length === 1 && !t.includes(' ');
    }).map((t) => {
      const fImage = imageArr.find(i => t.includes(i.text));
      return {
        text: t,
        break: !fImage && t.includes('\n'),
        url: fImage ? fImage.url : null,
      };
    });
    return data;
  }),
});
