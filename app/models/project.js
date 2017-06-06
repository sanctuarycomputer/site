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
  assets: hasMany('contentful-asset'),
  variant: attr('number'),
  summary: attr('string'),
  body: attr('string'),
  takeaway: attr('string'),
  url: attr('string'),
  type: attr('array'),
  technology: attr('array'),
});
