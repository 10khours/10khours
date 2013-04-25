app.view.Switcher = Backbone.View.extend({
  events: {
    'click .activate': 'activate'
  },
  className: 'switcher',
  tagName: 'li',
  activate: function() {
    if (this.$el.hasClass('active')) {
      return;
    }
    this.$el.addClass('active');
    app.Event.trigger(app.Event.Switch, this.model);
  },
  onSwitch: function(task) {
    if (task.get('order') === this.model.get('order')) {
      return;
    }
    this.$el.removeClass('active');
  },
  _calculateTotalTime: function(seconds) {
    var totalTime = seconds;
    var unit = 'sec';
    var minutesMax = 100 * 60;
    var hoursMax = minutesMax * 60;
    if (totalTime > minutesMax && totalTime <= hoursMax) {
      totalTime = Math.floor(seconds / 60);
      unit = 'min';
    }
    else if (totalTime > hoursMax) {
      totalTime = Math.floor(seconds / 3600);
      unit = 'hours';
    }
    return {
      totalTime: totalTime,
      unit: unit
    }
  },
  initialize: function() {
    this.template = _.template($('#switcher').html());
    var totalSeconds = this.model.get('total');
    this.$el.append(this.template(this._calculateTotalTime(totalSeconds)));
    var order = this.model.get('order');
    this.$el.addClass('task-order-' + order);
    if (order === 1) {
      this.$el.addClass('active');
    }
    this.listenTo(app.Event, app.Event.Switch, this.onSwitch);
  }
});