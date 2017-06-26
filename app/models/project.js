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
  featuredImage: belongsTo('contentful-asset'),
  featuredOverlay: belongsTo('contentful-asset'),
  featuredVideo: belongsTo('contentful-asset'),
  colorBlock: attr('string'),
  variant: attr('number'),
  technology: attr('array'),
  projectType: attr('string'),
  blocks: hasMany('block'),
});
