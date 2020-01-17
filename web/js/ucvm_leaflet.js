/***
   ucvm_leaflet.js
***/

// This is leaflet specific utilities
var rectangle_options = {
       showArea: false,
         shapeOptions: {
              stroke: true,
              color: "blue",
              weight: 3,
              opacity: 0.5,
              fill: true,
              fillColor: null, //same as color by default
              fillOpacity: 0.02,
              clickable: false
         }
};
var rectangleDrawer;

var point_icon = L.AwesomeMarkers.icon({ icon: 'record', markerColor: 'blue'});
var point_options = { icon : point_icon };
var pointDrawer;

var profile_icon = L.AwesomeMarkers.icon({ icon: 'star', markerColor: 'blue'});
var profile_options = { icon: profile_icon };
var profileDrawer; //profile drawer is the same as point drawer

var line_options = {
       showLength: true,
         shapeOptions: {
              stroke: true,
              color: "blue",
              weight: 3,
              opacity: 0.6,
              clickable: false
         }
};
var lineDrawer;

// this is for drawing model's layer..
var polygon_options = {
    color:'red',
    fillOpacity:0.04,
    opacity:0.7,
    weight:1,
  
};

var mymap, baseLayers, layerControl, currentLayer;

function clear_popup()
{
  viewermap.closePopup();
}

function refresh_map()
{
  if (viewermap == undefined) {
    window.console.log("refresh_map: BAD BAD BAD");
    } else {
      viewermap.setView([34.3, -118.4], 7);
  }
}

function setup_viewer()
{
// esri
  var esri_topographic = L.esri.basemapLayer("Topographic");
  var esri_imagery = L.esri.basemapLayer("Imagery");
  var esri_ng = L.esri.basemapLayer("NationalGeographic");

// otm topo
  var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors,<a href=http://viewfinderpanoramas.org"> SRTM</a> | &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
 L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution})

  var otm_topographic = L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution});

// osm street
  var openURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var openAttribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var osm_street=L.tileLayer(openURL, {attribution: openAttribution});

  baseLayers = {
    "esri topo" : esri_topographic,
    "esri NG" : esri_ng,
    "esri imagery" : esri_imagery,
    "otm topo": otm_topographic,
    "osm street" : osm_street
  };
  var overLayer = {};
  var basemap = L.layerGroup();
  currentLayer = esri_topographic;

// ==> mymap <==
  mymap = L.map('UCVM_plot', { drawControl:false, layers: [esri_topographic, basemap], zoomControl:true} );
  mymap.setView([34.3, -118.4], 6);

// basemap selection
  var ctrl_div=document.getElementById('external_leaflet_control');

// ==> layer control <==
// add and put it in the customized place
//  L.control.layers(baseLayers, overLayer).addTo(mymap);
  layerControl = L.control.layers(baseLayers, overLayer,{collapsed: true });
  layerControl.addTo(mymap);
  var elem= layerControl._container;
  elem.parentNode.removeChild(elem);

  ctrl_div.appendChild(layerControl.onAdd(mymap));
  // add a label to the leaflet-control-layers-list
  var forms_div=document.getElementsByClassName('leaflet-control-layers-list');
  var parent_div=forms_div[0].parentElement;
  var span = document.createElement('span');
  span.style="font-size:14px;font-weight:bold;";
  span.className="leaflet-control-layers-label";
  span.innerHTML = 'Select background';
  parent_div.insertBefore(span, forms_div[0]);

// ==> scalebar <==
  L.control.scale({metric: 'false', imperial:'false', position: 'bottomleft'}).addTo(mymap);

