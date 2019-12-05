/***
   ucvm_ui.js
***/

/***
   tracking download handles
***/

// tracking the result blob coming in from the server
// blob can include plot name, mp file etc in an array form
/**** 
    $resultarray = new \stdClass();
    $resultarray->uid= $uid;
    $resultarray->plot= $uid."cross.png";
    $resultarray->query= $query;
    $resultarray->meta= $uid."cross_meta.json";
    $resultarray->data= $uid."cross_data.bin";
****/
// [ {"uid":uid, "blob":blob } ]
var ucvm_metaplottb_list=[];

function setup_model() {
   var tb=makeModelTable();
   var html=document.getElementById('modelTable-container');
   html.innerHTML=tb;
   makeModelSelection();
   make_all_model_layer();
}

function setup_fileFormat() {
   var tb=makeFileFormatTable();
   var html=document.getElementById('fileFormatTable-container');
   html.innerHTML=tb;
}

function processByLatlonForPoint() {
    document.getElementById('spinIconForProperty').style.display = "block";    
    getMaterialPropertyByLatlon();
}

function processByLatlonForProfile() {
    document.getElementById('spinIconForProfile').style.display = "block";    
    plotVerticalProfile();
}

function processByLatlonForLine() {
    document.getElementById('spinIconForLine').style.display = "block";    
    plotCrossSection();
}

function processByLatlonForArea() {
    document.getElementById('spinIconForArea').style.display = "block";    
    plotHorizontalSlice();
}

// it is filelist
function selectLocalFiles(_urls) {

    document.getElementById('spinIconForListProperty').style.display = "block";

    if(_urls == undefined) {
      throw new Error("must have an url!");
    }
    var _url=_urls[0];
    if( _url instanceof File) {
      readAndProcessLocalFile(_url);
    } else {
      throw new Error("local file must be a File object type!");
    }
}

function clearSearchResult() {
    refreshMPTable();
}

// create a links to png, metadata, data file if exist
function makeDownloadLinks(str) {
    var html="";

    // just one
    if( typeof str === 'string') { 
       // if the file ends with png 
       if(str.endsWith(".png")) {
          html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-eye-open\"></span></a></div>";
         } else {
            html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a></div>";
       }
       return html;
    }

    // a set of them,  obj['key1'] and obj['key2']
    var keys=Object.keys(str);
    var sz=(Object.keys(str).length);
    var i;

    html="<div class=\"links\" style=\"display:inline-block\">";
    for(i=0;i<sz;i++) {
       var val=str[keys[i]]; 
       switch(keys[i]) {
          case 'plot':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"pngbox\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>&nbsp;&nbsp;PNG plot</div>";
              break;
          case 'meta':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;plot metadata file</div>";
              break;
          case 'data':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;plot data file</div>";
              break;
          case 'dataset':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;plot dataset file</div>";
              break;
          case 'materialproperty':
              html=html+"<div class=\"links\"><a class=\"openpop\" href=\"result/"+val+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>&nbsp;&nbsp;material property file</div>";
              break;
          case 'query':
              window.console.log("QUERY:",val);
              break; 
          case 'uid':
              window.console.log("QUERY:",val);
              break;
          default:
              window.console.log("HUM...This key is skipped:",keys[i]);
              break;
       }
    }
    html=html+"</div>";

    return html;
    
}

// plot + various datafiles
function insertMetaPlotResultTable(note,uid,str) {
    ucvm_metaplottb_list.push( { uid:uid, blob:str });
//    var plothtml=plotPNG(str);
    var html=makeDownloadLinks(str);
    makeMetaPlotResultTable(note,uid,html);
}

