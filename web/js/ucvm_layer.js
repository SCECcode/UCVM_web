/***
   ucvm_layer.js
***/

// control whether the main mouseover control should be active or not
var skipPopup=false;

/***
   tracking data structure
***/

// leaflet layer for ucvm model boundaries
// oidx is the order index, when there are more than 1 model visible, the oidx 
// denotes the ordering. 1,2,3 etc
// [ { "model": modelname, "layer": layer, "style":styleblob, 'visible':1, 'oidx':v }, ... ]
var ucvm_model_list =[];

// material properties returned from backend per lat lon point
// mpblob is what ucvm_query returns
// [ { "uid": uid, "mp": mpblob }, ... ]
var ucvm_mp_list=[];

// meta list for a query, per job,
// meta is a json blob for timestamp, mode..
var ucvm_meta_list=[];
// [ { "uid":uid, "meta": metablob }, ... ]


// for tracking uid that did not get 'used'
var dirty_layer_uid=0;
const POINT_ENUM=1,
      PROFILE_ENUM=2,
      LINE_ENUM=3,
      AREA_ENUM=4;
// leaflet layer for query, layer=layer, hlayer is the highlighted version of layer
// [ { "uid": uid, "type": type_enum, "layer": layer, "hlayer":hlayer, 'highlight':1 }, ... ]
var ucvm_layer_list =[];

// area  list, 
// { { "uid":uid, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]}
var ucvm_area_list=[];

// { { "uid":uid, "latlngs":[{"lat":a,"lon":b}]}
var ucvm_point_list=[];
// { { "uid":uid, "filename":filename}]}
var ucvm_point_file_list=[];

// { { "uid":uid, "latlngs":[{"lat":a,"lon":b}]}
var ucvm_profile_list=[];

// { { "uid":uid, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]}
var ucvm_line_list=[];

/*****************************************************************
*****************************************************************/
// suppress all  model layer on the map
function remove_all_models() {
  ucvm_model_list.forEach(function(element) {
      var l=element['layer'];
      if(element['visible']=1) {
        element['visible']=0;
        element['oidx']=0;
        viewermap.removeLayer(l);
      }
  });
}

function load_a_model(name, order) {
   var cnt=ucvm_model_list.length;
   var i;
   for(i=0;i<cnt;i++) {
     var t=ucvm_model_list[i];
     if(t['model'] == name ) {
       if(t['visible']==0) {
          t['visible']=1; 
          t['oidx']=order;
          var layer=t['layer'];
          viewermap.addLayer(layer);
          return 1;
       }
       return 0;
     }
   }
   return 0;
}

function remove_a_model(name) {
   var cnt=ucvm_model_list.length;
   var i;
   for(i=0;i<cnt;i++) {
     var t=ucvm_model_list[i];
     if(t['name'] == name ) {
       if(t['visible']==1) {
          t['visible']=0; 
          t['oidx']=0;
          var layer=t['layer'];
          viewermap.removeLayer(layer);
          return 1;
       }
       return 0;
     }
   }
   return 0;
}


function make_all_model_layer() {
   // get all models
   var name_list=getAllModelNames();
   var cnt=name_list.length;
   var i;
   for(i=0;i<cnt;i++) {
      var name=name_list[i];
      var color=getModelColor(name);
      var latlngs=makeLatlngs(name);
      var layer=makeModelLayer(latlngs,color);
      ucvm_model_list.push({"model": name, "layer": layer, "visible": 0, "oidx":0 });
   }
// initialize with the default model
   load_a_model("cvmh");
}

// can be "cvmh" or "cvmh,cvmsi"
function load_selected_model(modelstr) {
   var mlist=modelstr.split(",");
   var i;
   var cnt=mlist.length;
   for(i=0;i < cnt; i++) {
      load_a_model(mlist[i], i);
   }
}

// see how many mp from points is there right now
function get_points_mp() {
  var len1=ucvm_point_list.length;
  return len1;
}

function get_materialproperty(target_uid) {
  var cnt=ucvm_mp_list.length;
  for(var i=0; i<cnt; i++) {
    var element=ucvm_mp_list[i];
    if (target_uid == element['uid']) {
       var mp=element["mp"];
       return mp;
    }
  }
  return {};
}

/* return meta item if id is in the meta list */
function find_meta_from_list(target_uid) {
   var found=0;
   ucvm_meta_list.forEach(function(element) {
     if ( element['uid'] == target_uid )
        found=element;
   });
   return found;
}

function get_leaflet_id(layer) {
   var id=layer['layer']._leaflet_id;
   return id;
}

function find_layer_from_list(target_uid)
{
   var found=0;
   ucvm_layer_list.forEach(function(element) {
     if ( element['uid'] == target_uid )
        found=element;
   });
   return found;
}

function remove_all_layers() {
   ucvm_layer_list.forEach(function(element) {
     var uid=element['uid'];
     var type=element['type'];
     var layer=element['layer'];
     var hlayer=element['hlayer'];
     switch (type)  {
       case POINT_ENUM: removeFromList(ucvm_point_list,uid); break;
       case LINE_ENUM: removeFromList(ucvm_line_list,uid); break;
       case PROFILE_ENUM: removeFromList(ucvm_profile_list,uid); break;
       case AREA_ENUM: removeFromList(ucvm_area_list,uid); break;
     }
     if(element['highlight']) {
       viewermap.removeLayer(hlayer);
       } else {
         viewermap.removeLayer(layer);
     }
   });
   ucvm_layer_list=[];
}

