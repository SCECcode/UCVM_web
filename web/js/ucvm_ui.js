/***
   ucvm_ui.js
***/

function setup_viewer() {
}

function horizontalSliceClick() {
    document.getElementById('spinIconForHorizontalSlice').style.display = "block";	
    plotHorizontalSlice();
}

function crossSectionClick() {
    document.getElementById('spinIconForCrossSection').style.display = "block";	
    plotCrossSection();
}

function verticalProfileClick() {
    document.getElementById('spinIconForVerticalProfile').style.display = "block";	
    plotVerticalProfile();
}

function propertyClick() {
    document.getElementById('spinIconForProperty').style.display = "block";	
    getMaterialPropertyByLatlon();
}

function plotPNG2(str)
{
    var html="";

    // just one
    if( typeof str === 'string') { 
       html="<a href=\"result/"+str+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>";
       return html;
    }

    // a set of them,  obj['first'] and obj['second']
    var keys=Object.keys(str);
    var sz=(Object.keys(str).length);
    var i;

    html=html+"<div class=\"row\" style=\"display:inline-block\">";
    for(i=0;i<sz;i++) {
       var val=str[keys[i]]; 
       html=html+"<a href=\"result/"+val+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>";
    }
    html=html+"</div>";

    return html;
    
}

function plotPNG(str)
{
    var html="";
    // just one
    if( typeof str === 'string') { 
       html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-eye-open\"></span></a></div>";
       return html;
    }

    // a set of them,  obj['first'] and obj['second']
    var keys=Object.keys(str);
    var sz=(Object.keys(str).length);
    var i;

    html="<div class=\"links\" style=\"display:inline-block\">";
    for(i=0;i<sz;i++) {
       var val=str[keys[i]]; 
       html=html+"<a class=\"openpop\" href=\"result/"+val+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>";
    }
    html=html+"</div>";

    return html;
    
}

function clearSearchResult()
{
    document.getElementById("searchResult").innerHTML = "";
}

// takes 2 sets of result
function makeResultTable(str)
{
    var i;
    var blob;
    if( str == undefined || str == "" ) {
       window.console.log("ERROR: no return result");
       return "";
    }
    if( typeof str === 'string') { 
       blob=JSON.parse(str);
       } else {
         blob=str;
    }

    var keys=Object.keys(blob);
    var sz=(Object.keys(blob).length);

window.console.log(JSON.stringify(blob));
    var justOne=0;
    if(sz != 2) {
       window.console.log("ERROR: expecting 2 set of material properties");
       return;
    }
    var blob1=blob[keys[0]];
    var blob2=blob[keys[1]];

    if( typeof blob1 === 'string' && blob1 != "") { 
       blob1=JSON.parse(blob1);
    }

    if(blob2 == "") { 
       justOne=1; 
    }

    if( !justOne && typeof blob2 === 'string' && blob2 != "") {
       blob2=JSON.parse(blob2);
    }

    var html;
    keys=Object.keys(blob1);
    sz=(Object.keys(blob1).length);

    html="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";

    html=html+"<div class=\"ucvm-table\"><table><tbody>";
  
    for(i=0; i<sz; i++) {
       var key=keys[i];
       var val1=blob1[key];
       if(!justOne) {
         var val2=blob2[key];
         var t="<tr><td style=\"width:10px\">"+key+"</td><td style=\"width:20px\">"+val1+"</td><td style=\"width:20px\">"+val2+"</td></tr>";
         html=html+t;
         } else {
           // access unit/extra handling
           var u=getUnitsWithLabel(key, parseInt(val1));
           if(u == undefined)
              u="";
           var t="<tr><td style=\"width:10px\">"+key+"</td><td style=\"width:20px\">"+val1+"</td><td style=\"width:30px\">"+u+"</td></tr>";
           html=html+t;
       }
    }
    html=html+"</tbody></table></div>";
    return html;
}

// takes 1 or more sets of result
// of { 'first':{...}, 'second':{...}, ...}
function makeHorizontalResultTable(str)
{
    var i;
    var blob;
    if( str == undefined || str == "" ) {
       window.console.log("ERROR: no return result");
       return "";
    }
    if( typeof str === 'string') { 
       blob=JSON.parse(str);
       } else {
         blob=str;
    }

    var dkeys=Object.keys(blob); // dkeys: first, second
    var dsz=(Object.keys(blob).length); // 2

window.console.log(JSON.stringify(blob));

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    html="<table><tbody><tr><th style=\"border:1px solid white;\">Material Property</th></tr></tbody></table>";
    html=html+"<div class=\"gfm-table\"><table><tbody>";

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       if(datablob == "") {
           window.console.log("ERROR: expecting at least 1 set of material properties");
           return ""; // html
       }
       datablob=JSON.parse(datablob);
    }

    // create the key and unit parts first
    var labelline="";
    var unitline="";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    labelline="<tr>";
    unitline="<tr>";
 
    for(i=0; i<sz; i++) {
        key=datakeys[i];
        var u=getUnitsWithLabel(key);
        if(u == undefined)
           u="";
        labelline=labelline+"<td style=\"width:20px\">"+key+"</td>";
        unitline=unitline+"<td style=\"width:20px\">"+u+"</td>";
    }
    labelline=labelline+"</tr>";
    unitline=unitline+"</tr>";

    html=html+labelline;

    // now adding the data part..
    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        var mpline="<tr>";
        mpline="<tr>";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            mpline=mpline+"<td style=\"width:20px\">"+val2+"</td>";
         }
         mpline=mpline+"</tr>";
         html=html+mpline;
    }

    html=html+unitline;
    html=html+"</tbody></table></div>";
    return html;
}


function saveAsBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="GFM_"+timestamp+".json";
    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    //FileSaver.js
    saveAs(blob, fname);
}

function saveAsURLFile(gid,url) {
  var dname=url.substring(url.lastIndexOf('/')+1);
  var dload = document.createElement('a');
  dload.href = url;
  dload.download = dname;
  dload.type="application/octet-stream";
  dload.style.display='none';
  document.body.appendChild(dload);
  dload.click();
  document.body.removeChild(dload);
  delete dload;
}