function makeMetaPlotResultTable(note,uid,html) {
    
    var table=document.getElementById("metadataPlotTable");
    if (ucvm_metaplottb_list.length == 1) {
      table.deleteRow(0); // delete the holdover
//label
      row=table.insertRow(-1);
      row.innerHTML="<td style=\"width:10vw\"><b>UID</b></td><td style=\"width:24vw\"><b>LINKS</b></td><td style=\"width:24vw\"><b>Description</b></td>";
//
    }
    row=table.insertRow(-1);
    row.innerHTML="<td style=\"width:10vw\">"+uid+"</td><td style=\"width:24vw\">"+html+"</td><td style=\"width:24vw\">"+note+"</td>";

}

// takes 1 or more sets of result
// of { 'first':{...}, 'second':{...}, ...}
function makeHorizontalResultTable(uid,str)
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

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    // create the key first
    var labelline="";
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    var zkeyidx=0;
    for(i=0; i<sz; i++) {
        key=datakeys[i];
        // special case
        if(key == 'Z') { 
          zkeyidx=i;
        }
        labelline=labelline+"<td style=\"width:24vw\"><b>"+key+"</b></td>";
    }

    var table=document.getElementById("materialPropertyTable");
    table.deleteRow(0); // delete the holdover

    row=table.insertRow(-1);
    row.innerHTML=labelline;

    // now adding the data part..
    for(j=0; j< dsz; j++) {
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        var mpline="";
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            if(i == zkeyidx) {
              var zmodestr=document.getElementById("zModeType").value;
              if(zmodestr == "e")
                val2=val2+" (by<br>elevation)";
              else
                val2=val2+" (by<br>depth)";
            } 
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         row=table.insertRow(-1);
         row.innerHTML=mpline;
    }
}

function makeHorizontalResultTable_row(uid,str)
{
    var i;
    var blob;

    if( typeof str === 'string') { 
       blob=JSON.parse(str);
       } else {
         blob=str;
    }

    var dkeys=Object.keys(blob); // dkeys: first, second
    var dsz=(Object.keys(blob).length); // 2

    if(dsz < 1) {
       window.console.log("ERROR: expecting at least 1 set of material properties");
       return;
    }

    var datablob=blob[dkeys[0]]; // first set of data { 'X':..,'Y':...  }
    if( typeof datablob === 'string') { 
       datablob=JSON.parse(datablob);
    }

    // create the key first
    var key;
    
    var datakeys=Object.keys(datablob);
    var sz=(Object.keys(datablob).length);

    var zkeyidx=0; // look for Z entry
    for(i=0; i<sz; i++) {
        key=datakeys[i];
        // special case
        if(key == 'Z') { 
          zkeyidx=i;
          break;
        }
    }

    // the data part..
    var table=document.getElementById("materialPropertyTable");
    var row=table.insertRow(-1);
    for(j=0; j< dsz; j++) {
        var mpline="";
        var datablob=blob[dkeys[j]];
        if(datablob == "")
           continue;
        if( typeof datablob === 'string') { 
           datablob=JSON.parse(datablob);
        }
        for(i=0; i<sz; i++) {
            var key2=datakeys[i];
            var val2=datablob[key2];
            if(i == zkeyidx) {
              var zmodestr=document.getElementById("zModeType").value;
              if(zmodestr == "e")
                val2=val2+" (by<br>elevation)";
              else
                val2=val2+" (by<br>depth)";
            } 
            mpline=mpline+"<td style=\"width:24vw\">"+val2+"</td>";
         }
         var row=table.insertRow(-1);
         row.innerHTML=mpline;
    }
}

function saveAsCSVBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="UCVM_"+timestamp+".csv";
    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    //FileSaver.js
    saveAs(blob, fname);
}

// make link to result/  directory
function linkDownload(str)
{
    var html="";
    // just one
    if( typeof str === 'string') { 
       html="<div class=\"links\"><a class=\"openpop\" href=\"result/"+str+"\" target=\"downloadlink\"><span class=\"glyphicon glyphicon-download-alt\"></span></a></div>";
       return html;
    }
    return html;
}


function saveAsBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="UCVM_"+timestamp+".json";
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

