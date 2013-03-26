(function() {
  var taskColors = ['#6A8A62', '#F15A2A', '#6AAFCC', '#DAD23D'];

  app.view.Chart = Backbone.View.extend({
    className: 'chart',
    render: function(model) {
      var context = this.$chartContent[0].getContext('2d');
      var labels = [];
      var dataInDataSets = [];
      _.each(model.get('records'), function(record) {
        labels.push(record.date);
        dataInDataSets.push(record.time);
      });
      var color = taskColors[model.get('order') - 1];
      var data = {
        labels: labels,
        datasets: [
          {
            fillColor: 'rgba(255,255,255,0.1)',
            strokeColor: color,
            pointColor : color,
            pointStrokeColor: '#333',
            data: dataInDataSets
          }
        ]
      };
      new Chart(context).Line(data);
    },
    initialize: function() {
      this.$chartContent = $('<canvas class="chart-content" width="600px" height="260px"></canvas>');
      this.$el.append(this.$chartContent);
      this.render(this.model);
      app.Event.on(app.Event.Switch, this.render, this);
    }
  });
})();
