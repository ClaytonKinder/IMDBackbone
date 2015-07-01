var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');
var MovieCollection = require('./movieCollection');
var MovieCollectionView = require('./movieColView');

module.exports = Backbone.View.extend({
  el: '#headerSorting',
  template: _.template($('#sortTmpl').html().trim()),
  initialize: function(options) {
    this.render();
  },
  events: {
    'click div': 'sortMovies',
  },
  render: function() {
    this.model = new MovieModel();
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  },
  sortMovies: function(ev) {
    var collection = new MovieCollection();
    var clicked = ev.target;
    var sort = $(clicked).text().trim().toLowerCase();
    collection.fetch().then(function (data) {
      var sortedCollection = _.sortBy(data, sort);
      if (sort === 'score') {
        sortedCollection = sortedCollection.reverse();
      }
      for (var i = 0; i < sortedCollection.length; i++) {
        collection.models[i].attributes = sortedCollection[i];
      }
      var collectionView = new MovieCollectionView({collection: collection});
    })
  }
});
