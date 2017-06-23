import DS from 'ember-data';
import Contentful from 'ember-data-contentful/models/contentful';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Contentful.extend({
  blockType: attr('string'),
  title: attr('string'),
  subtitle: attr('string'),
  paragraph1: attr('string'),
  paragraph2: attr('string'),
  image1: belongsTo('contentful-asset'),
  image2: belongsTo('contentful-asset'),
  fullWidth: belongsTo('contentful-asset'),
  url: attr('string'),
  linkCopy: attr('string'),
  gallery: hasMany('contentful-asset'),
});
