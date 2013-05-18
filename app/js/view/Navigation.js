app.view.Navigation = Backbone.View.extend({
  events: {
    'click .right-button': 'showStats'
  },
  showStats: function() {
    app.Event.trigger(app.Event.Rotate, 90);
  },
  tagName: 'header',
  className: 'navigation',
  initialize: function() {
    this.$el.append('<button class="right-button">查看进度</button>');
  }
});