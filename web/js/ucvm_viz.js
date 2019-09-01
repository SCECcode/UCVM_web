var  initPlot_data=[]; // original data
var  initPlot_label=[]; // original data's label

function array_unique(array) {
    var unique = [];
    for ( var i = 0 ; i < array.length ; ++i ) {
        if ( unique.indexOf(array[i]) == -1 )
            unique.push(array[i]);
    }
    return unique;
}


// >>Synchronous XMLHttpRequest on the main thread is deprecated
// >>because of its detrimental effects to the end user's experience.
//     url=http://localhost/data/synapse/segments-dummy.csv
function ckExist(url) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
 // okay
    }
  }
  http.open("GET", url, false); 
  http.send();
  if(http.status !== 404) {
    return http.responseText;
    } else {
      return null;
  }
}

// csv
function chopForStub(url){
  var s=url.split('/').pop();
  var ss=s.slice(0, -4);
  return ss;
}


function process_csv(csv) {

    var fline=csv.split('\n')[0];
    var hdata=[];
    var max_y_columns=0; // should use this to do sanity check, 
    $.csv.toArray(fline, {}, function(err, data) {
        hdata=data; 
        initPlot_label.push(hdata);
    });

    $.csv.toArrays(csv, {}, function(err, data) {
      if(data.length == 0) {
        window.console.log("Fail: can not access data");
        return 0;
      }
    // remove the header..
    data.splice(0,1);

    var ndata=[];
    var dcnt=data.length;
        // need to subsample
    var p=data[dcnt-1];
    for(var i=0;i<dcnt;i++) {
      if (i % 10 == 0) {
        ndata.push(data[i]);
      }
    }

    initPlot_data.push(ndata);
    });

    return 1;
}


// allow multiple csv data files with headers
function loadAndProcessCSVfromFile(urls) {
  var nlist=[];
  var cnt=urls.length;

  for( var urlidx=0; urlidx < cnt; urlidx++ ) {
      var url=urls[urlidx];
      var csv=ckExist(url);
      var n=process_csv(csv);
      if(n) {
        var fstub=chopForStub(url);
        nlist.push(fstub);
      }
  }
  return nlist;
}

// urlidx == url idx
// cidx = column idx
function getDataByIndex(urlidx,cidx) {
//   window.console.log(typeof initPlot_data);
   var pdata=initPlot_data[urlidx];

   var alist=pdata.map(function(k) { return parseFloat(k[cidx]); } );
   return alist;
}

function getMaxDataByIndex(urlidx,cidx) {
   var pdata=initPlot_data[urlidx];
   var max=0;
   pdata.map(function(k) {
             if(parseFloat(k[idx]) > max)
               max=k[idx];
   } );
   return max;
}