function reset_dirty_uid() {
   dirty_layer_uid=0;
}

function remove_a_layer(uid) {
   var t=find_layer_from_list(uid);
   if(t) {
     var type=t['type'];
     switch (type)  {
       case POINT_ENUM: removeFromList(ucvm_point_list,uid); break;
       case LINE_ENUM: removeFromList(ucvm_line_list,uid); break;
       case PROFILE_ENUM: removeFromList(ucvm_profile_list,uid); break;
       case AREA_ENUM: removeFromList(ucvm_area_list,uid); break;
     }
     if( t["highlight"]) {
       viewermap.removeLayer(t["hlayer"]);
       } else {
         viewermap.removeLayer(t["layer"]);
     }
     var idx = ucvm_layer_list.indexOf(t);
     if (idx > -1) {
       ucvm_layer_list.splice(idx, 1);
     }
  }
}

function load_a_layer(uid,type,layer,hlayer) {
   var t=find_layer_from_list(uid);
   if(t) {
     window.console.log("already plotted this layer ",uid);
     return;
   }
   ucvm_layer_list.push({"uid":uid, "type":type, "layer":layer, "hlayer":hlayer, "highlight":0});
}

function toggle_a_layer(uid) {
   var found=find_layer_from_list(uid);
   if(found) {
      if(found['highlight']) {
        viewermap.removeLayer(found['hlayer']);
        viewermap.addLayer(found['layer']);
        found['highlight']=0;
        $('#ucvm_layer_'+uid).removeClass('ucvm-active');
        } else {
          found['highlight']=1;
          viewermap.removeLayer(found['layer']);
          viewermap.addLayer(found['hlayer']);
          $('#ucvm_layer_'+uid).addClass('ucvm-active');
      }
   }
}


// this one come from the user interactive mode
function add_bounding_area(uid, a,b,c,d) {
  var layer, hlayer;
  [layer,hlayer]=addAreaLayer(a,b,c,d);
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  ucvm_area_list.push(tmp);
  load_a_layer(uid, AREA_ENUM, layer, hlayer);
}

function remove_bounding_area_layer(uid) {
  remove_a_layer(uid);
}

// this one comes from the map
function add_bounding_area_layer(layer,a,b,c,d) {
  if(dirty_layer_uid) {
    remove_a_layer(dirty_layer_uid);
  }
  var uid=getRnd();
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  set_area_latlons(uid,a,b,c,d);
  ucvm_area_list.push(tmp);
  // create the highlight layer
  var hlayer=addBareAreaLayer(1,a,b,c,d);
  load_a_layer(uid,AREA_ENUM,layer,hlayer);
  viewermap.addLayer(layer);
  dirty_layer_uid=uid;
}
/*** special handle for a file of points ***/
function add_file_of_point(uid, fobj) {
  var tmp={"uid":uid,"file":fobj.name};
  ucvm_point_file_list.push(tmp);
}

function add_bounding_point(uid,a,b) {
  var layer,hlayer;
  [layer,hlayer]=addPointLayer(a,b);
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b}]};
  ucvm_point_list.push(tmp);
  load_a_layer(uid,POINT_ENUM,layer,hlayer);
}

function add_bounding_point_layer(layer,a,b) {
  if(dirty_layer_uid) {
    remove_a_layer(dirty_layer_uid);
  }
  var uid=getRnd();
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b}]};
  set_point_latlons(uid,a,b);
  ucvm_point_list.push(tmp);
  viewermap.addLayer(layer);
  var hlayer=addBarePointLayer(1,a,b);
  load_a_layer(uid,POINT_ENUM,layer,hlayer);
  dirty_layer_uid=uid;
}

function remove_bounding_point_layer(uid) {
  remove_a_layer(uid);
}

function add_bounding_profile(uid,a,b) {
  var layer,hlayer;
  [layer,hlayer]=addProfileLayer(a,b);
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b}]};
  ucvm_profile_list.push(tmp);
  load_a_layer(uid,PROFILE_ENUM,layer,hlayer);
}

function add_bounding_profile_layer(layer,a,b) {
  if(dirty_layer_uid) {
    remove_a_layer(dirty_layer_uid);
  }
  var uid=getRnd();
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b}]};
  set_profile_latlons(uid,a,b);
  ucvm_profile_list.push(tmp);
  viewermap.addLayer(layer);
  var hlayer=addBareProfileLayer(1,a,b);
  load_a_layer(uid,PROFILE_ENUM,layer,hlayer);
  dirty_layer_uid=uid;
}

function remove_bounding_profile_layer(uid) {
  remove_a_layer(uid);
}

function add_bounding_line(uid,a,b,c,d) {
  var layer,hlayer;
  [layer,hlayer]=addLineLayer(a,b,c,d);
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  ucvm_line_list.push(tmp);
  load_a_layer(uid,LINE_ENUM,layer,hlayer);
}

function remove_bounding_line_layer(uid) {
  remove_a_layer(uid);
}

function add_bounding_line_layer(layer,a,b,c,d) {
  if(dirty_layer_uid) {
    remove_a_layer(dirty_layer_uid);
  }
  var uid=getRnd();
  var tmp={"uid":uid,"latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  set_line_latlons(uid,a,b,c,d);
  ucvm_line_list.push(tmp);
  viewermap.addLayer(layer);
  var hlayer=addBareLineLayer(1,a,b,c,d);
  load_a_layer(uid,LINE_ENUM,layer,hlayer);
  dirty_layer_uid=uid;
}
