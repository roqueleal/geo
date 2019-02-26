window.onload = function() { init() };

  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_HtLt8Ix4nRWCTcWgDCltGaBo4ehiEIeng_uAZJ0T35KEsiq77r-fEGgPUXA-_UqMmuG43S_Ib-yE/pubhtml?gid=318477734&single=true';

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  }
  L.mapbox.accessToken = 'pk.eyJ1Ijoiam13aGl0ZTEyMCIsImEiOiJiNDJmOTlmMThiNWM3M2I0ZGQ5ZWQ5ODc0MjNiZjlmMyJ9.LOl0NORSoqFUy_3-hgb_Hg';
// Replace 'mapbox.streets' with your map id.
var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/jmwhite120.n1mddd9f/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    
});
var map = L.map('map').addLayer(mapboxTiles).setView([41.882059, -87.627815], 14);
var myLayer = L.mapbox.featureLayer().addTo(map);

var geojson;

function convertToGeoJSON(data) {
        console.log(data);
        //places = []
        for( i = 0; i < 7; i++){
        latitudemap = data[i].Latitude
        longitudemap=data[i].Longitude
        color=data[i].Color
        symbol=data[i].Symbol
        title1=data[i].Title
        //alert(data[i].Longitude);
         L.mapbox.featureLayer({
          // this feature is in the GeoJSON format: see geojson.org
          // for the full specification
         type: 'Feature',
          geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [
          longitudemap,
          latitudemap 
        ]},
        "properties": {
         title: title1,
        'marker-size': 'large',
        'marker-symbol': symbol,
        'marker-color': color
    }

}).addTo(map);
}
myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  
                            '<img src="' + feature.properties.image + '" />' +
                            feature.properties.title+ ", " + feature.properties.description
                        '</a>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320
    });
});
}
document.addEventListener('DOMContentLoaded', function() {
        var URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_HtLt8Ix4nRWCTcWgDCltGaBo4ehiEIeng_uAZJ0T35KEsiq77r-fEGgPUXA-_UqMmuG43S_Ib-yE/pubhtml?gid=318477734&single=true';
        Tabletop.init( { key: URL, callback: convertToGeoJSON, simpleSheet: true } )
})

  function showInfo(data, tabletop) {
    alert("Successfully processed!")
    console.log(data);
  }



function setupMap(geo) {
        myLayer.setGeoJSON(geo);
        
         var myLayer = L.mapbox.featureLayer().addTo(map);
}

      
