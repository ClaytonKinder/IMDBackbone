var MovieCollection = require('./movieCollection');
var MovieCollectionView = require('./movieColView');
var $ = require('jquery');
var _ = require('underscore');
var FormView = require('./formView');
var SortView = require('./sortView');
var ArrowView = require('./ArrowView');

module.exports = $(function() {
  var collection = new MovieCollection();
  collection.fetch().then(function(data) {
    new MovieCollectionView({collection: collection});
    var newSortView = new SortView({collection: collection});
    var newArrowView = new ArrowView({collection: collection});
  });
});
