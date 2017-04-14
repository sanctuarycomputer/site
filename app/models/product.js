import DS from 'ember-data';
import Contentful from 'ember-data-contentful/models/contentful';

const {
  attr,
  belongsTo
} = DS;

export default Contentful.extend({
  slug: attr('string'),
  featuredImage: belongsTo('contentful-asset'),
  title: attr('string'),
  description: attr('string'),
  instructions: attr('string'),
  price: attr('number'),
  options: attr('string'),
});
