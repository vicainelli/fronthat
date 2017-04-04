import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  slug: DS.attr('string'),
  company: DS.attr('string'),
  description: DS.attr('string'),
  seoDescription: DS.attr('string'),
  prettydate: DS.attr('string'),
});
