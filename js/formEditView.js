var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');

module.exports = Backbone.View.extend({
  template: _.template($('#formEditTmpl').html().trim()),
  template2: _.template($('#movieTmpl').html().trim()),
  initialize: function(options) {
    this.render();
  },
  events: {
    'submit form': 'handleSubmit',
    'click #editCancel': 'cancel'
  },
  render: function() {
    var myModel = this.model;
    var markup = this.template(myModel);
    this.$el.html(markup);
    this.$el.find('input[name="title"]').val(this.model.attributes.title);
    this.$el.find('input[name="poster"]').val(this.model.attributes.poster);
    this.$el.find('textarea[name="plot"]').val(this.model.attributes.plot);
    this.$el.find('input[name="genre"]').val(this.model.attributes.genre);
    this.$el.find('input[name="year"]').val(this.model.attributes.year);
    this.$el.find('input[name="score"]').val(this.model.attributes.score);
    return this;
  },
  cancel: function() {
    var markup = this.template2(this.model.toJSON());
    this.$el.closest('.movie').html(markup);
    return this;
  },
  handleSubmit: function(event) {
    event.preventDefault();

    console.log('PUT');
    var editedMovie = this.model;
    console.log(this.model);
    editedMovie.set({
      title: this.$el.find('input[name="title"]').val(),
      poster: this.$el.find('input[name="poster"]').val(),
      plot: this.$el.find('textarea[name="plot"]').val(),
      genre: this.$el.find('input[name="genre"]').val(),
      year: this.$el.find('input[name="year"]').val(),
      score: this.$el.find('input[name="score"]').val()
    });
    editedMovie.save();
    this.$el.find('input').val('');
    this.$el.find('textarea').val('');
    editedMovie;
  }
});
