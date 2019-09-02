/***
   ucvm_query.js

***/

// get material property blob by lat lon z zmode
function getMaterialPropertyByLatlon() {
    clearSearchResult();
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var firstzstr=document.getElementById("firstZTxt").value;
    var firstzmodestr=document.getElementById("firstZmodeTxt").value;
    var modelstr=document.getElementById("modelTxt").value;
window.console.log(modelstr);

    // second set is optional..
    var secondlatstr=(document.getElementById("secondLatTxt"))?document.getElementById("secondLatTxt").value:"";
    var secondlonstr=(document.getElementById("secondLonTxt"))?document.getElementById("secondLonTxt").value:"";

    if (firstlatstr == "" || firstlonstr=="") {
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
        xmlhttp.open("GET","php/getMaterialPropertyByLatlon.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&firstz="+firstzstr+"&firstzmode="+firstzmodestr+"&model="+modelstr, true);
        xmlhttp.send();
    }
}

function plotCrossSection() {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var firstzstr=document.getElementById("firstZTxt").value;
    var firstzmodestr=document.getElementById("firstZmodeTxt").value;
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
                document.getElementById("resultForCrossSection").innerHTML = plotPNG(str);
                document.getElementById('spinIconForCrossSection').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/plotCrossSection.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&firstz="+firstzstr+"&firstzmode="+firstzmodestr+"&model="+modelstr,true);
        xmlhttp.send();
    }
}

function plotVerticalProfile() {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var firstzstr=document.getElementById("firstZTxt").value;
    var firstzmodestr=document.getElementById("firstZmodeTxt").value;
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
                var str=processSearchResult("plotVerticalProfile");
                document.getElementById("resultForVerticalProfile").innerHTML = plotPNG(str);
                document.getElementById('spinIconForVerticalProfile').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/plotVerticalProfile.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&firstz="+firstzstr+"&firstzmode="+firstzmodestr+"&model="+modelstr,true);
        xmlhttp.send();
    }
}


function plotHorizontalSlice() {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var firstzstr=document.getElementById("firstZTxt").value;
    var firstzmodestr=document.getElementById("firstZmodeTxt").value;
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
                document.getElementById("resultForHorizontalSlice").innerHTML = plotPNG(str);
                document.getElementById('spinIconForHorizontalSlice').style.display = "none";
            }
        }
        xmlhttp.open("GET","php/plotHorizontalSlice.php?firstlat="+firstlatstr+"&firstlon="+firstlonstr+"&secondlat="+secondlatstr+"&secondlon="+secondlonstr+"&firstz="+firstzstr+"&firstzmode="+firstzmodestr+"&model="+modelstr,true);
        xmlhttp.send();
    }
}
