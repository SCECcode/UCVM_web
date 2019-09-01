/***
   ucvm_ui.js
***/

function setup_viewer() {
}

function horizontalSliceClick() {
    document.getElementById('spinIconForHorizontal').style.display = "block";	
    plotHorizontalSlice();
}

function crossSectionClick() {
    document.getElementById('spinIconForCross').style.display = "block";	
    plotCrossSection();
}

function verticalProfileClick() {
    document.getElementById('spinIconForVertical').style.display = "block";	
    plotVerticalProfile();
}

function propertyClick() {
    document.getElementById('spinIconForProperty').style.display = "block";	
    getMaterialPropertyByLatlon();
}

function plotPNG(str)
{
    var html="";

    // just one
    if( typeof str === 'string') { 
       html="<br><a href=\"result/"+str+"\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>";
       return html;
    }

    // a set of them,  obj['first'] and obj['second']
    var keys=Object.keys(str);
    var sz=(Object.keys(str).length);
    var i;

    for(i=0;i<sz;i++) {
       var val=str[keys[i]]; 
       html=html+"<br><a href=\"result/"+val+"\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>";
    }

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

