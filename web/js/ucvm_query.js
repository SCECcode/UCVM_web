/***
   ucvm_query.js

***/
var hold_htmlstr="";
//
// get a data array
//    [[lat1,lon1,z1],...,[latn,lonn,zn]]
// compose a json structure:
//    { "1": { "lat":latval1,"lon":lonval1; "z":z1 },
//     ...,
//      "n": { "lat":latvaln,"lon":lonvaln; "z":zn } }
// get the material properties of the latlon locations
//

var MAX_CHUNKS_TO_DISPLAY=1;
function getMaterialPropertyByLatlonList(uid,dataarray,current_chunk, total_chunks, chunk_step) {
    if(current_chunk == total_chunks) 
        return;
    var cnt=dataarray.length;
    // start and last data
    var start_idx=current_chunk * chunk_step;
    var end_idx=current_chunk * chunk_step + chunk_step;
    if(end_idx > cnt)
        end_idx=cnt;

    var i;
    var dataset=[];
    for( i=start_idx; i<end_idx; i++) {
// collect up the string
        dataset.push(dataarray[i]);
    }
    var datastr=dataset.toString();
    window.console.log(datastr);

    var skip=0; // skip the transfer of the result
    if( current_chunk >= MAX_CHUNKS_TO_DISPLAY)
      skip=1;

    _getMaterialPropertyByLatlonChunk(skip,uid,datastr, dataarray, current_chunk, total_chunks,chunk_step);
           
}

// to be called by getMaterialPropertyByLatlonList
function _getMaterialPropertyByLatlonChunk(skip,uid,datastr, dataarray, current_chunk, total_chunks, chunk_step) {
    if(current_chunk == 0)
        clearSearchResult();
    // extract content of a file
    var zmodestr=document.getElementById("zModeType").value;
    var modelstr=document.getElementById("modelType").value;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("getMaterialPropertyByLatlonChunk",uid);
           
            if(current_chunk==0) { // first one
               makeHorizontalResultTable_start(uid,str);
               getMaterialPropertyByLatlonList(uid,dataarray, current_chunk+1, total_chunks, chunk_step);
            } else {
// try to limit the size of the table..
               if(current_chunk < MAX_CHUNKS_TO_DISPLAY) {
                  makeHorizontalResultTable_next(uid,str);
               } 
               getMaterialPropertyByLatlonList(uid,dataarray, current_chunk+1, total_chunks, chunk_step);
            }
            if(current_chunk==(total_chunks-1)) { // last one
// create a download link to the actual data file
               insertMetaPlotResultTable_mp("material property",uid,str);
               document.getElementById('spinIconForListProperty').style.display = "none";
               reset_point_UID();
            }
       }
    }
    xmlhttp.open("GET","php/getMaterialPropertyByLatlonChunk.php?datastr="+datastr+"&zmode="+zmodestr+"&chunkid="+current_chunk+"&chunks="+total_chunks+"&model="+modelstr+"&skip="+skip+"&uid="+uid, true);
    xmlhttp.send();
}

// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon() {
    var latstr=document.getElementById("pointFirstLatTxt").value;
    var lonstr=document.getElementById("pointFirstLonTxt").value;
    var zstr=document.getElementById("pointZTxt").value;
    var zmodestr=document.getElementById("zModeType").value;
    var modelstr=document.getElementById("modelType").value;
    var uid=document.getElementById("pointUIDTxt").value;

    if(uid == '') {
      uid=getRnd();
      set_point_UID(uid);    
      // must be coming from the sidebar and so need to plot on map..
      add_bounding_point(uid,latstr,lonstr);
    } else {
      reset_dirty_uid();
    }

    if (latstr == "" || lonstr=="") {
        return;
    } else {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("getMaterialPropertyByLatlon",uid);
                if(get_points_mp() == 1) {
                  makeHorizontalResultTable(uid,str);
                  } else {
                    makeHorizontalResultTable_row(uid,str);
                }
                document.getElementById('spinIconForProperty').style.display = "none";
                reset_point_UID();
            }
        }
        xmlhttp.open("GET","php/getMaterialPropertyByLatlon.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr+"&uid="+uid, true);
        xmlhttp.send();
    }
}

