var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');
var FormEditView = require('./formEditView');

module.exports = Backbone.View.extend({
  tagName: 'div',
  className: 'movie',
  template: _.template($('#movieTmpl').html()),
  events: {
    'click .movieEdit': 'editMovie',
    'click': 'showInfo',
    'click .movieDelete': 'deleteMovie'
  },
  initialize: function() {
    // console.log('Model view has liftoff!');
  },
  render: function() {
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    this.$el.css({
      'background-image': 'url(' + this.model.attributes.poster + ')'
    });
    return this;
  },
  showInfo: function(evt) {
    if ($(evt.target).is('i.movieEdit') || $(evt.target).closest('form').length > 0) {
      if ($(evt.target).is('input[type="submit"]')) {
        this.$el.find('.movieInfoBlock').toggle();
        this.$el.siblings().find('.movieInfoBlock').hide();
      }
    } else {
      this.$el.find('.movieInfoBlock').toggle();
      this.$el.siblings().find('.movieInfoBlock').hide();
    }
  },
  editMovie: function() {
    this.$el.find('input[name="title"]').val(this.model.attributes.title);
    this.$el.find('input[name="poster"]').val(this.model.attributes.poster);
    this.$el.find('textarea[name="plot"]').val(this.model.attributes.plot);
    this.$el.find('input[name="genre"]').val(this.model.attributes.genre);
    this.$el.find('input[name="year"]').val(this.model.attributes.year);
    this.$el.find('input[name="score"]').val(this.model.attributes.score);
    new FormEditView({model: this.model, el: this.$el.find('.movieInfoBlock')});
  },
  deleteMovie: function() {
    this.model.destroy();
    this.$el.hide();
  }
});
