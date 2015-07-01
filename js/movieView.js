var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'movie',
  template: _.template($('#movieTmpl').html()),
  events: {
    'click': 'showInfo',
    'click .movieEdit': 'editMovie',
    'click .movieDelete': 'deleteMovie'
  },
  initialize: function() {
    // console.log('Model view has liftoff!');
  },
  render: function() {
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    // console.log(this.model);
    this.$el.css({
      'background-image': 'url(' + this.model.attributes.poster + ')'
    });
    return this;
  },
  showInfo: function() {
    this.$el.find('.movieInfoBlock').toggle();
    this.$el.siblings().find('.movieInfoBlock').hide();
  },
  editMovie: function() {
    if ($('#formBlockWrapper').css('display') === 'none') {
      $('#formWrapper').css('height', 'auto');
      $('#formArrow').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
      $('#formBlockWrapper').show();
    }
    $('#submitForm').hide();
    $('#submitEdit').show();
    $('input[name="title"]').val(this.model.attributes.title);
    $('input[name="poster"]').val(this.model.attributes.poster);
    $('textarea[name="plot"]').val(this.model.attributes.plot);
    $('input[name="genre"]').val(this.model.attributes.genre);
    $('input[name="year"]').val(this.model.attributes.year);
    $('input[name="score"]').val(this.model.attributes.score);

    var editedMovie = this.model;
    console.log(this.model.attributes.title);

    $('body').on('click', '#submitEdit', function(e) {
      e.preventDefault();
      editedMovie.set({
        title: $('#formBlock').find('input[name="title"]').val(),
        poster: $('#formBlock').find('input[name="poster"]').val(),
        plot: $('#formBlock').find('textarea[name="plot"]').val(),
        genre: $('#formBlock').find('input[name="genre"]').val(),
        year: $('#formBlock').find('input[name="year"]').val(),
        score: $('#formBlock').find('input[name="score"]').val()
      });
      editedMovie.save();
      console.log(editedMovie);
      $('#formBlock').find('input').val('');
      $('#formBlock').find('textarea').val('');
      $('#formArrow').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
      $('#formBlockWrapper').toggle();
      $('#submitEdit').hide();
      $('#submitForm').show();
      editedMovie;
    });
  },
  deleteMovie: function() {
    this.model.destroy();
    this.$el.hide();
  }
});
