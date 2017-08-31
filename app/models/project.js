import DS from 'ember-data';
import Contentful from 'ember-data-contentful/models/contentful';

const {
  attr,
  belongsTo,
  hasMany,
} = DS;

export default Contentful.extend({
  slug: attr('string'),
  title: attr('string'),
  description: attr('string'),
  artBackground: belongsTo('contentful-asset'),
  featuredOverlay: belongsTo('contentful-asset'),
  featuredVideo: belongsTo('contentful-asset'),
  technology: attr('array'),
  projectType: attr('string'),
  displayVariant: attr('string'),
  blocks: hasMany('block'),
});
