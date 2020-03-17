/****

  ucvm_region.js

****/

// information on model 

var UCVM_tb={
"models": [
    {'id':1,
     'model name':'CVM-H v15.1',
     'abb name':'cvmh',
     'path name':'cvmh1511',
     'model filename':'cvmh-15.1.1.tar.gz',
     'description':'Southern California Velocity Model developed by Harvard Structural Geology Group',
     'coordinates': [
          { 'lon':-120.862028,'lat':30.956496 },
          { 'lon':-120.862028, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':30.956496 } ],
     'color':'#00B0FF'},
    {'id':2,
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
     'color':'#FF3D00'},
    {'id':3,
     'model name':'CVM-S4.26',
     'abb name':'cvms5',
     'path name':'cvms5',
     'model filename':'cvms5.tar.gz',
     'description':'Tomography improved version of CVM-S4 with no geotechnical layer',
     'coordinates': [
          { 'lon':-116.000, 'lat':30.4499 },
          { 'lon':-122.300, 'lat':34.7835 },
          { 'lon':-118.9475, 'lat':38.3035 },
          { 'lon':-112.5182, 'lat':33.7819 } ],
     'color':'#2E7D32'},
    {'id':4,
     'model name':'CVM-S4.26.M01',
     'abb name':'cvmsi',
     'path name':'cvms426',
     'model filename':'cvms426.tar.gz',
     'description':'CVM-S4.26 with geotechnical layer',
     'coordinates': [
          { 'lon':-116.000, 'lat':30.4499 },
          { 'lon':-122.300, 'lat':34.7835 },
          { 'lon':-118.9475, 'lat':38.3035 },
          { 'lon':-112.5182, 'lat':33.7819 } ],
     'color':'#FFA726'},
    {'id':5,
     'model name':'ALBACORE',
     'abb name':'albacore',
     'path name':'albacore',
     'model filename':'albacore.tar.gz',
     'description':'Southern California Off-shore Velocity Model',
     'coordinates': [
               {'lon':-116.847200,'lat':33.300000},
               {'lon':-116.847200,'lat':32.700000},
               {'lon':-124.047200,'lat':32.700000},
               {'lon':-124.047200,'lat':33.000000},
               {'lon':-124.647200,'lat':33.000000},
               {'lon':-124.647200,'lat':33.600000},
               {'lon':-123.447200,'lat':33.600000},
               {'lon':-123.447200,'lat':33.900000},
               {'lon':-123.147200,'lat':33.900000},
               {'lon':-123.147200,'lat':34.200000},
               {'lon':-121.347200,'lat':34.200000},
               {'lon':-121.347200,'lat':34.500000},
               {'lon':-120.447200,'lat':34.500000},
               {'lon':-120.447200,'lat':34.800000},
               {'lon':-118.947200,'lat':34.800000},
               {'lon':-118.947200,'lat':34.500000},
               {'lon':-118.647200,'lat':34.500000},
               {'lon':-118.647200,'lat':34.200000},
               {'lon':-118.047200,'lat':34.200000},
               {'lon':-118.047200,'lat':33.900000},
               {'lon':-117.447200,'lat':33.900000},
               {'lon':-117.447200,'lat':33.600000},
               {'lon':-117.147200,'lat':33.600000},
               {'lon':-117.147200,'lat':33.300000},
               ],
     'color':'#FF0000'},
    ],
"fileformats": [
    {'id':1,
     'format name':'image',
     'suffix':'png',
     'description':'plot image in fixed discrete color scale'},
    {'id':2,
     'format name':'metadata',
     'suffix':'json',
     'description':'metadata describing the image and the binary image data'},
    {'id':3,
     'format name':'data',
     'suffix':'bin',
     'description':'binary image data'},
    {'id':4,
     'format name':'dataset',
     'suffix':'json',
     'description':'image data in triplets'},
    {'id':5,
     'format name':'material property data',
     'suffix':'json',
     'description':'material property'}
    ],
"zmodes": [
    {'id':1,
     'mode name':'Depth',
     'value':'d',
     'description':'0 at surface and positive depth value'},
    {'id':2,
     'mode name':'Elevation',
     'value':'e',
     'description':'0 at sealevel and positive value toward the air and negative value toward the center of the earth'}
    ],
"Products": [
    {'id': 1,
     'product name': '0D Point',
     'description':'Material Properties are returned for the selected location'},
    {'id': 2,
     'product name': '1D Vertical Profile',
     'description':'3 Vertical profile(Vp, Vs, Rho) plots are produced for the selected location. The plot starts at Z start, ends at Z ends, and in Z step interval'},
    {'id': 3,
     'product name': '2D Vertical Cross Section',
     'description':'A Cross section of a selected property is produced between two selected points. The plot starts at Z start, ends at Z ends, and the interval is determined by the web service'},
    {'id': 3,
     'product name': '2D Horizontal Slice',
     'description':'A Horizontal slice of a selected property is produced in a area marked by the rectangle drawn with the depth or elevation supplied as Z, and the interval is determined by the web service.'},
    ]
};

function makeModelSelection()
{
   var tb=UCVM_tb['models'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt; i++) {
     var item=tb[i];
     var color=item['color'];
     var aname=item['abb name'];
     var mname=item['model name'];
     var sel=document.getElementById('modelType');
     var option = document.createElement("option");
     option.text = mname;
     option.value= aname;
     sel.add(option);
   } 
   // special case
   var option = document.createElement("option");
   option.text = "-- Advanced --";
   option.setAttribute("disabled", true);
   option.value= "disabled";
   sel.add(option);

   option = document.createElement("option");
   option.text = "CVM-S4.26.M01,CVM-H v15.1";
   option.value= "cvmsi,cvmh"; 
   sel.add(option);

/****
   option = document.createElement("option");
   option.text = "CVM-S4.26,elygtl:ely";
   option.value= "cvms5,elygtl:ely"; 
   sel.add(option);
****/

// put in the default region on the map
   makeLatlngsCoordinate('cvmh');
}

function getModelColor(target_nm) {
   var tb=UCVM_tb['models'];
   var icnt=tb.length;
   var i;
   for(i=0; i<icnt; i++) {
     var item=tb[i];
     if(item['abb name'] == target_nm) {
        var color=item['color'];
        return color;
     }
  }
  return "black";
}

function makeLatlngsCoordinate(target_nm) {

   var ret=[];
   var tb=UCVM_tb['models'];
   var icnt=tb.length;
   var lon, lat;
   var i,j;
   for(i=0; i<icnt; i++) {
     var item=tb[i];
     if(item['abb name'] == target_nm) {
        var coord=item['coordinates'];
        var jcnt=coord.length;
        for(j=0;j<jcnt;j++) {
          var c=coord[j];
          lon=c['lon'];
          lat=c['lat'];
          ret[ret.length]=([lat, lon]);      
        }
//        window.console.log(ret);
        return ret;
      }
   }
   return ret;
}

function makeModelTable() {
   var tb=UCVM_tb['models'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">UCVM Model Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ucvm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:8vw\"><b>Model</b></td><td style=\"width:6vw\"><b>UCVM abbreviation</b></td><td style=\"width:40vw\"><b>Description</b></td></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['model name'];
     var aname=item['abb name'];
     var descript=item['description'];
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

function getModelNameWithType(t) {
   // t could be multiple, "albacore,cvms"
   var rt="";
   var mlist=t.split(',');
   var mcnt=mlist.length;
   var tlist=UCVM_tb['models'];
   var tcnt=tlist.length;
   var i,j;

   for(i=0;i<mcnt;i++) {
      for(j=0; j<tcnt;j++) {
         var target=tlist[j];
         if(target['abb name'] == mlist[i]) {
            rt=rt+target['model name'];
            if(i>0 && i<mcnt)
               rt=rt+", ";
            break;
         }
      }
   }
   if(rt=="")
       rt=undefined;
   return rt;
}
function getZModeNameWithType(t) {
   var tb=UCVM_tb['zmodes'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var zmode=tb[i];
      if(zmode['value'] == t) {
        return zmode['mode name'];
      }
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

function getAllModelNames() {
   var ret=[];
   var tb=UCVM_tb['models'];
   var cnt=tb.length;
   var i,item,aname;
   for(i=0; i<cnt; i++) {
     item=tb[i]; 
     aname=item['abb name'];
     ret.push(aname);
   }
   return ret;
}

function makeFileFormatTable() {
   var tb=UCVM_tb['fileformats'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">File Format Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ucvm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:12vw\"><b>Format</b></td><td style=\"width:4vw\"><b>suffix</b></td><td style=\"width:40vw\"><b>Description</b></td></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var fname=item['format name'];
     var suffix=item['suffix'];
     var descript=item['description'];
     var t="<tr><td style=\"width:12vw\">"+fname+"</td><td style=\"width:4vw\">"+suffix+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function makeZModeTable() {
   var tb=UCVM_tb['zmodes'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">Z Mode Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"ucvm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:8vw\"><b>Mode</b></td><td style=\"width:40vw\"><b>Description</b></td></tr>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['mode name'];
     var descript=item['description'];
     var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}
