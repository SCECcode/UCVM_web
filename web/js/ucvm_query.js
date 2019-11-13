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
function getMaterialPropertyByLatlonList(ulabel,dataarray,current_chunk, total_chunks, chunk_step) {
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

    var skip=0; // skip the transfer of the result
    if( current_chunk >= MAX_CHUNKS_TO_DISPLAY)
      skip=1;

    _getMaterialPropertyByLatlonChunk(skip,ulabel,datastr, dataarray, current_chunk, total_chunks,chunk_step);
           
}

// to be called by getMaterialPropertyByLatlonList
function _getMaterialPropertyByLatlonChunk(skip,ulabel,datastr, dataarray, current_chunk, total_chunks, chunk_step) {
    if(current_chunk == 0)
        clearSearchResult();
    // extract content of a file
    var zmodestr=document.getElementById("ZmodeTxt").value;
    var modelstr=document.getElementById("modelTxt").value;

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
            var str=processSearchResult("getMaterialPropertyByLatlonChunk");
           
            if(current_chunk==0) { // first one
               htmlstr = makeHorizontalResultTable_start(str);
               hold_htmlstr=hold_htmlstr+htmlstr;
               getMaterialPropertyByLatlonList(ulabel,dataarray, current_chunk+1, total_chunks, chunk_step);
            } else {
// try to limit the size of the table..
               if( current_chunk < MAX_CHUNKS_TO_DISPLAY) {
                   htmlstr = makeHorizontalResultTable_next(str);
                   hold_htmlstr=hold_htmlstr+htmlstr;
               } 
               getMaterialPropertyByLatlonList(ulabel,dataarray, current_chunk+1, total_chunks, chunk_step);
            }
            if(current_chunk==(total_chunks-1)) { // last one
               htmlstr=makeHorizontalResultTable_last();
               hold_htmlstr=hold_htmlstr+htmlstr;
               document.getElementById("searchResult").innerHTML = hold_htmlstr;
               document.getElementById('spinIconForListProperty').style.display = "none";
// create a download link to the actual data file
               window.console.log("setup the download link...");
               document.getElementById('resultForMPQuery').innerHTML=linkDownload("UCVM_"+ulabel+".json");
               set_ULABEL(ulabel);
            }
       }
    }
    xmlhttp.open("GET","php/getMaterialPropertyByLatlonChunk.php?datastr="+datastr+"&zmode="+zmodestr+"&chunkid="+current_chunk+"&ulabel="+ulabel+"&chunks="+total_chunks+"&model="+modelstr+"&skip="+skip, true);
    xmlhttp.send();
}

// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon() {
    clearSearchResult();
    var latstr=document.getElementById("firstLatTxt").value;
    var lonstr=document.getElementById("firstLonTxt").value;
    var zstr=document.getElementById("ZTxt").value;
    var zmodestr=document.getElementById("ZmodeTxt").value;
    var modelstr=document.getElementById("modelTxt").value;

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
                var str=processSearchResult("getMaterialPropertyByLatlon");
                document.getElementById("searchResult").innerHTML = makeHorizontalResultTable(str);
                document.getElementById('spinIconForProperty').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/getMaterialPropertyByLatlon.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr, true);
        xmlhttp.send();
    }
}

function plotCrossSection() {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var zstr=document.getElementById("ZTxt").value;
    var zmodestr=document.getElementById("ZmodeTxt").value;
    var zstartstr=document.getElementById("ZStartTxt").value;
    var zstepstr=document.getElementById("ZStepTxt").value;
    var modelstr=document.getElementById("modelTxt").value;

    var secondlatstr=(document.getElementById("secondLatTxt"))?document.getElementById("secondLatTxt").value:"";
    var secondlonstr=(document.getElementById("secondLonTxt"))?document.getElementById("secondLonTxt").value:"";

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
                var str=processSearchResult("plotCrossSection");
		if (str != undefined) 
                  document.getElementById("resultForCrossSection").innerHTML = plotPNG(str);
                document.getElementById('spinIconForCrossSection').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/plotCrossSection.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr+"&zstart="+zstartstr+"&zstep="+zstepstr,true);
        xmlhttp.send();
    }
}

function plotVerticalProfile() {
    var latstr=document.getElementById("firstLatTxt").value;
    var lonstr=document.getElementById("firstLonTxt").value;
    var zstr=document.getElementById("ZTxt").value;
    var zmodestr=document.getElementById("ZmodeTxt").value;
    var modelstr=document.getElementById("modelTxt").value;

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
                var str=processSearchResult("plotVerticalProfile");
		if (str != undefined) 
                  document.getElementById("resultForVerticalProfile").innerHTML = plotPNG(str);
                document.getElementById('spinIconForVerticalProfile').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/plotVerticalProfile.php?lat="+latstr+"&lon="+lonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr,true);
        xmlhttp.send();
    }
}


function plotHorizontalSlice() {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var zstr=document.getElementById("ZTxt").value;
    var zmodestr=document.getElementById("ZmodeTxt").value;
    var modelstr=document.getElementById("modelTxt").value;

    // second set is optional..
    var secondlatstr=(document.getElementById("secondLatTxt"))?document.getElementById("secondLatTxt").value:"";
    var secondlonstr=(document.getElementById("secondLonTxt"))?document.getElementById("secondLonTxt").value:"";

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
                var str=processSearchResult("plotHorizontalSlice");
		if (str != undefined) 
                  document.getElementById("resultForHorizontalSlice").innerHTML = plotPNG(str);
                document.getElementById('spinIconForHorizontalSlice').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/plotHorizontalSlice.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&z="+zstr+"&zmode="+zmodestr+"&model="+modelstr,true);
        xmlhttp.send();
    }
}