function plotCrossSection() {
    var firstlatstr=document.getElementById("lineFirstLatTxt").value;
    var firstlonstr=document.getElementById("lineFirstLonTxt").value;
    var zstr=document.getElementById("lineZTxt").value;
    var zstartstr=document.getElementById("lineZStartTxt").value;
    var datatypestr=document.getElementById("lineDataTypeTxt").value;
    var zmodestr=document.getElementById("zModeType").value;
    var modelstr=document.getElementById("modelType").value;

    var secondlatstr=document.getElementById("lineSecondLatTxt").value;
    var secondlonstr=document.getElementById("lineSecondLonTxt").value;
    var uid=document.getElementById("lineUIDTxt").value;
    if(uid == '') {
      uid=getRnd();
      set_line_UID(uid);
      add_bounding_line(uid,firstlatstr,firstlonstr,secondlatstr,secondlonstr);
      } else {    
        reset_dirty_uid();
    }

    if (firstlatstr == "" || firstlonstr=="" ||
              secondlatstr == "" || secondlonstr=="" ) {
        clearSearchResult();
        return;
    } else {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("plotCrossSection",uid);

		if (str != undefined) 
                  insertMetaPlotResultTable("cross section",uid,str);

                document.getElementById('spinIconForLine').style.display = "none";
                reset_line_UID();
            }
        }
        xmlhttp.open("GET","php/plotCrossSection.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr+"&zstart="+zstartstr+"&datatype="+datatypestr+"&uid="+uid,true);
        xmlhttp.send();
    }
}

function plotVerticalProfile() {
    var latstr=document.getElementById("profileFirstLatTxt").value;
    var lonstr=document.getElementById("profileFirstLonTxt").value;
    var zstr=document.getElementById("profileZTxt").value;
    var zstartstr=document.getElementById("profileZStartTxt").value;
    var zstepstr=document.getElementById("profileZStepTxt").value;
    var uid=document.getElementById("profileUIDTxt").value;
    var zmodestr=document.getElementById("zModeType").value;
    var modelstr=document.getElementById("modelType").value;
    if(uid == '') {
      uid=getRnd();
      set_profile_UID(uid);
      add_bounding_profile(uid,latstr,lonstr);
      } else {    
        reset_dirty_uid();
    }

    if (latstr == "" || lonstr=="" ) {
        clearSearchResult();
        return;
    } else {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("plotVerticalProfile",uid);

		if (str != undefined) {
                  insertMetaPlotResultTable("vertical profile", uid,str);
                }
                document.getElementById('spinIconForProfile').style.display = "none";
                reset_profile_UID();
            }
        }
        xmlhttp.open("GET","php/plotVerticalProfile.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr+"&zstart="+zstartstr+"&zstep="+zstepstr+"&uid="+uid,true);
        xmlhttp.send();
    }
}


function plotHorizontalSlice() {
    var firstlatstr=document.getElementById("areaFirstLatTxt").value;
    var firstlonstr=document.getElementById("areaFirstLonTxt").value;
    var zstr=document.getElementById("areaZTxt").value;
    var datatypestr=document.getElementById("areaDataTypeTxt").value;
    var zmodestr=document.getElementById("zModeType").value;
    var modelstr=document.getElementById("modelType").value;
    var uid=document.getElementById("areaUIDTxt").value;

    var secondlatstr=document.getElementById("areaSecondLatTxt").value;
    var secondlonstr=document.getElementById("areaSecondLonTxt").value;
    if(uid == '') {
      uid=getRnd();
      set_area_UID(uid);
      add_bounding_area(uid,firstlatstr,firstlonstr,secondlatstr,secondlonstr);
      } else {    
        reset_dirty_uid();
    }

    if (firstlatstr == "" || firstlonstr=="" ||
              secondlatstr == "" || secondlonstr=="" ) {
        clearSearchResult();
        return;
    } else {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
window.console.log(this.responseText);
                var str=processSearchResult("plotHorizontalSlice",uid);

		if (str != undefined) 
                  insertMetaPlotResultTable("horizontal slice",uid,str);

                document.getElementById('spinIconForArea').style.display = "none";
                reset_area_UID();
            }
        }
        xmlhttp.open("GET","php/plotHorizontalSlice.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr+"&datatype="+datatypestr+"&uid="+uid,true);
        xmlhttp.send();
    }
}
