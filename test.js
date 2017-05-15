var map;

const LIMA_LAT = -12.0553028;
const LIMA_LNG = -77.0627323;

function loadGmaps() {
      google.load("maps", 3, {"other_params": {"key": PRIV_API_KEY} , "callback" : initMap});
}

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
        var result;

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
      loadMarkerSVG();
        event_mk = new google.maps.Marker({
                    map: map
                });
        event_mk.setIcon(mk_car_show);
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

var mk_car_show;
function loadMarkerSVG() {
mk_car_show = {
	    anchor: new google.maps.Point(16, 16),
	    labelOrigin: new google.maps.Point(8, -8),
	    url: `data:image/svg+xml;utf-8,
	      <svg width="21.2" height="28.77" xmlns="http://www.w3.org/2000/svg">
	 <defs>
	  <style>.cls-1{fill:#b2b2b2;}.cls-2{fill:red;}.cls-3{fill:#fff;}.cls-4{fill:#1d1d1b;}</style>
	 </defs>
	 <g>
	  <title>background</title>
	  <rect fill="none" id="canvas_background" height="4.139024" width="3.576201" y="-1" x="-1"/>
	 </g>
	 <g>
	  <title>Layer 1</title>
	  <rect id="svg_1" ry="1.1" rx="1.1" height="3.5" width="2.2" y="25.27" x="14.56" class="cls-1"/>
	  <rect id="svg_2" ry="1.1" rx="1.1" height="3.5" width="2.2" y="25.27" x="4.19" class="cls-1"/>
	  <rect id="svg_3" ry="2.88" rx="2.88" height="18.2" width="16.05" y="7.63" x="2.57" class="cls-2"/>
	  <rect id="svg_4" height="6.59" width="11.91" y="10.56" x="4.87" class="cls-3"/>
	  <rect id="svg_5" height="1.44" width="6" y="19.7" x="7.82" class="cls-3"/>
	  <path id="svg_6" d="m3.94,24.6s-0.51,-0.54 0,-0.7l2.65,0s0.62,0.32 0,0.7l-2.65,0z" class="cls-3"/>
	  <path id="svg_7" d="m14.31,24.6s-0.51,-0.54 0,-0.7l2.65,0s0.62,0.32 0,0.7l-2.65,0z" class="cls-3"/>
	  <path id="svg_8" d="m3.72,21.25c-0.25,1.65 2.13,2 2.84,1.79c1.27,-0.29 -1.57,-4.8 -2.84,-1.79z" class="cls-3"/>
	  <path id="svg_9" d="m17.62,21.25c0.25,1.65 -2.13,2 -2.84,1.79c-1.25,-0.29 1.57,-4.8 2.84,-1.79z" class="cls-3"/>
	  <rect id="svg_10" height="0.35" width="5.09" y="15.37" x="10.57" class="cls-4"/>
	  <polygon id="svg_11" points="9.37 17.04 11.2 15.72 11.82 15.72 10.13 17.04 9.37 17.04" class="cls-4"/>
	  <path id="svg_12" d="m18.63,16.52s1.17,-1.85 2.16,-1a1.61,1.61 0 0 1 0.28,1.71s-0.17,0.81 -2,1l-0.44,0l0,-1.71z" class="cls-2"/>
	  <path id="svg_13" d="m2.53,16.52s-1.17,-1.85 -2.16,-1a1.61,1.61 0 0 0 -0.28,1.71s0.17,0.81 2,1l0.44,0l0,-1.71z" class="cls-2"/>
	  <path d="m10.83,3.05a3.28,3.28 0 0 0 -3.3,3.32l1.35,0a2,2 0 1 1 3.94,0l1.35,0a3.28,3.28 0 0 0 -3.34,-3.32z" class="cls-2" id="_Trazado_"/>
	  <path d="m17.18,6.37l-1.24,0a5,5 0 0 0 -5.11,-5.12a5,5 0 0 0 -5.11,5.12l-1.24,0a6.25,6.25 0 0 1 6.35,-6.37a6.25,6.25 0 0 1 6.35,6.37z" class="cls-2" id="_Trazado_2"/>
	  <path d="m11.53,6.58a0.62,0.62 0 1 1 -0.62,-0.62a0.62,0.62 0 0 1 0.62,0.62z" class="cls-2" id="_Trazado_3"/>
	 </g>
	</svg>`
	  }
}
