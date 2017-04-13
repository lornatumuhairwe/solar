$(document).ready(function(){
  var channelA = new TimeSeries();
  var channelB = new TimeSeries();
	
	var socket = new WebSocket( 'ws://107.170.249.214:3131' );

	socket.onopen = function(){
		var msg = JSON.stringify(["SolarHost","Connect"]);
	    socket.send(msg);
	}
	
	socket.onmessage = function(msg){
		
		var positionA = msg.data.indexOf('A');
		var positionB = msg.data.indexOf('B');
		var positionC = msg.data.indexOf('C');
		var valueA = msg.data.substring(positionA + 1, positionB);
		var valueB = msg.data.substring(positionB + 1, positionC);
		var valueC = msg.data.substr(positionC + 1);
		valueA -= valueC;
		valueB -= valueC;
		$(".voltage").html(valueB);
		channelA.append(new Date().getTime(), parseFloat(valueA));
		channelB.append(new Date().getTime(), parseFloat(valueB));
	}
	
	$(".dial").knob({
        'release' : function (v) {
            var msg = JSON.stringify(["SolarClient",v.toString()]);
	        socket.send(msg);
        }
    });
    
    /*setInterval(function() {
        random.append(new Date().getTime(), Math.random() * 10000);
    }, 500);*/
    
    createTimeline();
    
    function createTimeline() {
        var chart = new SmoothieChart({minValue: -500.00, maxValue: 500.00, timestampFormatter: SmoothieChart.timeFormatter});
        chart.addTimeSeries(channelA, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0)', lineWidth: 2 });
				chart.addTimeSeries(channelB, { strokeStyle: 'rgba(240, 0, 0, 1)', fillStyle: 'rgba(240, 0, 0, 0)', lineWidth: 2 });
        chart.streamTo(document.getElementById("chart"), 500);
    }
});

function key_id(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
