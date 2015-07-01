var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');

module.exports = Backbone.View.extend({
  template: _.template($('#formTmpl').html().trim()),
  initialize: function(options) {
    this.render();
  },
  events: {
    'submit form': 'handleSubmit'
  },
  render: function() {
    var myModel = this.model;
    var markup = this.template(myModel);
    this.$el.html(markup);
    return this;
  },
  handleSubmit: function(event) {
    event.preventDefault();

    console.log('POST');
    var newModel = new MovieModel();
    newModel.set({
      title: this.$el.find('input[name="title"]').val(),
      poster: this.$el.find('input[name="poster"]').val(),
      plot: this.$el.find('textarea[name="plot"]').val(),
      genre: this.$el.find('input[name="genre"]').val(),
      year: this.$el.find('input[name="year"]').val(),
      score: this.$el.find('input[name="score"]').val()
    });
    newModel.save();
    this.collection.add(newModel);
    $(this.el).undelegate('form', 'submit');
    this.$el.find('input').val('');
    this.$el.find('textarea').val('');
    $('#formArrow').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
    $('#formBlockWrapper').toggle();
  }
});
