console.log("Map Script")


//leaflet map setup
const map = L.map('map').setView([15.352878692544833, -88.984188962234], 5);         
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
subdomains: 'abcd',
maxZoom: 20
}).addTo(map);
// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

var latlngs = [
    [18.3336715185061, -85.467490002691],
    [10.034505455949576, -87.34462908709574],
    [14.884786220492535, -94.80901744625814]
 ];

 var marker1 = L.marker([15.607627276133647, -89.87972302841722]);
 var marker2 = L.marker([14.65280724813003, -87.00697338943141]);
 var marker3 = L.marker([13.601868632204301, -88.84759740961992]);

 marker1.bindPopup('Guatemala <br> Unaccompanied children 2022: 26%').openPopup();
 marker2.bindPopup('Honduras <br> Unaccompanied children 2022: 18%').openPopup();
 marker3.bindPopup('El Salvador <br> Unaccompanied children 2022: 17%').openPopup();


 var polygon = L.polygon(latlngs, {color: 'red', fillOpacity: 0});

 polygon.addTo(map);

 marker1.addTo(map);
 marker2.addTo(map);
 marker3.addTo(map);