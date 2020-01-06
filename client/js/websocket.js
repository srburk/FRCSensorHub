// Check if the browser supports websockets
$(document).ready(() => {
  if(!("WebSocket" in window)) {
    $('<p>Sorry, you need a browser that supports WebSockets.');
  } else {
    // Establish WebSocket connection
    let HOST = 'ws://' + location.hostname + ":8080"
    let ws = new WebSocket(HOST);

    ws.onmessage = function(event) {
      // $('h2#server-time').html('Server Time: ' + event.data);
      var obj = JSON.parse(event.data);
      console.log(obj);

      $('#sensor-1-num').html(obj.sensor1.number);
      $('#sensor-1-type').html(obj.sensor1.type);
      $('#sensor-1-id').html(obj.sensor1.id);
      $('#sensor-1-reading').html(obj.sensor1.reading);

      $('#sensor-2-num').html(obj.sensor2.number);
      $('#sensor-2-type').html(obj.sensor2.type);
      $('#sensor-2-id').html(obj.sensor2.id);
      $('#sensor-2-reading').html(obj.sensor2.reading);
    }
  }
});
