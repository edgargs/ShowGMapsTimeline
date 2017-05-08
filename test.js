var map;

const LIMA_LAT = -12.0553028;
const LIMA_LNG = -77.0627323;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: LIMA_LAT, lng: LIMA_LNG},
      zoom: 12
    });
  }

function loadSteps1() {
    let locations = `[ {
        "timestampMs" : 1494252043687,
        "latitudeE7" : -120620929,
        "longitudeE7" : -769450863,
        "accuracy" : 23
      } ]`;
    let data = JSON.parse(locations);
    console.log(data);
}

function loadSteps2() {
    let data = JSON.parse(data_json);
    console.log(data);
}

function loadFile() {
        var input, file, fr;

        if (typeof window.FileReader !== 'function') {
            bodyAppend("p", "The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('fileinput');
        if (!input) {
            bodyAppend("p", "Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            bodyAppend("p", "This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            bodyAppend("p", "Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        function receivedText() {
            showResult(fr);

        }

    }

    function showResult(fr) {
        varresult;

        result = fr.result;
        
        bodyAppend("text length=", " (" + result.length + "):");
        bodyAppend("result=", result);
    
        loadSteps3(result);
    }

    function bodyAppend(tagName, innerHTML) {
        console.log(`${tagName} ${innerHTML}`);
    }

var index_event = 0;
var event_mk = null;
var routeEvent = [];
function loadSteps3(result) {
    let data = JSON.parse(result);
    console.log(data);
    
    data.locations.forEach(elem => {
        console.log(elem.latitudeE7);
        
        let my_lat = elem.latitudeE7/ 10000000;
        let my_lng = elem.longitudeE7/ 10000000;
        
		let myLatlng = new google.maps.LatLng({lat:my_lat, lng: my_lng});
        
        routeEvent.push(myLatlng);
    });
    
    if (event_mk == null) {
        event_mk = new google.maps.Marker({
                    map: map
                });
    }
}
                
var timerID = 0
function chrono() {
	if (index_event < routeEvent.length) {
		event_position = routeEvent[index_event];
        console.log(index_event);
		event_mk.setPosition(event_position);
		index_event++
		timerID = setTimeout(function(){ chrono(); }, 1000)
	}
}
function chronoStart(){
	chrono();
}
function chronoStop(){
	clearTimeout(timerID)
}


function showMarkers(initial = 0){
    index_event = initial;
    chronoStart();
}