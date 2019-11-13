/**

  ucvm_sidebar.js

**/

var latlon_sidebar=false;

var drawing_rectangle=false;

// initiate a click on the sidebar buttons
// to dismiss the sidebar
function dismiss_sidebar() {
  clear_popup(); 
  if(latlon_sidebar) latlonClick();
}

// latlon sidebar js
// slide out
function latlonClick() {
  if(!latlon_sidebar) { dismiss_sidebar(); }

  latlon_sidebar = !latlon_sidebar;
  if(latlon_sidebar) {
    sidebar_latlon_slideOut();
    $('#latlonBtn').addClass('pick');
    markLatlon();
    } else {
      // enable the popup on map
      sidebar_latlon_slideIn();
      $('#latlonBtn').removeClass('pick');
  }
}

function set_latlons(firstlat,firstlon,secondlat,secondlon) {
   // need to capture the lat lon and draw a rectangle
   if(latlon_sidebar && drawing_rectangle) {
       $( "#firstLatTxt" ).val(firstlat);
       $( "#firstLonTxt" ).val(firstlon);
       $( "#secondLatTxt" ).val(secondlat);
       $( "#secondLonTxt" ).val(secondlon);
   }
}

function draw_at()
{
   if(latlon_sidebar && drawing_rectangle) {
     drawRectangle();
   }
}

// need to capture the lat lon and draw a rectangle but
// not when in the map-marking mode : drawing_rectangle==true
function chk_and_add_bounding_rectangle() {
  
  if(drawing_rectangle) {
    return;
  }
  var firstlatstr=document.getElementById("firstLatTxt").value;
  var firstlonstr=document.getElementById("firstLonTxt").value;
  var secondlatstr=document.getElementById("secondLatTxt").value;
  var secondlonstr=document.getElementById("secondLonTxt").value;

  if(secondlatstr == "optional" && secondlonstr == "optional") {
    if(firstlatstr && firstlonstr) { // 2 values
       var t1=parseFloat(firstlatstr);
       var t2=parseFloat(firstlonstr);
       park_a=t1-0.001;
       park_b=t2-0.001;
       park_c=t1+0.001;
       park_d=t2+0.001;
       add_bounding_rectangle(park_a,park_b,park_c,park_d);
    } 
    } else {
       if(secondlatstr && secondlonstr) {
         if(firstlatstr && firstlonstr) { // 4 values
           park_a=parseFloat(firstlatstr);
           park_b=parseFloat(firstlonstr);
           park_c=parseFloat(secondlatstr);
           park_d=parseFloat(secondlonstr);
           add_bounding_rectangle(park_a,park_b,park_c,park_d);
         }
       }
  }
}

//dismiss all popup and suppress the popup on map
function sidebar_latlon_slideOut() {
  if (jQuery('#latlon').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#latlon');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}

function markLatlon() {
  if(skipPopup == false) { // enable marking
    clear_popup();
    skipPopup = true;
    drawing_rectangle=true;
    unbind_layer_popup();
    $('#markerBtn').css("color","red");
    } else {
       skipPopup = false;
       drawing_rectangle=false;
       skipRectangle();
       $('#markerBtn').css("color","blue");
       remove_bounding_rectangle_layer();
       rebind_layer_popup();
  }
}

function reset_markLatlon() {
  skipPopup = false;
  $('#markerBtn').css("color","blue");
  drawing_rectangle=false;
  skipRectangle();
  rebind_layer_popup();
  remove_bounding_rectangle_layer();
  reset_select_latlon();
}


// enable the popup on map
function sidebar_latlon_slideIn() {
  if (jQuery('#latlon').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#latlon');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
  reset_markLatlon();
}

