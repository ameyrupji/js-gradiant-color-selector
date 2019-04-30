$(window).on('load', function(){
  var sliderWidth = 500;
  var gradient = {
    gradient_colors: [
      {
        at_percentage: 0,
        color_rgb: [53, 92, 125]
      },
      {
        at_percentage: 25,
        color_rgb: [247, 219, 79]
      },
      {
        at_percentage: 50,
        color_rgb: [53, 92, 125]
      },
      {
        at_percentage: 75,
        color_rgb: [0, 0, 0]
      },
      {
        at_percentage: 100,
        color_rgb: [53, 92, 125]
      }
    ]
  }

  $( "#slider" ).slider({
      min: 1,
      slide: function (event, ui) {
        var slider_selected_value = ui.value
        var colorRange = []
        $.each(gradient['gradient_colors'], function(index, elem) {
          if (slider_selected_value <= elem['at_percentage']) {
            colorRange = [index-1, index]
            return false;
          }
        });

        //Get the two closest colors
        var first_color = gradient['gradient_colors'][colorRange[0]]['color_rgb'];
        var second_color = gradient['gradient_colors'][colorRange[1]]['color_rgb'];

        //Calculate ratio between the two closest colors
        var first_color_x = sliderWidth * (gradient['gradient_colors'][colorRange[0]]['at_percentage'] / 100);
        var second_color_x = sliderWidth * (gradient['gradient_colors'][colorRange[1]]['at_percentage'] / 100) - first_color_x;
        var slider_x = sliderWidth * (slider_selected_value/100) - first_color_x;
        var ratio = slider_x / second_color_x

        var result = pickHex(second_color, first_color, ratio);
        $('#result').css("background-color", 'rgb(' + result.join() + ')');
      }
  });

  function pickHex(color1, color2, weight) {
      var p = weight;
      var w = p * 2 - 1;
      var w1 = (w / 1 + 1) / 2;
      var w2 = 1 - w1;
      var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
      return rgb;
  }
});
