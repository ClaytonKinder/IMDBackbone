var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;


module.exports = Backbone.Model.extend({
  urlRoot: 'http://tiy-fee-rest.herokuapp.com/collections/imb_backbone',
  idAttribute: '_id',
  initialize: function() {
    console.log('Model has liftoff!');
  },
});
