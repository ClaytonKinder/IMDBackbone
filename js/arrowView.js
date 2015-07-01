var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');
var MovieCollection = require('./movieCollection');
var MovieCollectionView = require('./movieColView');
var FormView = require('./formView');

module.exports = Backbone.View.extend({
  el: '#formArrowBlock',
  template: '<i id="formArrow" class="fa fa-chevron-down"></i>',
  initialize: function(options) {
    this.render();
  },
  events: {
    'click #formArrow': 'toggleForm',
  },
  render: function() {
    var markup = this.template;
    this.$el.html(markup);
    return this;
  },
  makeFormDiv: function () {
    $('<div id="formBlock"></div>').appendTo(this.el);
  },
  toggleForm: function(e) {
    e.preventDefault();
    var newForm = new FormView({collection: this.collection, el: '#formBlock'});
    $('#formBlock').find('input').val('');
    $('#formBlock').find('textarea').val('');
    $('#formWrapper').css('height', 'auto');
    $('#formArrow').toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
    $('#formBlockWrapper').toggle();
  }
});
