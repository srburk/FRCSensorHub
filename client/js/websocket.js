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
      var jsonGarbage = JSON.parse(event.data);
      console.log(jsonGarbage);

      $.each(jsonGarbage, function(i, obj) {
        console.log(obj.sensor);
        if (!($('#' + obj.sensor).length)) {
          $('#table-body').append('<tr id=' +
            obj.sensor + '><th scope=row id=number_' + i + '>' +
            obj.number + '</th><td id=type_' + i + '>' +
            obj.type +'</td><td id=id_' + i + '>' +
            obj.id + '</td><td id=reading_' + i + '>' +
            obj.reading + '</td></tr>'
          );
        } else {
          $('#number_' + i).html(obj.number);
          $('#type_' + i).html(obj.type);
          $('#id_' + i).html(obj.id);
          $('#reading_' + i).html(obj.reading);
        };
      });
    }
  }
});
