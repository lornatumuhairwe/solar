$(document).ready(function(){
    //var random = new TimeSeries();
    
    var options = {
		lines: {
			show: true
		},
		points: {
			show: true
		},
		xaxis: {
			tickDecimals: 0,
			tickSize: 1
		}
	};

	var data = [];
	
	var socket = new WebSocket( 'ws://107.170.249.214:3131' );

	socket.onopen = function(){
		var msg = JSON.stringify(["SolarHost","Connect"]);
	    socket.send(msg);
	}

	socket.onmessage = function(msg){
		$(".voltage").html(msg.data);
		time = new Date().getTime();
		data = [[time, msg.data]];
		$.plot("#chart", data, options);
		//random.append(new Date().getTime(), parseInt(msg.data));
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
    
    //createTimeline();
    
    /*function createTimeline() {
        var chart = new SmoothieChart({minValue: -6, maxValue: 6, timestampFormatter: SmoothieChart.timeFormatter});
        chart.addTimeSeries(random, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0)', lineWidth: 2 });
        chart.streamTo(document.getElementById("chart"), 500);
    }*/
});

function key_id(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
