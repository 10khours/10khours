app.view.Switchers = Backbone.View.extend({
  events: {
    'click .back-home': 'backHome'
  },
  backHome: function() {
    app.Event.trigger(app.Event.Rotate, 0);
  },
  className: 'switchers',
  tagName: 'ul',
  onRotate: function(orientation) {
    if (orientation === 0) {
      this.remove();
    }
  },
  initialize: function() {
    var switchersView = this;
    switchersView.$el.append('<li><button class="back-home">返回</button></li>');
    this.collection.each(function(task) {
      var switcherView = new app.view.Switcher({
        model: task
      });
      switchersView.$el.append(switcherView.$el);
    });
    this.listenTo(app.Event, app.Event.Rotate, this.onRotate);
  }
});