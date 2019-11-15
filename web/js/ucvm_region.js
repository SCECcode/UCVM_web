/****

  ucvm_region.js

****/

// information on model 

var UCVM_tb={
"models": [
    {'id':1,
     'model name':'CVM-S4',
     'abb name':'cvms',
     'path name':'cvms',
     'model filename':'cvms4.tar.gz',
     'description':'Southern California Velocity Model developed by SCEC, Caltech, USGS Group with geotechnical layer',
     'coordinates': [
          { 'lon':-116.64433, 'lat':31.102 },
          { 'lon':-121.568, 'lat':35.18167 },
          { 'lon':-118.49184, 'lat':37.73133 },
          { 'lon':-113.56834, 'lat':33.65166 } ],
     'color':'#786D5F'},
    {'id':2,
     'model name':'CVM-S4.26',
     'abb name':'cvms5',
     'path name':'cvms5',
     'model filename':'cvms5.tar.gz',
     'description':'Tomography improved version of CVM-S4 with optional geotechnical layer(Ely-Jordan GTL, default is off)',
     'coordinates': [
          { 'lon':-116.000, 'lat':30.4499 },
          { 'lon':-122.300, 'lat':34.7835 },
          { 'lon':-118.9475, 'lat':38.3035 },
          { 'lon':-112.5182, 'lat':33.7819 } ],
     'color':'#3090C7'},
    {'id':3,
     'model name':'CVM-S4.26.M01',
     'abb name':'cvmsi',
     'path name':'cvms426',
     'model filename':'cvms426.tar.gz',
     'description':'CVM-S4.26 with added geotechnical layer',
     'coordinates': [
          { 'lon':-116.000, 'lat':30.4499 },
          { 'lon':-122.300, 'lat':34.7835 },
          { 'lon':-118.9475, 'lat':38.3035 },
          { 'lon':-112.5182, 'lat':33.7819 } ],
     'color':'#FFD801'},
    {'id':4,
     'model name':'CVM-Hv15.1',
     'abb name':'cvmh',
     'path name':'cvmh1511',
     'model filename':'cvmh-15.1.1.tar.gz',
     'description':'Southern California Velocity Model developed by Harvard Structural Geology Group with optional geotechnical layer',
     'coordinates': [
          { 'lon':-120.862028,'lat':30.956496 },
          { 'lon':-120.862028, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':30.956496 } ],
     'color':'#6A1B9A'},
    ]
};

function makeModelTable() {
   var tb=ucvm_tb['models'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">UCVM Model Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ucvm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:6vw\">model</td><td style=\"width:6vw\">abbv</td><td style=\"width:40vw\">Description</td></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['model name'];
     var aname=item['abb name'];
     var descript=item['descript'];
     var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:6vw\">"+aname+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function _getModelItemWithID(id) {
   var tb=UCVM_tb['models'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var model=tb[i];
      if(model['id'] == id) {
        return model;
      }
   }
   return undefined;
}

function getModelNameWithID(id) {
   var item=_getModelItemWithID(id);
   if(item != undefined) {
       var n= item['model name'];
       return n;
   }
   return undefined;
}

function getModelColorWithID(id) {
   var item=_getModelItemWithID(id);
   if(item != undefined) {
       var c= item['color'];
       return c;
   }
   return undefined;
}

function getModelCoordinatesWithID(id) {
   var item=_getModelItemWithID(id);
   if(item != undefined) {
       var coord= item['coordinates'];
       return coord;
   }
   return undefined;
}