/*** TEST popup
  var marker=L.marker([32, -118], {icon:redMarker}).addTo(mymap);
  marker.on('mouseover', function () {marker.bindPopup('HI', {className: 'my-popup'}).openPopup();})
***/

  function onMapMouseOver(e) {
    if( in_drawing_point() ) {
      drawPoint();
      return;
    }
    if( in_drawing_profile() ) {
      drawProfile();
      return;
    }
    if( in_drawing_line() ) { 
      drawLine();
      return;
    }
    if( in_drawing_area()) { 
      drawArea();
      return;
    }
  }
  function onMapMouseOut(e) {
    if( in_drawing_point() ) {
      skipPoint();
      return;
    }
    if( in_drawing_profile() ) {
      skipProfile();
      return;
    }
    if( in_drawing_line() ) { 
      skipLine();
      return;
    }
    if( in_drawing_area()) { 
      skipArea();
      return;
    }
  }

  mymap.on('mouseover', onMapMouseOver);
  mymap.on('mouseout', onMapMouseOut);


// ==> point drawing control <==
  pointDrawer = new L.Draw.Marker(mymap, point_options);
// ==> profile drawing control <==
  profileDrawer = new L.Draw.Marker(mymap, profile_options);
// ==> line drawing control <==
  lineDrawer = new L.Draw.Polyline(mymap, line_options);
// ==> area/rectangle drawing control <==
  rectangleDrawer = new L.Draw.Rectangle(mymap, rectangle_options);

  mymap.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'rectangle') {  // tracks retangles
        // get the boundary of the rectangle
        var latlngs=layer.getLatLngs();
        // first one is always the south-west,
        // third one is always the north-east
        var loclist=latlngs[0];
        var sw=loclist[0];
        var ne=loclist[2];
        add_bounding_area_layer(layer,sw['lat'],sw['lng'],ne['lat'],ne['lng']);
    }
    if (type === 'marker') {  // can be a point or a profile
        var sw=layer.getLatLng();
        if( in_drawing_profile() ) {
          add_bounding_profile_layer(layer,sw['lat'],sw['lng']);
          } else {
            add_bounding_point_layer(layer,sw['lat'],sw['lng']);
        }
    }
    if (type === 'polyline') {  // tracks lines
        var latlngs=layer.getLatLngs();
        var sw=latlngs[0];
        var ne=latlngs[1];
        if(sw != undefined && ne != undefined) {
          add_bounding_line_layer(layer,sw['lat'],sw['lng'],ne['lat'],ne['lng']);
        }
    }
  });


// finally,
  return mymap;
}

function drawArea(){ rectangleDrawer.enable(); }
function skipArea(){ rectangleDrawer.disable(); }

function drawPoint(){ pointDrawer.enable(); }
function skipPoint(){ pointDrawer.disable(); }

function drawProfile(){ profileDrawer.enable(); }
function skipProfile(){ profileDrawer.disable(); }

function drawLine(){ lineDrawer.enable(); }
function skipLine(){ lineDrawer.disable(); }

// https://gis.stackexchange.com/questions/148554/disable-feature-popup-when-creating-new-simple-marker
function unbindPopupEachFeature(layer) {
    layer.unbindPopup();
    layer.off('click');
}

function makeModelLayer(latlngs,color) {
  var mypoly=polygon_options;
  mypoly['color']=color;
  var layer = new L.polygon(latlngs, mypoly);
  return layer;
}

function addAreaLayer(latA,lonA,latB,lonB) {
  var bounds = [[latA, lonA], [latB, lonB]];
  var layer =new L.rectangle(bounds,rectangle_options);
  mymap.addLayer(layer);
  return layer;
}

function addPointLayer(lat,lon) {
  var bounds = [lat, lon];
  var layer = L.marker(bounds,point_options);
  mymap.addLayer(layer);
  return layer;
}

function addProfileLayer(lat,lon) {
  var bounds = [lat, lon];
  var layer = new L.marker(bounds,profile_options);
  mymap.addLayer(layer);
  return layer;
}

function addLineLayer(latA,lonA,latB,lonB) {
  var bounds = [[latA, lonA], [latB, lonB]];
  var layer = new L.polyline(bounds,line_options);
  mymap.addLayer(layer);
  return layer;
}

function switchBaseLayer(layerString) {
    mymap.removeLayer(currentLayer);
    mymap.addLayer(baseLayers[layerString]);
    currentLayer = baseLayers[layerString];
}

