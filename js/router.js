var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var MovieCollection = require('./movieCollection');
var MovieCollectionView = require('./movieColView');
var formView = require('./formView');
var Movie = require('./movie');
var MovieView = require('./movieView');

module.exports = Backbone.Router.extend({
  routes: {
    "": "home",
    "home": "home",
    "teddybear": "cuteAlert",
    "movie/:id": "detailView",
    "*anything": "notFound"
  },
  notFound: function (stuff) {
    $('body').html('Sorry, but this: ' + stuff + " is not found" );
  },
  detailView: function (id) {
    var movie = new Movie({_id: id});
    movie.fetch().then(function () {
      var movieView = new MovieView({model: movie});
      $('body').html(movieView.render().el);
    });

  },
  home: function () {
    console.log('this is the home router');
    var collection = new MovieCollection();

    collection.fetch().then(function (data) {
      
      var AppView = new MovieCollectionView({collection: collection});
      var newMovieFormView = new formView({collection: collection, el: '#newMovie'});
    });
  },
  cuteAlert: function () {
    new formView({el: 'body'})
  }
});
