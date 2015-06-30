// var mockData = require('./data');
var MovieCollection = require('./movieCollection');
var MovieCollectionView = require('./movieColView');
var $ = require('jquery');
var _ = require('underscore');
var FormView = require('./formView');

$('body').on('click', '#formArrow', function(e) {
  e.preventDefault();
  $('#formBlock').find('input').val('');
  $('#formBlock').find('textarea').val('');
  $('#submitEdit').hide();
  $('#submitForm').show();
  $('#formWrapper').css('height', 'auto');
  $('#formArrow').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
  $('#formBlockWrapper').toggle();
});

module.exports = $(function() {
  var collection = new MovieCollection();
  collection.fetch().then(function(data) {
    new MovieCollectionView({collection: collection});
    var newMovieForm = new FormView({collection: collection});
  });

  $('body').on('click', '#headerSorting div', function(e) {
    e.preventDefault();
    var idStr = $(this).attr('id');
    var idStrSlice = idStr.slice(7);
    var sort = idStrSlice.toLowerCase();
    console.log(sort);
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
  });
});
