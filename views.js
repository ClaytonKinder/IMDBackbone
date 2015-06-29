// VIEWS

var MovieView = Backbone.View.extend({
  template: _.template($('#movieTmpl').html()),

  initialize: function() {
    console.log(this);
    this.$el.addClass('movie');
    this.$el.css('background-image', 'url(' + this.model.attributes.Poster + ')');
  },
  events: {
    'click': 'openInfo'
  },
  render: function() {
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  },
  openInfo: function() {
    this.$el.siblings().find('.movieInfoBlock').hide();
    this.$el.find('.movieInfoBlock').toggle();
  }
});

var MovieCollectionView = Backbone.View.extend({
  el: '#main',
  collection: null,
  events: {

  },
  initialize: function(options) {
    this.$el.html("");
    if(!this.collection) {
      this.collection = options.collection;
    }
    this.addAll();
  },
  addAll: function() {
    _.each(this.collection.models, this.addOne, this);
  },
  addOne: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render().el);
  }
});
