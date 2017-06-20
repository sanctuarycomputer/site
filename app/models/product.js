import DS from 'ember-data';
import Contentful from 'ember-data-contentful/models/contentful';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Contentful.extend({
  slug: attr('string'),
  variant: attr('number'),
  featuredImage: belongsTo('contentful-asset'),
  featuredImageOverlay: belongsTo('contentful-asset'),
  gallery: hasMany('contentful-asset'),
  title: attr('string'),
  description: attr('string'),
  instructions: attr('string'),
  price: attr('number'),
  options: attr('array'),
  instructionList: attr('array')
});
